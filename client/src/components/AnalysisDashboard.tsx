import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, Download } from "lucide-react";

interface AnalysisDashboardProps {
  analysis: any;
  onBack: () => void;
  onViewHistory: () => void;
}

export function AnalysisDashboard({ analysis, onBack }: AnalysisDashboardProps) {
  const scoringData = [
    { name: "Skills", value: analysis.scoring.skillsScore, weight: 30 },
    { name: "Experience", value: analysis.scoring.experienceScore, weight: 25 },
    { name: "Education", value: analysis.scoring.educationScore, weight: 15 },
    { name: "Certifications", value: analysis.scoring.certificationsScore, weight: 15 },
    { name: "Completeness", value: analysis.scoring.completenessScore, weight: 15 },
  ];

  const radarData = [
    { category: "Skills", value: analysis.scoring.skillsScore },
    { category: "Experience", value: analysis.scoring.experienceScore },
    { category: "Education", value: analysis.scoring.educationScore },
    { category: "Certifications", value: analysis.scoring.certificationsScore },
    { category: "Completeness", value: analysis.scoring.completenessScore },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{analysis.targetRole} Analysis</h1>
          <p className="text-muted-foreground">File: {analysis.fileName}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analysis.scoring.overallScore}</div>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Skill Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analysis.scoring.skillsScore}</div>
              <p className="text-xs text-muted-foreground">30% weight</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analysis.scoring.experienceScore}</div>
              <p className="text-xs text-muted-foreground">25% weight</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Skill Gap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analysis.skillGaps.gapPercentage}%</div>
              <p className="text-xs text-muted-foreground">missing skills</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
              <CardDescription>Weighted contribution to overall score</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Radar</CardTitle>
              <CardDescription>Multi-dimensional profile assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Matched Skills</CardTitle>
              <CardDescription>{analysis.skillGaps.matched.length} skills identified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.skillGaps.matched.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Missing Skills</CardTitle>
              <CardDescription>{analysis.skillGaps.missing.length} skills to develop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.skillGaps.missing.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>Actions to improve your profile for {analysis.targetRole} roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.recommendations.map((rec: any, idx: number) => (
                <div key={idx} className="border-l-4 border-primary bg-primary/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{rec.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>
                      {rec.estimatedTimeToComplete && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Estimated time: {rec.estimatedTimeToComplete}
                        </p>
                      )}
                    </div>
                    <Badge variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}>
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Upload
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
}
