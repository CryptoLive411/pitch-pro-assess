import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

          // Fetch deals in this stage
          const dealsResponse = await fetch(
            `https://${PIPEDRIVE_DOMAIN}/api/v1/deals?stage_id=${assessmentStage.id}&api_token=${user.token}`,
            { method: 'GET' }
          );

          if (!dealsResponse.ok) {
            console.error(`Failed to fetch deals for ${user.name}:`, await dealsResponse.text());
            continue;
          }

          const dealsData = await dealsResponse.json();
          
          if (dealsData.data && Array.isArray(dealsData.data)) {
            // Double-check that we only add deals from the "Assessment Needed" stage
            const filteredDeals = dealsData.data.filter(
              (deal: any) => deal.stage_id === assessmentStage.id
            );
            
            console.log(`Fetched ${filteredDeals.length} deals from "Assessment Needed" for ${user.name}`);
            
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

      return new Response(
        JSON.stringify({ deals: allDeals }),
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
