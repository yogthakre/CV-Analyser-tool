# CV Analyzer: Video Walkthrough Script

**Duration:** 8-10 minutes  
**Audience:** SMARRTIF AI HR Team and Technical Reviewers

---

## Introduction (0:00 - 0:30)

**Script:**

"Hello, I'm presenting the CV Analyzer, an AI-powered web application designed to provide transparent, intelligent analysis of professional resumes. This tool demonstrates a sophisticated approach to career development, combining natural language processing, machine learning, and human-centered design principles.

The CV Analyzer addresses a critical need in the job market: helping professionals understand their career profile strength, identify skill gaps, and receive personalized recommendations for growth—all with complete transparency about how the analysis is performed."

**Visual:** Show landing page with "CV Analyzer" title and feature cards

---

## Feature Overview (0:30 - 1:30)

**Script:**

"The CV Analyzer includes ten core features that work together to provide comprehensive career insights:

First, users upload their CV in PDF or text format. The system validates the file and stores it securely in cloud storage.

Second, the AI parsing engine uses advanced language models to extract structured data from the CV—including personal information, skills, work experience, education, and certifications. This extraction is validated against a strict schema to ensure accuracy.

Third, the transparent profile scoring engine evaluates the CV across five dimensions: skills match, experience depth, education, certifications, and profile completeness. Each dimension has a specific weight, and users can see exactly how their score is calculated.

Fourth, the skill gap analysis compares the user's skills against industry-standard requirements for their target role, clearly highlighting both matched and missing skills.

Fifth, the personalized recommendation engine generates actionable suggestions based on the gap analysis, prioritized by importance and including time estimates for completion.

Sixth, the interactive dashboard visualizes all results using radar and bar charts, making it easy to understand profile strengths and weaknesses.

Seventh, users can select their target job role, and all analysis is tailored to that specific role's requirements.

Eighth, the system maintains a history of all analyses, allowing users to track progress over time.

Ninth, the in-app documentation page explains the complete technology stack and proposed API integrations with LinkedIn, GitHub, Tableau, and Power BI.

Finally, the ethical AI practices panel demonstrates our commitment to fairness, transparency, and bias mitigation."

**Visual:** Cycle through feature cards on home page

---

## CV Upload & Analysis (1:30 - 3:00)

**Script:**

"Let me demonstrate the core workflow. I'll upload a sample CV and select a target role.

Here's the upload interface. Users can select their resume file and choose their target job role from a dropdown. The system supports common roles like Data Scientist, Software Engineer, Product Manager, UX Designer, and DevOps Engineer.

Once I click 'Analyze CV,' the system begins processing. Behind the scenes, several things happen simultaneously:

First, the CV text is extracted from the uploaded file. For PDFs, we use specialized text extraction. For plain text, we use the content directly.

Second, the extracted text is sent to an advanced language model with a structured JSON schema. The LLM is instructed to identify and extract specific information: personal details, technical and soft skills with proficiency levels, work experience with dates and responsibilities, educational background, and relevant certifications.

Third, the extracted data is validated against our schema to ensure accuracy and consistency. Any missing or malformed data is flagged for review.

Fourth, the scoring engine calculates the profile score across all five dimensions. This is where the transparency principle comes into play—every score is calculated using a clear, documented formula that users can understand and verify.

Fifth, the skill gap analysis compares the user's skills against the role requirements. This identifies exactly which skills the user has and which ones they need to develop.

Finally, the recommendation engine generates personalized suggestions based on the gap analysis, prioritized by importance."

**Visual:** Show upload interface, then loading state with "Analyzing..." message

---

## Analysis Dashboard (3:00 - 5:00)

**Script:**

"Here's the analysis dashboard, which displays all the results in an easy-to-understand format.

At the top, we see the key metrics: the overall score out of 100, and the individual scores for each dimension. In this example, the user scored 78 overall, which indicates a strong candidate with some room for improvement.

Below that, we have two interactive charts. The bar chart shows the score breakdown, clearly displaying how each dimension contributes to the overall score. The radar chart provides a multi-dimensional view of the profile, making it easy to see which areas are strong and which need development.

