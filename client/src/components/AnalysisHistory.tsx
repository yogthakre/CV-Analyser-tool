import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface AnalysisHistoryProps {
  onBack: () => void;
  onSelectAnalysis: (analysis: any) => void;
}

export function AnalysisHistory({ onBack, onSelectAnalysis }: AnalysisHistoryProps) {
  const historyQuery = trpc.cv.getHistory.useQuery();
  const deleteAnalysisMutation = trpc.cv.deleteAnalysis.useMutation({
    onSuccess: () => historyQuery.refetch(),
  });
  const utils = trpc.useUtils();

  const handleSelectAnalysis = async (id: number) => {
    try {
      const analysis = await utils.cv.getAnalysis.fetch({ id });
      onSelectAnalysis(analysis);
    } catch (error) {
      toast.error("Failed to load analysis");
    }
  };

  const handleDeleteAnalysis = async (id: number) => {
    try {
      await deleteAnalysisMutation.mutateAsync({ id });
      toast.success("Analysis deleted");
    } catch (error) {
      toast.error("Failed to delete analysis");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="mb-8 text-3xl font-bold">Analysis History</h1>

        {historyQuery.isLoading ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Loading history...
            </CardContent>
          </Card>
        ) : historyQuery.data && historyQuery.data.length > 0 ? (
          <div className="space-y-4">
            {historyQuery.data.map((analysis) => (
              <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{analysis.targetRole}</h3>
                      <p className="text-sm text-muted-foreground">{analysis.fileName}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge>{analysis.overallScore}/100</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSelectAnalysis(analysis.id)}
                        variant="outline"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDeleteAnalysis(analysis.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No analyses yet. Upload a CV to get started.</p>
              <Button onClick={onBack} className="mt-4">
                Upload CV
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
