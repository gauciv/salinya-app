# SUMAKSES - Context Files for LLM Development

## Overview
These context files provide comprehensive information for developing SUMAKSES, an AI-powered career transition platform for Filipino BPO professionals moving to technology careers.

## File Structure
```
sumakses_context/
├── README.md (This file)
├── 01_app_overview.md (Mission, vision, core value propositions)
├── 02_user_personas.md (Target users, pain points, goals)
├── 03_features_specification.json (All features with priorities and details)
├── 04_user_flows.yaml (Complete user journey mapping)
├── 05_technical_requirements.json (Tech stack, infrastructure, integrations)
├── 06_ui_ux_guidelines.md (Design principles, accessibility, mobile-first)
├── 07_business_logic.md (Assessment algorithms, scoring, recommendations)
├── 08_implementation_priority.json (Development phases and priorities)
└── 09_llama_index_context.json (RAG and chatbot specific requirements)
```

## Usage Instructions

### For Frontend Development
Use files: 01, 02, 04, 06, 08
Focus on: User experience, mobile-first design, Filipino cultural context

### For Backend Development  
Use files: 01, 03, 05, 07, 08
Focus on: API design, database schema, business logic, security

### For AI/Chatbot Development
Use files: 01, 02, 07, 09
Focus on: RAG implementation, user context understanding, personalization

### For Full-Stack Development
Use all files in sequence, prioritizing by implementation phase

## Key Context Points
- **Target Market**: Filipino BPO professionals (1.3M+ market)
- **Core Problem**: Skills translation from BPO to tech careers
- **Solution**: AI-powered personalized guidance and community support
- **Tech Stack**: React Native, Node.js, PostgreSQL, Llama Index for RAG
- **Cultural Context**: Filipino work culture, language preferences, salary expectations

## Development Phases
1. **Phase 1**: Core assessment and roadmap generation
2. **Phase 2**: Community features and continuous support
3. **Phase 3**: Advanced gamification and partnerships

## Important Notes
- Mobile-first design is critical (89% mobile usage in Philippines)
- Offline capability needed for limited data plans
- Multi-language support (English, Tagalog, Bisaya)
- Performance optimization for low-bandwidth environments
- Cultural sensitivity in messaging and user experience 