Next, we see the skill analysis. On the left, matched skills are displayed in green badges—these are skills the user has that align with the target role. On the right, missing skills are displayed in outline badges—these are skills the user needs to develop.

The matched skills show that this user has strong technical foundations: Python, SQL, machine learning, and data visualization. However, the missing skills indicate gaps in areas like cloud platforms (AWS, GCP), big data technologies (Spark, Hadoop), and specialized tools (Tableau, Power BI).

Below the skills, we see the personalized recommendations. Each recommendation includes:
- A clear title and description
- The priority level (high, medium, or low)
- An estimated time to complete

For example, 'Learn AWS for cloud computing' is marked as high priority with an estimated 3-4 months to complete. This helps users understand both what to learn and how long it might take.

The recommendations are prioritized based on the role requirements and the user's current skill level. High-priority items are critical for success in the target role, while medium and low-priority items are important for competitive advantage."

**Visual:** Show dashboard with charts, skill tags, and recommendations

---

## Transparent Scoring Explanation (5:00 - 6:00)

**Script:**

"One of the key differentiators of the CV Analyzer is its transparency. Let me explain exactly how the scoring works.

The overall score is calculated using a weighted formula:

Overall Score = (Skills × 0.30) + (Experience × 0.25) + (Education × 0.15) + (Certifications × 0.15) + (Completeness × 0.15)

Each dimension is scored on a 0-100 scale:

Skills Match (30% weight): We compare the user's skills against the role requirements. If the user has 8 out of 10 required skills, the skills score is 80.

Experience (25% weight): We compare the user's total years of experience against the role requirements. If the role requires 5 years and the user has 6 years, the experience score is 100 (capped at 100).

Education (15% weight): We check for relevant educational background. If the user has a degree in a related field, they get 100 points. If not, they get 0.

Certifications (15% weight): We count relevant certifications. If the role typically requires 3 certifications and the user has 2, the certification score is 67.

Completeness (15% weight): We measure how complete the CV is. If the user has provided all expected sections (personal info, skills, experience, education, certifications), they get 100 points.

This transparent approach means users understand exactly how they're being evaluated and can see exactly what they need to improve."

**Visual:** Show scoring breakdown with visual representation of weights and calculations

---

## Ethical AI & Bias Mitigation (6:00 - 7:00)

**Script:**

"The CV Analyzer is built on a foundation of ethical AI principles. Let me explain our approach to fairness, transparency, and bias mitigation.

First, skill-focused evaluation: The scoring algorithm focuses exclusively on professional skills and experience. We explicitly exclude demographic information like name, age, gender, race, and national origin. This ensures that all users are evaluated fairly based on their professional qualifications.

Second, industry-standard role definitions: Job role requirements are based on published industry standards, not individual biases. We use data from the Bureau of Labor Statistics, industry associations, and peer-reviewed research to define role requirements.

Third, continuous monitoring: We regularly audit the scoring algorithm to identify and correct any biases. We analyze score distributions across different user segments to ensure consistent treatment.

Fourth, transparency: Users can see all extracted data from their CV and verify accuracy. They can also see exactly how their score was calculated and understand each component.

Fifth, data privacy: All CV files are encrypted at rest and in transit. Users have complete control over their data and can delete it at any time. We comply with GDPR, CCPA, and other data protection regulations.

These principles ensure that the CV Analyzer provides fair, unbiased analysis while maintaining complete transparency about how the system works."

**Visual:** Show ethics panel with principles and commitments

---

## Documentation & Integration Plans (7:00 - 8:00)

**Script:**

"The CV Analyzer is designed to be part of a larger ecosystem. The in-app documentation page explains our complete technology stack and proposed integrations.

Technology Stack:
- Frontend: React 19 with Tailwind CSS 4 for a modern, responsive user interface
- Backend: Node.js with Express and tRPC for type-safe API communication
- Database: MySQL/TiDB with Drizzle ORM for type-safe database access
- AI/ML: OpenAI GPT models for CV parsing and analysis
- Storage: AWS S3 for secure file storage

Proposed API Integrations:

LinkedIn Integration: We plan to integrate with LinkedIn to validate resume information against LinkedIn profiles, extract skills and endorsements, and analyze proficiency levels based on endorsement counts.

