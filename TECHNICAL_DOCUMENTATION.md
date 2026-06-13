# CV Analyzer: Comprehensive Technical Documentation

**Author:** Manus AI  
**Date:** June 2026  
**Version:** 1.0

---

## Executive Summary

The **CV Analyzer** is an AI-powered web application that provides intelligent, transparent analysis of professional resumes. It combines natural language processing, machine learning, and human-centered design to help users understand their career profile strength, identify skill gaps, and receive personalized recommendations for professional growth.

This document outlines the complete technical architecture, implementation approach, ethical considerations, and integration roadmap for the CV Analyzer system.

---

## 1. System Overview

### 1.1 Core Objectives

The CV Analyzer addresses a critical gap in career development tools by providing:

- **Transparent Scoring:** Users understand exactly how their profile is evaluated through detailed breakdowns and explainable AI principles
- **Skill Gap Analysis:** Clear identification of both matched and missing skills relative to target roles
- **Personalized Guidance:** Actionable recommendations tailored to individual career goals
- **Ethical AI:** Commitment to fairness, bias mitigation, and data privacy throughout the system

### 1.2 Key Features

| Feature | Description | Implementation |
|---------|-------------|-----------------|
| CV Upload | Support for PDF and text formats with file validation | React file input with client-side validation |
| AI Parsing | LLM-based extraction of structured CV data | OpenAI GPT with JSON schema validation |
| Profile Scoring | Multi-dimensional scoring with transparent weights | 5-factor scoring engine (skills, experience, education, certifications, completeness) |
| Skill Gap Analysis | Comparison against role-specific requirements | Industry-standard skill databases per role |
| Recommendations | Personalized improvement suggestions | Priority-ranked action items with time estimates |
| Dashboard | Interactive visualization of analysis results | Radar and bar charts using Recharts |
| History | Session-based analysis tracking | Database storage with user-scoped access |
| Documentation | In-app technology and approach documentation | Dedicated documentation page |
| Ethics Panel | Transparency about AI practices and bias mitigation | Comprehensive ethics page with principles |

---

## 2. Technology Stack

### 2.1 Frontend Architecture

The frontend is built with modern React 19 and Tailwind CSS 4, providing a responsive, elegant user experience across all devices.

| Component | Technology | Purpose |
|-----------|-----------|---------|
| UI Framework | React 19 | Component-based UI with hooks and concurrent rendering |
| Styling | Tailwind CSS 4 | Utility-first CSS with OKLCH color space for refined aesthetics |
| State Management | React Hooks + tRPC | Local state with type-safe server communication |
| Visualization | Recharts | Composable charting library for radar and bar charts |
| Routing | Wouter | Lightweight client-side routing |
| Form Handling | React Hook Form | Efficient form state management |
| UI Components | shadcn/ui | Pre-built, accessible component library |
| Notifications | Sonner | Toast notifications for user feedback |

**Key Design Decisions:**

- **OKLCH Color Space:** Provides perceptually uniform colors with better accessibility than HSL
- **Component-Based Architecture:** Reusable, maintainable UI components with clear separation of concerns
- **Type Safety:** Full TypeScript coverage ensures compile-time error detection
- **Responsive Design:** Mobile-first approach with Tailwind breakpoints for all screen sizes

### 2.2 Backend Architecture

The backend is built with Node.js and Express, providing a scalable, maintainable server-side foundation.

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Runtime | Node.js 22 | JavaScript runtime for server-side execution |
| Web Framework | Express 4 | HTTP routing and middleware |
| RPC Framework | tRPC 11 | Type-safe remote procedure calls with end-to-end type safety |
| ORM | Drizzle ORM | Type-safe database access with migrations |
| LLM Integration | OpenAI SDK | GPT models for CV parsing and analysis |
| Authentication | Manus OAuth | Secure user authentication and session management |
| File Storage | AWS S3 | Cloud storage for uploaded CV files |

**Key Design Decisions:**

- **tRPC:** Eliminates the need for manual REST contracts; types flow end-to-end from database to frontend
- **Drizzle ORM:** Provides type-safe database access with zero-runtime overhead
- **Stateless Design:** Each request is independent, enabling horizontal scaling
- **Structured Logging:** All operations logged for debugging and monitoring

### 2.3 Database Architecture

The database uses MySQL/TiDB with Drizzle ORM for type-safe schema management.

