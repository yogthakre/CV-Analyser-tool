import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";

export function EthicsPanel() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Ethical AI Practices</h1>
          <p className="text-lg text-muted-foreground">
            Our commitment to fair, transparent, and unbiased CV analysis
          </p>
        </div>

        {/* Core Principles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Core Principles
            </CardTitle>
            <CardDescription>Guiding values for ethical AI development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Fairness
                </h4>
                <p className="text-sm text-muted-foreground">
                  All users evaluated using identical criteria regardless of background, demographics, or personal characteristics.
                </p>
              </div>

              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Transparency
                </h4>
                <p className="text-sm text-muted-foreground">
                  Complete visibility into scoring methodology, weights, and how each factor contributes to your profile score.
                </p>
              </div>

              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Accountability
                </h4>
                <p className="text-sm text-muted-foreground">
                  Regular audits and bias testing to ensure consistent, equitable treatment across all user segments.
                </p>
              </div>

              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Privacy
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted, secure, and never shared without explicit consent. You control your information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bias Mitigation */}
        <Card>
          <CardHeader>
            <CardTitle>Bias Mitigation Strategies</CardTitle>
            <CardDescription>How we prevent and address algorithmic bias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Badge>1</Badge>
                Skill-Focused Evaluation
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Our scoring algorithm evaluates only professional skills, experience, education, and certifications. We explicitly exclude:
              </p>
              <ul className="space-y-1 text-sm ml-6 text-muted-foreground">
                <li>• Name, gender, age, or any demographic information</li>
                <li>• Geographic location or national origin</li>
                <li>• Personal characteristics unrelated to job performance</li>
                <li>• Subjective or cultural preferences</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Badge>2</Badge>
                Industry-Standard Role Definitions
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Job role requirements are based on industry standards and best practices, not individual hiring decisions or unconscious biases:
              </p>
              <ul className="space-y-1 text-sm ml-6 text-muted-foreground">
                <li>• Derived from multiple authoritative sources</li>
                <li>• Regularly updated to reflect market trends</li>
                <li>• Reviewed by diverse industry experts</li>
                <li>• Applied consistently across all users</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Badge>3</Badge>
                Continuous Monitoring
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                We actively monitor for bias and disparate impact:
              </p>
              <ul className="space-y-1 text-sm ml-6 text-muted-foreground">
                <li>• Quarterly bias audits across user segments</li>
                <li>• Analysis of score distributions and patterns</li>
                <li>• User feedback collection and analysis</li>
                <li>• Immediate investigation of anomalies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Transparency */}
        <Card>
          <CardHeader>
            <CardTitle>Transparency Commitments</CardTitle>
            <CardDescription>How we ensure you understand your analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Score Breakdown</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Every score includes a detailed breakdown showing:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-fit">Skills (30%):</span>
                  <span>Percentage of required skills matched in your CV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-fit">Experience (25%):</span>
                  <span>Years of experience vs. role requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-fit">Education (15%):</span>
                  <span>Presence of relevant educational background</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-fit">Certifications (15%):</span>
                  <span>Number and relevance of certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-fit">Completeness (15%):</span>
                  <span>Profile completeness score based on data fields</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Data Visibility</h4>
              <p className="text-sm text-muted-foreground">
                You can review all extracted data from your CV and verify its accuracy. If any information is incorrect, you can update your CV and re-analyze.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Methodology Documentation</h4>
              <p className="text-sm text-muted-foreground">
                Our complete methodology is documented and available for review. We explain how each component is calculated and why we made specific design choices.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fairness */}
        <Card>
          <CardHeader>
            <CardTitle>Fairness in Practice</CardTitle>
            <CardDescription>How we ensure equal treatment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Equal Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    Same scoring criteria applied to all users. No preferential treatment based on any protected characteristics.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Actionable Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    All recommendations focus on skill development and professional growth, never on changing personal characteristics.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">No Discrimination</h4>
                  <p className="text-sm text-muted-foreground">
                    We actively prevent and prohibit any form of discrimination based on protected characteristics.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Appeal Process</h4>
                  <p className="text-sm text-muted-foreground">
                    If you believe your analysis is unfair or inaccurate, you can request a review and provide additional information.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>How we protect your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Data Protection</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• All CV files encrypted at rest using AES-256</li>
                  <li>• Encrypted transmission using TLS 1.3</li>
                  <li>• Secure storage in isolated databases</li>
                  <li>• Regular security audits and penetration testing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">User Control</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Delete your data at any time</li>
                  <li>• Download your analysis results</li>
                  <li>• Control who can access your information</li>
                  <li>• Opt-out of any data sharing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">No Misuse</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Your data is never sold to third parties</li>
                  <li>• Not used for profiling or tracking</li>
                  <li>• Not shared without explicit consent</li>
                  <li>• GDPR and CCPA compliant</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Important Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              While we strive for fairness and accuracy, please understand these limitations:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• This tool provides guidance, not hiring decisions</li>
              <li>• Human judgment should always supplement algorithmic analysis</li>
              <li>• No algorithm is perfectly unbiased; we continuously work to improve</li>
              <li>• Different roles may have different skill requirements not captured here</li>
              <li>• Career success depends on many factors beyond technical skills</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Questions or Concerns?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We take ethics seriously. If you have concerns about bias, fairness, or privacy, please contact us at ethics@cvanalyzer.ai
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