GitHub Integration: For developers, we can analyze GitHub profiles to extract technical skills from repositories, calculate activity scores based on contributions, and identify programming languages and frameworks.

Tableau Integration: We can export analysis data to Tableau for interactive dashboards, track career progression over time, and create role-specific benchmarking visualizations.

Power BI Integration: Organizations can use Power BI to analyze team skills, identify training needs, and generate reports for HR and management.

These integrations will significantly expand the value of the CV Analyzer by connecting it to existing professional networks and business intelligence platforms."

**Visual:** Show documentation page with tech stack and integration plans

---

## History & Session Management (8:00 - 8:30)

**Script:**

"Users can view their analysis history at any time. The history page shows all past analyses with:
- The target role analyzed
- The file name
- The overall score
- The analysis date

Users can click 'View' to load a previous analysis and see the full dashboard again. They can also delete analyses they no longer need.

This history tracking helps users monitor their progress over time. As they develop new skills and gain experience, they can re-analyze their CV and see how their score improves."

**Visual:** Show history page with multiple analyses

---

## Conclusion (8:30 - 10:00)

**Script:**

"The CV Analyzer demonstrates a sophisticated approach to AI-powered career development. By combining:

- Advanced natural language processing for accurate CV parsing
- Transparent, multi-dimensional scoring that users can understand and verify
- Intelligent skill gap analysis and personalized recommendations
- A strong commitment to ethical AI practices and bias mitigation
- A modern, elegant user interface that makes complex analysis accessible

The CV Analyzer provides genuine value to users while maintaining fairness, privacy, and accountability.

The architecture is designed for scalability and future expansion. The proposed API integrations with LinkedIn, GitHub, Tableau, and Power BI will enable rich ecosystem integration and organizational-level insights.

Key technical achievements:

1. End-to-end type safety using tRPC, ensuring compile-time error detection
2. Transparent scoring algorithm that users can fully understand and verify
3. Comprehensive ethical AI practices including bias mitigation and fairness testing
4. Secure data handling with encryption at rest and in transit
5. Scalable architecture supporting horizontal scaling and high concurrency

The CV Analyzer sets a new standard for ethical, transparent AI in the career development space. It demonstrates that sophisticated AI systems can be both powerful and fair, providing genuine value while respecting user privacy and maintaining accountability.

Thank you for reviewing the CV Analyzer. I'm happy to answer any questions about the implementation, architecture, or ethical considerations."

**Visual:** Show home page with all feature cards, then show live demo of key workflows

---

## Key Points for Q&A

**Technical Questions:**

- **How does the LLM parsing work?** We use OpenAI's GPT models with structured JSON schema validation to ensure accurate data extraction. The schema defines exactly what fields we expect and validates the response.

- **How is the scoring algorithm designed?** We use a transparent, weighted multi-dimensional approach. Each dimension has a specific calculation method and weight, which users can see and understand.

- **How do you prevent bias?** We exclude demographic data from scoring, use industry-standard role definitions, and regularly audit the algorithm for bias. We also provide complete transparency about how scores are calculated.

- **How is data secured?** All CV files are encrypted with AES-256 at rest and transmitted using TLS 1.3. Users have complete control over their data and can delete it at any time.

**Product Questions:**

- **Who is the target user?** Job seekers who want to understand their career profile strength and get personalized recommendations for improvement.

- **How does this differ from existing tools?** The CV Analyzer emphasizes transparency, ethical AI practices, and personalized recommendations. Users can see exactly how their score is calculated and why they're receiving specific recommendations.

- **What's the business model?** The prototype is free for individual users. Future monetization could include premium features (advanced analytics, certification marketplace) and enterprise solutions (organizational skill inventory, team training recommendations).

**Future Questions:**

- **What are the planned integrations?** LinkedIn, GitHub, Tableau, and Power BI integrations are planned to enrich analysis and enable organizational insights.

- **Will there be a mobile app?** Yes, native iOS and Android apps are planned for the medium term.

- **How will you handle different industries?** The system is designed to support any industry by defining role-specific skill requirements. We plan to expand the role database based on user demand.

