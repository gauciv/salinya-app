/**
 * Fallback data for Maria Santos resume analysis
 * Used when resume analysis API fails
 */

export const mariaSantosFallbackData = {
  resumeUploaded: true,
  fileName: "MARIA-SANTOS_RESUME.pdf",
  resumeId: "fallback-maria-santos-001",
  analysisResults: {
    compatibility_score: 78,
    top_technical_skills_found: [
      "Customer Service",
      "Data Analysis", 
      "Process Improvement",
      "Quality Assurance",
      "Team Leadership",
      "Microsoft Office",
      "CRM Systems",
      "Problem Solving"
    ],
    compatibility_explanation: "Maria has strong foundational skills from her BPO experience that translate well to tech careers. Her customer service expertise, data analysis capabilities, and process improvement experience make her an excellent candidate for roles in Customer Success, Business Analysis, or Quality Assurance in tech companies.",
    suggested_keywords: [
      "Agile Methodology",
      "SQL Basics", 
      "Project Management",
      "User Experience",
      "Technical Documentation",
      "Software Testing",
      "Business Intelligence",
      "Stakeholder Management"
    ],
    career_recommendations: [
      {
        title: "Customer Success Manager",
        match_percentage: 85,
        description: "Perfect fit for your customer service background with tech company growth",
        required_skills: ["Customer Relationship Management", "Data Analysis", "Communication"],
        learning_path: ["Customer Success Fundamentals", "SaaS Business Models", "Customer Analytics"]
      },
      {
        title: "Business Analyst", 
        match_percentage: 75,
        description: "Your process improvement skills align well with business analysis roles",
        required_skills: ["Requirements Gathering", "Process Mapping", "SQL", "Documentation"],
        learning_path: ["Business Analysis Fundamentals", "SQL for Analysts", "Agile Methodology"]
      },
      {
        title: "Quality Assurance Specialist",
        match_percentage: 70,
        description: "Your attention to detail and quality focus translate perfectly to QA",
        required_skills: ["Test Planning", "Bug Tracking", "Automation Tools", "Documentation"],
        learning_path: ["Software Testing Fundamentals", "Test Automation", "QA Tools & Processes"]
      }
    ],
    learning_roadmap: {
      immediate_focus: [
        {
          skill: "SQL Fundamentals",
          duration: "2-3 weeks",
          priority: "High",
          description: "Essential for data analysis roles"
        },
        {
          skill: "Agile Methodology",
          duration: "1-2 weeks", 
          priority: "High",
          description: "Standard in most tech companies"
        }
      ],
      short_term: [
        {
          skill: "Customer Success Tools",
          duration: "3-4 weeks",
          priority: "Medium",
          description: "Salesforce, HubSpot, Zendesk"
        },
        {
          skill: "Data Visualization",
          duration: "2-3 weeks",
          priority: "Medium", 
          description: "Tableau, Power BI basics"
        }
      ],
      long_term: [
        {
          skill: "Project Management Certification",
          duration: "2-3 months",
          priority: "Low",
          description: "PMP or Scrum Master certification"
        },
        {
          skill: "Advanced Analytics",
          duration: "3-4 months",
          priority: "Low",
          description: "Python for data analysis"
        }
      ]
    },
    strengths: [
      "Strong communication and interpersonal skills",
      "Proven ability to handle complex customer issues",
      "Experience with process optimization and quality improvement",
      "Leadership experience managing teams",
      "Adaptability and quick learning ability"
    ],
    areas_for_improvement: [
      "Technical skills in programming languages",
      "Familiarity with software development lifecycle",
      "Understanding of cloud technologies",
      "Experience with modern collaboration tools"
    ]
  },
  uploadedAt: new Date().toISOString()
}