```sql
-- Core Tables
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobRoles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  requiredSkills JSON NOT NULL,
  yearsOfExperienceRequired INT,
  educationRequirements TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cvAnalyses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  fileName VARCHAR(255),
  targetRole VARCHAR(255),
  personalInfo JSON,
  skills JSON,
  experience JSON,
  education JSON,
  certifications JSON,
  scoring JSON,
  skillGaps JSON,
  recommendations JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Schema Design Principles:**

- **Normalization:** Separate tables for users, roles, and analyses with proper foreign keys
- **JSON Storage:** Complex nested data (skills, experience, scoring) stored as JSON for flexibility
- **Timestamps:** All records include creation and update timestamps for audit trails
- **Cascading Deletes:** User deletion automatically removes associated analyses

---

## 3. AI/ML Implementation

### 3.1 CV Parsing Strategy

The CV parsing pipeline uses OpenAI's GPT models with structured JSON schema validation to extract and validate resume information.

**Parsing Pipeline:**

1. **Input Processing:** Accept PDF or plain text CV content
2. **LLM Extraction:** Send CV text to GPT with structured schema prompt
3. **JSON Validation:** Validate extracted data against predefined schema
4. **Data Normalization:** Standardize extracted fields (dates, skill names, etc.)
5. **Storage:** Save parsed data to database for future reference

**Extracted Data Structure:**

```json
{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "summary": "string"
  },
  "skills": [
    {
      "name": "string",
      "category": "technical|soft|domain",
      "impliedProficiency": "beginner|intermediate|advanced|expert"
    }
  ],
  "experience": [
    {
      "title": "string",
      "company": "string",
      "duration": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "responsibilities": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "field": "string",
      "institution": "string",
      "graduationDate": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "dateObtained": "YYYY-MM"
    }
  ]
}
```

### 3.2 Scoring Methodology

The scoring engine uses a transparent, weighted multi-dimensional approach that users can fully understand and verify.

**Scoring Dimensions:**

| Dimension | Weight | Calculation Method | Scale |
|-----------|--------|-------------------|-------|
| Skills Match | 30% | (Matched Skills / Required Skills) × 100 | 0-100 |
| Experience | 25% | (Total Years / Required Years) × 100, capped at 100 | 0-100 |
| Education | 15% | Presence of relevant degree: 100 if present, 0 otherwise | 0-100 |
| Certifications | 15% | (Relevant Certs / Expected Certs) × 100, capped at 100 | 0-100 |
| Completeness | 15% | (Filled Fields / Total Fields) × 100 | 0-100 |

**Overall Score Calculation:**

```
Overall Score = (Skills × 0.30) + (Experience × 0.25) + (Education × 0.15) + (Certifications × 0.15) + (Completeness × 0.15)
```

**Score Interpretation:**

- **90-100:** Excellent fit for the target role
- **75-89:** Strong candidate with minor gaps
- **60-74:** Moderate fit with notable skill gaps
- **45-59:** Significant gaps requiring development
- **0-44:** Substantial misalignment with role requirements

### 3.3 Skill Gap Analysis

The skill gap analysis compares extracted CV skills against industry-standard requirements for the selected role.

**Gap Analysis Process:**

1. **Extract User Skills:** Parse skills from CV with proficiency levels
2. **Load Role Requirements:** Retrieve standard skill set for target role
3. **Match Skills:** Compare user skills against requirements (case-insensitive, fuzzy matching)
4. **Calculate Gap:** Determine percentage of missing skills
5. **Categorize:** Separate matched and missing skills by category

**Skill Matching Algorithm:**

- **Exact Match:** Identical skill names (e.g., "Python" = "Python")
- **Fuzzy Match:** Similar skill names (e.g., "JS" ≈ "JavaScript", Levenshtein distance < 2)
- **Category Match:** Related skills in same category (e.g., "Node.js" matches "JavaScript" requirement)

### 3.4 Recommendation Engine

The recommendation engine generates personalized, actionable suggestions based on skill gaps and profile analysis.

**Recommendation Categories:**

| Category | Trigger | Example |
|----------|---------|---------|
| Skill Development | Missing high-priority skills | "Learn Python for data manipulation and analysis" |
| Certification | Missing industry certifications | "Pursue AWS Solutions Architect certification" |
| Experience | Insufficient years in role | "Gain 2+ years of hands-on experience in cloud architecture" |
| Profile Enhancement | Incomplete or weak sections | "Add quantifiable achievements to work experience" |
| Specialization | Emerging skills in field | "Develop expertise in machine learning and AI" |

**Recommendation Prioritization:**

- **High Priority:** Critical skills for role success (weight: 1.0)
- **Medium Priority:** Important but not essential skills (weight: 0.7)
- **Low Priority:** Nice-to-have skills for competitive advantage (weight: 0.4)

**Time Estimates:**

- Skill learning: 2-6 months depending on complexity
- Certification: 3-6 months of study
- Experience: 1-3 years of hands-on work
- Profile enhancement: 1-2 weeks

---

## 4. Proposed API Integration Plans

### 4.1 LinkedIn Integration

**Purpose:** Enrich user profile data and validate resume information against LinkedIn profile.

**Integration Approach:**

- OAuth 2.0 authentication for secure access
- Fetch user profile, experience, skills, and endorsements
- Compare LinkedIn skills against CV skills for validation
- Analyze skill endorsement patterns to assess proficiency

**Endpoints:**

```
GET /api/linkedin/profile
GET /api/linkedin/skills
GET /api/linkedin/experience
POST /api/linkedin/sync
```

**Data Enrichment:**

- Validate work experience dates and company information
- Cross-reference skills with endorsement counts
- Identify skills with high endorsements (strong proficiency indicators)
- Suggest missing skills based on LinkedIn recommendations

### 4.2 GitHub Integration

**Purpose:** Analyze developer profiles and extract technical skills from repositories.

**Integration Approach:**

- GitHub REST API v3 for public profile data
- Analyze repository languages and technologies
- Calculate developer activity score based on contributions
- Extract technical skills from repository descriptions and code

**Endpoints:**

```
GET /api/github/profile/{username}
GET /api/github/repositories
GET /api/github/languages
GET /api/github/activity
```

**Technical Skill Extraction:**

- Primary languages: Extract from repository language statistics
- Frameworks and libraries: Parse from repository dependencies (package.json, requirements.txt, etc.)
- Tools and platforms: Infer from repository structure and CI/CD configurations
- Contribution patterns: Analyze commit history for consistency and activity

### 4.3 Tableau Integration

**Purpose:** Create interactive dashboards for career progression tracking and benchmarking.

**Integration Approach:**

- Tableau Public API for dashboard creation
- Export analysis data to Tableau for visualization
- Create role-specific benchmarking dashboards
- Track career progression over time

**Dashboard Types:**

1. **Personal Profile Dashboard:** Individual skill progression and score history
2. **Role Comparison Dashboard:** Compare profile against role requirements
3. **Industry Benchmark Dashboard:** Compare against industry standards
4. **Skill Development Roadmap:** Track learning progress and certifications

### 4.4 Power BI Integration

**Purpose:** Enable organizations to analyze team skills and identify training needs.

**Integration Approach:**

- Power BI REST API for data connectivity
- Create organizational skill inventory dashboards
- Identify team skill gaps and training priorities
- Generate reports for HR and management

**Organizational Dashboards:**

1. **Team Skills Inventory:** Aggregate skills across team members
2. **Skill Gap Analysis:** Identify missing skills at team level
3. **Training Recommendations:** Prioritized learning paths for team
4. **Certification Tracking:** Monitor team certification progress

---

## 5. Ethical AI Practices

### 5.1 Bias Mitigation Strategies

**Problem Statement:** Algorithmic bias can perpetuate discrimination and create unfair outcomes for underrepresented groups.

**Mitigation Approach:**

| Strategy | Implementation | Monitoring |
|----------|-----------------|------------|
| Skill-Focused Evaluation | Exclude demographic data from scoring | Quarterly bias audits |
| Industry Standards | Use published role requirements, not individual biases | Expert review of role definitions |
| Diverse Training Data | Train on diverse CV samples | Statistical parity testing |
| Explainability | Show all scoring factors transparently | User feedback analysis |
| Regular Audits | Analyze score distributions by demographics | Disparate impact testing |

**Specific Measures:**

- **Data Exclusion:** Never use name, age, gender, race, national origin, or other protected characteristics in scoring
- **Role Definitions:** Base role requirements on Bureau of Labor Statistics, industry associations, and peer-reviewed research
- **Validation:** Test scoring algorithm against diverse CV samples to ensure consistent treatment
- **Transparency:** Display all scoring factors and weights to users for verification

### 5.2 Transparency Principles

**Commitment:** Users have the right to understand how their profile is evaluated.

**Implementation:**

1. **Score Breakdown:** Every score includes detailed breakdown showing contribution of each factor
2. **Data Visibility:** Users can review all extracted data and verify accuracy
3. **Methodology Documentation:** Complete explanation of scoring algorithm and weights
4. **Appeal Process:** Users can request review if they believe analysis is unfair or inaccurate

**Transparency Dashboard:**

```
Overall Score: 78/100

