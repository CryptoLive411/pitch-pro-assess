import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PIPEDRIVE_USERS = {
  andrew: {
    token: Deno.env.get('PIPEDRIVE_ANDREW_TOKEN'),
    name: 'Andrew'
  },
  alex: {
    token: Deno.env.get('PIPEDRIVE_ALEX_TOKEN'),
    name: 'Alex'
  },
  sergio: {
    token: Deno.env.get('PIPEDRIVE_SERGIO_TOKEN'),
    name: 'Sergio'
  }
};

const PIPEDRIVE_DOMAIN = 'venturesportsusa.pipedrive.com';

// Verify user is authenticated and has staff role
async function verifyStaffAccess(req: Request): Promise<{ authorized: boolean; error?: string }> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader) {
    return { authorized: false, error: 'Missing authorization header' };
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: { Authorization: authHeader }
    }
  });

  // Get the user from the token
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Auth error:', userError);
    return { authorized: false, error: 'Invalid or expired token' };
  }

  // Check if user has staff role using the is_staff function
  const { data: isStaff, error: roleError } = await supabase.rpc('is_staff', { _user_id: user.id });
  
  if (roleError) {
    console.error('Role check error:', roleError);
    return { authorized: false, error: 'Failed to verify permissions' };
  }

  if (!isStaff) {
    return { authorized: false, error: 'User does not have staff access' };
  }

  return { authorized: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify staff access
    const { authorized, error: authError } = await verifyStaffAccess(req);
    
    if (!authorized) {
      console.error('Authorization failed:', authError);
      return new Response(
        JSON.stringify({ error: authError || 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { action, userId, dealId, noteContent } = await req.json();

    if (action === 'fetchDeals') {
      // Fetch deals from "Assessment Needed" stage for all users
      const allDeals = [];

      for (const [key, user] of Object.entries(PIPEDRIVE_USERS)) {
        console.log(`Fetching deals for ${user.name}`);
        
        try {
          // First, get all stages to find "Assessment Needed" stage ID
          const stagesResponse = await fetch(
            `https://${PIPEDRIVE_DOMAIN}/api/v1/stages?api_token=${user.token}`,
            { method: 'GET' }
          );

          if (!stagesResponse.ok) {
            console.error(`Failed to fetch stages for ${user.name}:`, await stagesResponse.text());
            continue;
          }

          const stagesData = await stagesResponse.json();
          const assessmentStage = stagesData.data?.find(
            (stage: any) => stage.name.trim().toLowerCase() === 'assessment needed'
          );

          if (!assessmentStage) {
            console.log(`"Assessment Needed" stage not found for ${user.name}`);
            continue;
          }

          console.log(`Found "Assessment Needed" stage (ID: ${assessmentStage.id}) for ${user.name}`);

          // Fetch deals in this stage (only open deals, not won or lost)
          const dealsResponse = await fetch(
            `https://${PIPEDRIVE_DOMAIN}/api/v1/deals?stage_id=${assessmentStage.id}&status=open&api_token=${user.token}`,
            { method: 'GET' }
          );

          if (!dealsResponse.ok) {
            console.error(`Failed to fetch deals for ${user.name}:`, await dealsResponse.text());
            continue;
          }

          const dealsData = await dealsResponse.json();
          
          if (dealsData.data && Array.isArray(dealsData.data)) {
            // Double-check: only include open deals from "Assessment Needed" stage
            const filteredDeals = dealsData.data.filter(
              (deal: any) => deal.stage_id === assessmentStage.id && deal.status === 'open'
            );
            
            console.log(`Fetched ${filteredDeals.length} open deals from "Assessment Needed" for ${user.name}`);
            
            for (const deal of filteredDeals) {
              allDeals.push({
                id: deal.id,
                title: deal.title,
                value: deal.value,
                currency: deal.currency,
                personName: deal.person_name,
                orgName: deal.org_name,
                addTime: deal.add_time,
                stageId: deal.stage_id,
                userId: key,
                userName: user.name,
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching deals for ${user.name}:`, error);
        }
      }

      console.log(`Total deals fetched: ${allDeals.length}`);

      // Deduplicate deals by ID - keep the first occurrence of each deal
      const uniqueDealsMap = new Map();
      for (const deal of allDeals) {
        if (!uniqueDealsMap.has(deal.id)) {
          uniqueDealsMap.set(deal.id, deal);
        }
      }
      const uniqueDeals = Array.from(uniqueDealsMap.values());
      
      console.log(`Unique deals after deduplication: ${uniqueDeals.length}`);

      return new Response(
        JSON.stringify({ deals: uniqueDeals }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'addNote') {
      // Add a note to a specific deal
      const user = PIPEDRIVE_USERS[userId as keyof typeof PIPEDRIVE_USERS];
      
      if (!user) {
        throw new Error('Invalid user ID');
      }

      console.log(`Adding note to deal ${dealId} for ${user.name}`);

      const response = await fetch(
        `https://${PIPEDRIVE_DOMAIN}/api/v1/notes?api_token=${user.token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: noteContent,
            deal_id: dealId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to add note:`, errorText);
        throw new Error(`Failed to add note: ${errorText}`);
      }

      const data = await response.json();
      console.log(`Note added successfully:`, data);

      // Move deal to next stage after "Assessment Needed"
      try {
        const stagesResponse = await fetch(
          `https://${PIPEDRIVE_DOMAIN}/api/v1/stages?api_token=${user.token}`,
          { method: 'GET' }
        );

        if (stagesResponse.ok) {
          const stagesData = await stagesResponse.json();
          const assessmentNeededStage = stagesData.data?.find(
            (stage: any) => stage.name.trim().toLowerCase() === 'assessment needed'
          );
          
          if (assessmentNeededStage) {
            const currentOrderNr = assessmentNeededStage.order_nr;
            const nextStage = stagesData.data?.find(
              (stage: any) => stage.order_nr === currentOrderNr + 1 && stage.pipeline_id === assessmentNeededStage.pipeline_id
            );
            
            if (nextStage) {
              console.log(`Moving deal ${dealId} to stage "${nextStage.name}" (ID: ${nextStage.id})`);
              
              const updateResponse = await fetch(
                `https://${PIPEDRIVE_DOMAIN}/api/v1/deals/${dealId}?api_token=${user.token}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    stage_id: nextStage.id,
                  }),
                }
              );
              
              if (updateResponse.ok) {
                const updateData = await updateResponse.json();
                console.log('Deal stage updated successfully:', updateData);
              } else {
                console.error('Failed to update deal stage:', await updateResponse.text());
              }
            } else {
              console.log('No next stage found after "Assessment Needed"');
            }
          }
        }
      } catch (error) {
        console.error('Error moving deal to next stage:', error);
        // Don't fail the entire request if stage update fails
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Error in pipedrive-sync function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
