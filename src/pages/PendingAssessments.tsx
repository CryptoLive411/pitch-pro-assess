import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw, Loader2, ExternalLink, LogOut } from "lucide-react";
import ventureLogo from "@/assets/venture-logo-circle.png";
import { useAuth } from "@/hooks/useAuth";

interface PipedriveDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  personName: string;
  orgName: string;
  addTime: string;
  stageId: number;
  userId: string;
  userName: string;
}

const PendingAssessments = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [deals, setDeals] = useState<PipedriveDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("pipedrive-sync", {
        body: { action: "fetchDeals" },
      });

      if (error) throw error;

      console.log("Fetched deals:", data);
      setDeals(data.deals || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch pending assessments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDeals();

    // Auto-sync every 3 minutes
    const interval = setInterval(() => {
      fetchDeals();
    }, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDeals();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(value);
  };

  const handleCreateAssessment = (deal: PipedriveDeal) => {
    // Navigate to assessment editor with pre-filled player name
    navigate("/", {
      state: {
        preservedData: {
          playerName: deal.personName || deal.title,
          enrollmentYear: "",
          schoolYear: "",
          gpa: "",
          manager: "",
          budget: "",
          departmentNotes: "",
          playerPhoto: null,
          targetDivisions: [],
        },
        pipedriveInfo: {
          dealId: deal.id,
          userId: deal.userId,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={ventureLogo} alt="Venture Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold text-primary">Pending Assessments</h1>
              <p className="text-sm text-muted-foreground">
                Deals in "Assessment Needed" stage
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={() => navigate("/assessments")} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              View All Assessments
            </Button>
            <Button onClick={() => navigate("/")} className="gap-2">
              New Assessment
            </Button>
            <Button
              onClick={signOut}
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading pending assessments...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && deals.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center mb-4">
                No pending assessments found in Pipedrive
              </p>
              <Button onClick={handleRefresh} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Deals Grid */}
        {!loading && deals.length > 0 && (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Card key={`${deal.userId}-${deal.id}`} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl truncate flex-1">{deal.title}</CardTitle>
                    <Badge variant="secondary">{deal.userName}</Badge>
                  </div>
                  <CardDescription className="space-y-1">
                    {deal.personName && (
                      <div className="text-sm font-medium">{deal.personName}</div>
                    )}
                    {deal.orgName && (
                      <div className="text-xs text-muted-foreground">{deal.orgName}</div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Added: {formatDate(deal.addTime)}
                    </div>
                    {deal.value > 0 && (
                      <div className="text-sm font-semibold text-primary">
                        {formatCurrency(deal.value, deal.currency)}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleCreateAssessment(deal)}
                      className="w-full"
                    >
                      Create Assessment
                    </Button>
                    <a
                      href={`https://venturesportsusa.pipedrive.com/deal/${deal.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View in Pipedrive
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingAssessments;