Score Breakdown:
├── Skills Match (30%): 85 → +25.5 points
├── Experience (25%): 72 → +18.0 points
├── Education (15%): 90 → +13.5 points
├── Certifications (15%): 60 → +9.0 points
└── Completeness (15%): 95 → +14.25 points
```

### 5.3 Fairness Principles

**Equal Opportunity:** All users evaluated using identical criteria regardless of background.

**Fairness Commitments:**

- **No Discrimination:** Explicitly prohibit discrimination based on protected characteristics
- **Consistent Standards:** Apply same scoring criteria to all users
- **Actionable Feedback:** Recommendations focus on skill development, not demographic changes
- **Appeal Rights:** Users can challenge analysis results

**Fairness Testing:**

- **Demographic Parity:** Verify similar score distributions across demographic groups
- **Equalized Odds:** Ensure similar true positive and false positive rates across groups
- **Calibration:** Verify predictions are equally accurate across demographic groups

### 5.4 Data Privacy & Security

**Privacy Principles:**

| Principle | Implementation | Verification |
|-----------|-----------------|--------------|
| Data Minimization | Collect only necessary CV data | Regular audit of stored fields |
| User Control | Users can delete data anytime | Delete functionality in UI |
| Encryption | AES-256 at rest, TLS 1.3 in transit | Security audit annually |
| No Sharing | Never share data without consent | Privacy policy enforcement |
| GDPR Compliance | Support data export and deletion | Regular compliance review |

**Security Measures:**

- **Encryption:** All CV files encrypted with AES-256 at rest
- **Secure Transport:** TLS 1.3 for all data in transit
- **Access Control:** Role-based access control (RBAC) for admin functions
- **Audit Logging:** All data access logged and monitored
- **Regular Testing:** Quarterly security audits and penetration testing

---

## 6. System Architecture

### 6.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ CV Upload    │  │  Dashboard   │  │  History     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Documentation│  │  Ethics      │  │  Navigation  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │   tRPC API      │
                   │  (Type-Safe)    │
                   └────────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐      ┌──────▼──────┐     ┌─────▼─────┐
   │ CV Parse │      │ Scoring     │     │ Skill Gap │
   │ (LLM)    │      │ Engine      │     │ Analysis  │
   └────┬────┘      └──────┬──────┘     └─────┬─────┘
        │                  │                   │
        └──────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Recommend   │
                    │ Engine      │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
   │ Database │      │ File Store │     │ Cache     │
   │ (MySQL)  │      │ (S3)       │     │ (Redis)   │
   └──────────┘      └────────────┘     └───────────┘
```

