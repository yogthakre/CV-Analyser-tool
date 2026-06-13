import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Zap, Shield } from "lucide-react";

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Technical Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive guide to the CV Analyzer architecture, technology stack, and integration plans.
          </p>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technology Stack
            </CardTitle>
            <CardDescription>Frontend, backend, and infrastructure components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline">React 19</Badge>
                  <span>Modern UI framework with hooks and concurrent rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Tailwind CSS 4</Badge>
                  <span>Utility-first CSS framework for responsive design</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Recharts</Badge>
                  <span>Composable charting library for data visualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">tRPC</Badge>
                  <span>End-to-end type-safe API communication</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Backend</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <span>JavaScript runtime for server-side execution</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Express.js</Badge>
                  <span>Web framework for HTTP routing and middleware</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">tRPC</Badge>
                  <span>Type-safe RPC framework for backend procedures</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">OpenAI LLM</Badge>
                  <span>Large language model for CV parsing and analysis</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Database & Storage</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline">MySQL/TiDB</Badge>
                  <span>Relational database for structured data</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Drizzle ORM</Badge>
                  <span>Type-safe database access layer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">AWS S3</Badge>
                  <span>Cloud storage for uploaded CV files</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Architecture
            </CardTitle>
            <CardDescription>Data flow and component interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div className="mb-4">User Upload → File Processing → LLM Parsing → Scoring Engine</div>
              <div className="mb-4">↓</div>
              <div className="mb-4">Database Storage → Dashboard Visualization → Recommendations</div>
              <div className="mb-4">↓</div>
              <div>Analysis History → Export/Share</div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Key Components:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>CV Parser:</strong> Extracts structured data from resumes using LLM with JSON schema validation
                </li>
                <li>
                  <strong>Scoring Engine:</strong> Calculates weighted scores across 5 dimensions (skills, experience, education, certifications, completeness)
                </li>
                <li>
                  <strong>Skill Gap Analyzer:</strong> Compares user skills against role requirements
                </li>
                <li>
                  <strong>Recommendation Engine:</strong> Generates personalized improvement suggestions
                </li>
                <li>
                  <strong>Dashboard:</strong> Visualizes scores with radar and bar charts
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* AI/ML Approach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI/ML Implementation
            </CardTitle>
            <CardDescription>Natural Language Processing and intelligent analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">CV Parsing Strategy</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Uses structured JSON schema with OpenAI's GPT models to extract and validate CV information. The LLM is instructed to identify:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Personal information (name, email, phone, location)</li>
                <li>• Technical and soft skills with implicit proficiency levels</li>
                <li>• Work experience with duration and key responsibilities</li>
                <li>• Educational background and certifications</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Scoring Methodology</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Multi-dimensional scoring approach with transparent weighting:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Skills Match (30%):</strong> Percentage of required skills matched against user's CV
                </li>
                <li>
                  <strong>Experience (25%):</strong> Total years of experience vs. role requirements
                </li>
                <li>
                  <strong>Education (15%):</strong> Presence of relevant educational background
                </li>
                <li>
                  <strong>Certifications (15%):</strong> Number and relevance of certifications
                </li>
                <li>
                  <strong>Completeness (15%):</strong> Profile completeness score based on data fields
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendation Generation</h4>
              <p className="text-sm text-muted-foreground">
                Recommendations are generated based on skill gaps and profile analysis. Each recommendation includes priority level, estimated time to complete, and actionable steps.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Integration Plans */}
        <Card>
          <CardHeader>
            <CardTitle>API Integration Plans</CardTitle>
            <CardDescription>Proposed integrations with external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">LinkedIn Integration</h4>
              <p className="text-sm text-muted-foreground mb-2">
                OAuth 2.0 integration to fetch user profile data and endorsements:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Retrieve profile information and headline</li>
                <li>• Extract skills and endorsement counts</li>
                <li>• Fetch work experience and education</li>
                <li>• Analyze skill endorsement patterns</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">GitHub Integration</h4>
              <p className="text-sm text-muted-foreground mb-2">
                REST API integration to analyze developer profiles:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Retrieve repository statistics and languages</li>
                <li>• Analyze contribution patterns and activity</li>
                <li>• Extract technical skills from repositories</li>
                <li>• Calculate developer score based on projects</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Tableau & Power BI Integration</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Embed analytics dashboards for advanced visualization:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Export analysis data to Tableau Public</li>
                <li>• Create Power BI dashboards for organizations</li>
                <li>• Track career progression over time</li>
                <li>• Benchmark against industry standards</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Ethical AI Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Ethical AI Practices
            </CardTitle>
            <CardDescription>Bias mitigation, transparency, and fairness principles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Bias Mitigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Skill-Neutral Scoring:</strong> Scoring algorithm focuses on skills and experience, not demographics
                </li>
                <li>
                  <strong>Diverse Role Definitions:</strong> Job role requirements are defined by industry standards, not individual biases
                </li>
                <li>
                  <strong>Regular Audits:</strong> Periodic review of scoring patterns to identify and correct biases
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Transparency</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Explainable Scores:</strong> All scores include detailed breakdowns showing exactly how each component contributes
                </li>
                <li>
                  <strong>Clear Methodology:</strong> Users can understand the scoring logic and weights
                </li>
                <li>
                  <strong>Data Visibility:</strong> Users can see all extracted data and verify accuracy
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Fairness Principles</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Equal Opportunity:</strong> Same scoring criteria applied to all users regardless of background
                </li>
                <li>
                  <strong>Actionable Feedback:</strong> Recommendations focus on skill development, not demographic changes
                </li>
                <li>
                  <strong>Privacy Protection:</strong> User data is encrypted and never shared with third parties without consent
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Data Privacy</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Secure Storage:</strong> All CV files encrypted at rest and in transit
                </li>
                <li>
                  <strong>User Control:</strong> Users can delete their data at any time
                </li>
                <li>
                  <strong>No Tracking:</strong> Analysis data not used for profiling or tracking
                </li>
                <li>
                  <strong>GDPR Compliant:</strong> Adheres to data protection regulations
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