### 6.2 Data Flow

**CV Analysis Flow:**

```
1. User uploads CV file
   ↓
2. File validation (size, format)
   ↓
3. File storage to S3
   ↓
4. Extract text from PDF/plain text
   ↓
5. Send to LLM for parsing
   ↓
6. Validate extracted JSON schema
   ↓
7. Calculate scores (5 dimensions)
   ↓
8. Perform skill gap analysis
   ↓
9. Generate recommendations
   ↓
10. Store analysis to database
   ↓
11. Return results to frontend
   ↓
12. Display dashboard with visualizations
```

### 6.3 Scalability Considerations

**Horizontal Scaling:**

- **Stateless Backend:** Each request independent, enabling multiple server instances
- **Database Replication:** MySQL read replicas for query scaling
- **Caching Layer:** Redis for frequently accessed role definitions and skill mappings
- **CDN:** CloudFront for static assets and API responses

**Performance Optimization:**

- **Lazy Loading:** Load analysis history only when requested
- **Pagination:** Limit result sets to improve response times
- **Indexing:** Database indexes on frequently queried fields (userId, createdAt)
- **Query Optimization:** Minimize N+1 queries through proper joins

---

## 7. Deployment & Operations

### 7.1 Deployment Architecture

**Production Environment:**

- **Frontend:** Deployed to CDN (CloudFront) for global distribution
- **Backend:** Node.js application on Cloud Run with auto-scaling
- **Database:** Managed MySQL/TiDB with automated backups
- **Storage:** AWS S3 with lifecycle policies for cost optimization

### 7.2 Monitoring & Logging

**Key Metrics:**

- **API Response Time:** Track p50, p95, p99 latencies
- **Error Rate:** Monitor 4xx and 5xx error rates
- **LLM API Cost:** Track OpenAI API usage and costs
- **Database Performance:** Monitor query times and connection pools
- **User Engagement:** Track feature usage and conversion funnels

**Logging Strategy:**

- **Application Logs:** Structured JSON logging with correlation IDs
- **Access Logs:** HTTP request/response logging for debugging
- **Error Tracking:** Sentry integration for exception monitoring
- **Audit Logs:** Track all data access and modifications

---

## 8. Future Enhancements

### 8.1 Short-Term (3-6 months)

- **LinkedIn Integration:** Real-time profile synchronization
- **GitHub Integration:** Automatic skill extraction from repositories
- **Export Functionality:** PDF report generation and sharing
- **Mobile App:** Native iOS/Android applications
- **Real-Time Collaboration:** Share analysis with mentors or career coaches

### 8.2 Medium-Term (6-12 months)

- **Tableau Dashboards:** Interactive visualizations for career tracking
- **Power BI Integration:** Organizational skill inventory management
- **Machine Learning:** Predictive models for career progression
- **Skill Marketplace:** Connect users with learning opportunities
- **Job Matching:** Recommend roles based on profile analysis

### 8.3 Long-Term (12+ months)

- **AI Coaching:** Conversational AI for career guidance
- **Salary Benchmarking:** Market-rate salary insights
- **Networking Recommendations:** Connect with professionals in target roles
- **Certification Marketplace:** Curated learning paths and certifications
- **Enterprise Solutions:** White-label platform for organizations

---

## 9. Conclusion

The CV Analyzer represents a significant advancement in AI-powered career development tools. By combining transparent scoring, intelligent skill gap analysis, and personalized recommendations with a strong commitment to ethical AI practices, the system provides genuine value to users while maintaining fairness, privacy, and accountability.

The architecture is designed for scalability, maintainability, and future expansion. The proposed API integrations with LinkedIn, GitHub, Tableau, and Power BI will enable rich ecosystem integration and organizational-level insights.

This comprehensive approach to CV analysis sets a new standard for ethical, transparent AI in the career development space.

---

## References

[1] OpenAI. (2024). "GPT-4 API Documentation." Retrieved from https://platform.openai.com/docs/guides/gpt

[2] Drizzle ORM. (2024). "Type-Safe SQL Query Builder." Retrieved from https://orm.drizzle.team/

[3] tRPC. (2024). "End-to-End Typesafe APIs." Retrieved from https://trpc.io/

[4] Tailwind CSS. (2024). "Utility-First CSS Framework." Retrieved from https://tailwindcss.com/

[5] React. (2024). "The JavaScript Library for Building User Interfaces." Retrieved from https://react.dev/

[6] AWS S3. (2024). "Amazon Simple Storage Service Documentation." Retrieved from https://aws.amazon.com/s3/

[7] LinkedIn. (2024). "LinkedIn API Documentation." Retrieved from https://docs.microsoft.com/en-us/linkedin/

[8] GitHub. (2024). "GitHub REST API Documentation." Retrieved from https://docs.github.com/en/rest

[9] Tableau. (2024). "Tableau Public API." Retrieved from https://public.tableau.com/

[10] Microsoft Power BI. (2024). "Power BI REST API." Retrieved from https://learn.microsoft.com/en-us/rest/api/power-bi/

[11] Buolamwini, B., & Gebru, T. (2018). "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification." In Conference on Fairness, Accountability and Transparency (pp. 77-91). PMLR.

[12] Selbst, A. D., & Barocas, S. (2019). "The Intuitive Appeal of Explainable Machines." Fordham L. Rev., 87, 1085.

[13] European Union. (2018). "General Data Protection Regulation (GDPR)." Retrieved from https://gdpr-info.eu/

[14] California Consumer Privacy Act. (2020). "CCPA Regulations." Retrieved from https://oag.ca.gov/privacy/ccpa

