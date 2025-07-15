# SUMAKSES - Business Logic

## Core Assessment Algorithm

### Skills Assessment Engine

#### 1. **Skills Extraction and Mapping**

##### BPO Skills to Tech Skills Translation Matrix
```
Communication Skills:
- BPO: Customer service, phone etiquette, email writing
- Tech: Technical documentation, user communication, stakeholder management
- Weight: 85% (high transferability)

Problem-Solving:
- BPO: Issue resolution, troubleshooting, escalation handling
- Tech: Debug processes, system analysis, solution architecture
- Weight: 90% (direct transferability)

Process Optimization:
- BPO: Workflow improvement, SOP development, quality assurance
- Tech: DevOps practices, automation, system optimization
- Weight: 80% (high transferability)

Technical Aptitude:
- BPO: CRM systems, ticketing tools, basic troubleshooting
- Tech: Software development, system administration, data analysis
- Weight: 60% (moderate transferability)

Training & Mentoring:
- BPO: New hire training, team leadership, knowledge transfer
- Tech: Team leadership, technical mentoring, project management
- Weight: 85% (high transferability)

Documentation:
- BPO: Case notes, process documentation, reporting
- Tech: Technical documentation, code comments, system specifications
- Weight: 95% (very high transferability)
```

#### 2. **Skill Assessment Scoring Algorithm**

##### Resume-Based Assessment
```python
def assess_resume_skills(resume_text, years_experience):
    """
    Extract and score skills from resume text
    """
    skill_scores = {}
    
    # Extract skills using NLP
    extracted_skills = extract_skills_nlp(resume_text)
    
    # Calculate base scores
    for skill in extracted_skills:
        base_score = calculate_base_score(skill, resume_text)
        experience_multiplier = min(years_experience * 0.2, 1.0)
        skill_scores[skill] = base_score * (1 + experience_multiplier)
    
    # Apply BPO-to-tech transferability weights
    tech_scores = {}
    for bpo_skill, score in skill_scores.items():
        tech_equivalents = get_tech_equivalents(bpo_skill)
        for tech_skill, weight in tech_equivalents.items():
            tech_scores[tech_skill] = score * weight
    
    return normalize_scores(tech_scores)
```

##### Interactive Assessment Scoring
```python
def assess_interactive_responses(responses):
    """
    Score user responses from interactive assessment
    """
    category_scores = {
        'communication': 0,
        'problem_solving': 0,
        'technical_aptitude': 0,
        'learning_agility': 0,
        'collaboration': 0
    }
    
    for question_id, response in responses.items():
        question_config = get_question_config(question_id)
        category = question_config['category']
        
        # Calculate response score based on question type
        if question_config['type'] == 'multiple_choice':
            score = calculate_mc_score(response, question_config)
        elif question_config['type'] == 'scenario':
            score = calculate_scenario_score(response, question_config)
        elif question_config['type'] == 'rating':
            score = calculate_rating_score(response, question_config)
        
        category_scores[category] += score
    
    # Normalize scores to 0-100 range
    return normalize_category_scores(category_scores)
```

### Career Compatibility Algorithm

#### 1. **Compatibility Scoring Formula**

```python
def calculate_career_compatibility(user_skills, career_requirements, market_data):
    """
    Calculate compatibility score for user-career pair
    """
    # Component weights
    SKILL_MATCH_WEIGHT = 0.70
    MARKET_DEMAND_WEIGHT = 0.25
    TRANSITION_HISTORY_WEIGHT = 0.05
    
    # Calculate skill match score
    skill_match_score = calculate_skill_match(user_skills, career_requirements)
    
    # Calculate market demand score
    market_demand_score = calculate_market_demand(career_requirements, market_data)
    
    # Calculate transition history score
    transition_score = calculate_transition_success_rate(user_skills, career_requirements)
    
    # Weighted final score
    compatibility_score = (
        skill_match_score * SKILL_MATCH_WEIGHT +
        market_demand_score * MARKET_DEMAND_WEIGHT +
        transition_score * TRANSITION_HISTORY_WEIGHT
    )
    
    return {
        'overall_score': compatibility_score,
        'skill_match': skill_match_score,
        'market_demand': market_demand_score,
        'transition_success': transition_score,
        'confidence_level': calculate_confidence_level(compatibility_score)
    }
```

#### 2. **Skill Match Calculation**

```python
def calculate_skill_match(user_skills, career_requirements):
    """
    Calculate how well user skills match career requirements
    """
    required_skills = career_requirements['required_skills']
    preferred_skills = career_requirements['preferred_skills']
    
    # Calculate required skills match
    required_match_score = 0
    for skill, importance in required_skills.items():
        user_skill_level = user_skills.get(skill, 0)
        required_match_score += min(user_skill_level / 100, 1.0) * importance
    
    # Calculate preferred skills match
    preferred_match_score = 0
    for skill, importance in preferred_skills.items():
        user_skill_level = user_skills.get(skill, 0)
        preferred_match_score += min(user_skill_level / 100, 1.0) * importance
    
    # Weighted combination (80% required, 20% preferred)
    total_match_score = (
        required_match_score * 0.8 +
        preferred_match_score * 0.2
    )
    
    return min(total_match_score * 100, 100)
```

### Learning Path Generation Algorithm

#### 1. **Personalized Roadmap Creation**

```python
def generate_learning_roadmap(user_profile, target_career, time_commitment):
    """
    Generate personalized learning roadmap
    """
    # Get career requirements
    career_requirements = get_career_requirements(target_career)
    
    # Identify skill gaps
    skill_gaps = identify_skill_gaps(user_profile['skills'], career_requirements)
    
    # Create learning modules
    learning_modules = create_learning_modules(skill_gaps, user_profile['learning_style'])
    
    # Optimize sequence based on dependencies
    optimized_sequence = optimize_learning_sequence(learning_modules)
    
    # Adjust timeline based on time commitment
    timeline = calculate_timeline(optimized_sequence, time_commitment)
    
    return {
        'modules': optimized_sequence,
        'timeline': timeline,
        'milestones': create_milestones(optimized_sequence, timeline),
        'estimated_completion': calculate_completion_date(timeline)
    }
```

#### 2. **Learning Module Prioritization**

```python
def prioritize_learning_modules(skill_gaps, career_requirements, user_profile):
    """
    Prioritize learning modules based on importance and difficulty
    """
    priority_scores = {}
    
    for skill, gap_level in skill_gaps.items():
        # Calculate importance score
        importance = career_requirements.get(skill, {}).get('importance', 0.5)
        
        # Calculate difficulty score
        difficulty = calculate_learning_difficulty(skill, user_profile)
        
        # Calculate foundation dependency score
        foundation_score = calculate_foundation_dependency(skill, user_profile['skills'])
        
        # Calculate market urgency score
        market_urgency = get_market_urgency(skill)
        
        # Weighted priority score
        priority_score = (
            importance * 0.4 +
            (1 - difficulty) * 0.3 +
            foundation_score * 0.2 +
            market_urgency * 0.1
        )
        
        priority_scores[skill] = priority_score
    
    return sorted(priority_scores.items(), key=lambda x: x[1], reverse=True)
```

### Progress Tracking Algorithm

#### 1. **Learning Progress Calculation**

```python
def calculate_learning_progress(user_id, learning_path):
    """
    Calculate overall learning progress
    """
    completed_modules = get_completed_modules(user_id)
    total_modules = len(learning_path['modules'])
    
    # Calculate completion percentage
    completion_percentage = len(completed_modules) / total_modules * 100
    
    # Calculate weighted progress (considering module importance)
    weighted_progress = 0
    total_weight = 0
    
    for module in learning_path['modules']:
        module_weight = module['importance_weight']
        total_weight += module_weight
        
        if module['id'] in completed_modules:
            weighted_progress += module_weight
    
    weighted_completion = weighted_progress / total_weight * 100
    
    # Calculate skill progression
    skill_progression = calculate_skill_progression(user_id, learning_path)
    
    return {
        'completion_percentage': completion_percentage,
        'weighted_completion': weighted_completion,
        'skill_progression': skill_progression,
        'estimated_time_remaining': calculate_time_remaining(user_id, learning_path)
    }
```

#### 2. **Skill Progression Tracking**

```python
def calculate_skill_progression(user_id, learning_path):
    """
    Track progression in individual skills
    """
    skill_progression = {}
    
    for skill in learning_path['target_skills']:
        # Get initial skill level
        initial_level = get_initial_skill_level(user_id, skill)
        
        # Get current skill level from assessments
        current_level = get_current_skill_level(user_id, skill)
        
        # Get target skill level
        target_level = learning_path['target_skills'][skill]['target_level']
        
        # Calculate progression
        total_improvement_needed = target_level - initial_level
        current_improvement = current_level - initial_level
        
        progression_percentage = (
            current_improvement / total_improvement_needed * 100
            if total_improvement_needed > 0 else 100
        )
        
        skill_progression[skill] = {
            'initial_level': initial_level,
            'current_level': current_level,
            'target_level': target_level,
            'progression_percentage': min(progression_percentage, 100)
        }
    
    return skill_progression
```

### Job Readiness Algorithm

#### 1. **Readiness Score Calculation**

```python
def calculate_job_readiness(user_id, target_career):
    """
    Calculate user's readiness for job applications
    """
    # Get career requirements
    career_requirements = get_career_requirements(target_career)
    
    # Get user's current skills
    current_skills = get_user_current_skills(user_id)
    
    # Calculate skill readiness
    skill_readiness = calculate_skill_readiness(current_skills, career_requirements)
    
    # Calculate portfolio readiness
    portfolio_readiness = calculate_portfolio_readiness(user_id, career_requirements)
    
    # Calculate soft skills readiness
    soft_skills_readiness = calculate_soft_skills_readiness(user_id, career_requirements)
    
    # Calculate interview readiness
    interview_readiness = calculate_interview_readiness(user_id, career_requirements)
    
    # Weighted readiness score
    readiness_score = (
        skill_readiness * 0.4 +
        portfolio_readiness * 0.3 +
        soft_skills_readiness * 0.2 +
        interview_readiness * 0.1
    )
    
    return {
        'overall_readiness': readiness_score,
        'skill_readiness': skill_readiness,
        'portfolio_readiness': portfolio_readiness,
        'soft_skills_readiness': soft_skills_readiness,
        'interview_readiness': interview_readiness,
        'recommendation': get_readiness_recommendation(readiness_score)
    }
```

#### 2. **Portfolio Assessment**

```python
def calculate_portfolio_readiness(user_id, career_requirements):
    """
    Assess user's portfolio readiness
    """
    portfolio_items = get_user_portfolio(user_id)
    required_portfolio_items = career_requirements['portfolio_requirements']
    
    portfolio_score = 0
    
    for requirement in required_portfolio_items:
        requirement_type = requirement['type']
        requirement_weight = requirement['weight']
        
        # Check if user has matching portfolio items
        matching_items = [
            item for item in portfolio_items
            if item['type'] == requirement_type
        ]
        
        if matching_items:
            # Quality assessment of portfolio items
            quality_score = assess_portfolio_quality(matching_items, requirement)
            portfolio_score += quality_score * requirement_weight
    
    return min(portfolio_score, 100)
```

### Recommendation Engine

#### 1. **Career Path Recommendations**

```python
def recommend_career_paths(user_profile, limit=5):
    """
    Recommend career paths based on user profile
    """
    all_careers = get_all_tech_careers()
    career_scores = {}
    
    for career in all_careers:
        # Calculate compatibility score
        compatibility = calculate_career_compatibility(
            user_profile['skills'],
            career['requirements'],
            get_market_data(career['id'])
        )
        
        # Calculate growth potential
        growth_potential = calculate_growth_potential(career)
        
        # Calculate salary potential
        salary_potential = calculate_salary_potential(career, user_profile['location'])
        
        # Calculate learning effort required
        learning_effort = calculate_learning_effort(user_profile, career)
        
        # Combined recommendation score
        recommendation_score = (
            compatibility['overall_score'] * 0.5 +
            growth_potential * 0.2 +
            salary_potential * 0.2 +
            (100 - learning_effort) * 0.1
        )
        
        career_scores[career['id']] = {
            'career': career,
            'recommendation_score': recommendation_score,
            'compatibility': compatibility,
            'growth_potential': growth_potential,
            'salary_potential': salary_potential,
            'learning_effort': learning_effort
        }
    
    # Sort by recommendation score and return top recommendations
    sorted_careers = sorted(
        career_scores.items(),
        key=lambda x: x[1]['recommendation_score'],
        reverse=True
    )
    
    return sorted_careers[:limit]
```

#### 2. **Learning Content Recommendations**

```python
def recommend_learning_content(user_id, current_module):
    """
    Recommend specific learning content based on user progress and preferences
    """
    user_profile = get_user_profile(user_id)
    learning_style = user_profile['learning_style']
    progress_data = get_user_progress(user_id)
    
    # Get content options for current module
    content_options = get_module_content_options(current_module)
    
    # Filter content based on learning style
    filtered_content = filter_content_by_style(content_options, learning_style)
    
    # Score content based on user preferences and performance
    content_scores = {}
    for content in filtered_content:
        score = calculate_content_score(content, user_profile, progress_data)
        content_scores[content['id']] = score
    
    # Sort by score and return recommendations
    sorted_content = sorted(
        content_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )
    
    return sorted_content[:10]
```

### Gamification Logic

#### 1. **SAKSES Points System**

```python
def calculate_sakses_points(user_action, context):
    """
    Calculate SAKSES points earned for user actions
    """
    point_values = {
        'module_completion': 100,
        'assessment_completion': 50,
        'community_post': 25,
        'peer_help': 30,
        'streak_milestone': 200,
        'skill_certification': 300,
        'mentorship_session': 150,
        'job_application': 500,
        'career_transition': 1000
    }
    
    base_points = point_values.get(user_action, 0)
    
    # Apply multipliers based on context
    multiplier = 1.0
    
    if context.get('difficulty_level') == 'advanced':
        multiplier *= 1.5
    elif context.get('difficulty_level') == 'expert':
        multiplier *= 2.0
    
    if context.get('streak_active'):
        multiplier *= 1.2
    
    if context.get('community_impact') > 0:
        multiplier *= (1 + context['community_impact'] * 0.1)
    
    final_points = int(base_points * multiplier)
    
    return final_points
```

#### 2. **Achievement System**

```python
def check_achievements(user_id, recent_action):
    """
    Check if user has earned any achievements
    """
    user_data = get_user_data(user_id)
    new_achievements = []
    
    achievement_definitions = get_achievement_definitions()
    
    for achievement in achievement_definitions:
        if achievement['id'] in user_data['earned_achievements']:
            continue
        
        # Check if achievement conditions are met
        if check_achievement_conditions(achievement, user_data, recent_action):
            new_achievements.append(achievement)
            
            # Award achievement
            award_achievement(user_id, achievement)
            
            # Award bonus points
            award_bonus_points(user_id, achievement['bonus_points'])
    
    return new_achievements
```

### Community Engagement Logic

#### 1. **Mentorship Matching Algorithm**

```python
def match_mentors(user_id, preferences):
    """
    Match users with appropriate mentors
    """
    user_profile = get_user_profile(user_id)
    available_mentors = get_available_mentors()
    
    mentor_scores = {}
    
    for mentor in available_mentors:
        # Calculate compatibility score
        compatibility = calculate_mentor_compatibility(
            user_profile,
            mentor['profile'],
            preferences
        )
        
        # Calculate availability score
        availability = calculate_mentor_availability(mentor, preferences)
        
        # Calculate experience relevance
        experience_relevance = calculate_experience_relevance(
            user_profile['target_career'],
            mentor['career_path']
        )
        
        # Calculate success rate
        success_rate = mentor['mentorship_success_rate']
        
        # Combined matching score
        matching_score = (
            compatibility * 0.3 +
            availability * 0.2 +
            experience_relevance * 0.3 +
            success_rate * 0.2
        )
        
        mentor_scores[mentor['id']] = {
            'mentor': mentor,
            'matching_score': matching_score,
            'compatibility': compatibility,
            'availability': availability,
            'experience_relevance': experience_relevance
        }
    
    # Sort by matching score and return top matches
    sorted_mentors = sorted(
        mentor_scores.items(),
        key=lambda x: x[1]['matching_score'],
        reverse=True
    )
    
    return sorted_mentors[:5]
```

### Performance Analytics

#### 1. **Learning Effectiveness Tracking**

```python
def calculate_learning_effectiveness(user_id, time_period):
    """
    Calculate how effectively user is learning
    """
    learning_sessions = get_learning_sessions(user_id, time_period)
    assessments = get_assessments(user_id, time_period)
    
    # Calculate time efficiency
    total_time_spent = sum(session['duration'] for session in learning_sessions)
    skills_gained = calculate_skills_gained(user_id, time_period)
    time_efficiency = skills_gained / total_time_spent if total_time_spent > 0 else 0
    
    # Calculate retention rate
    retention_rate = calculate_retention_rate(user_id, assessments)
    
    # Calculate application rate
    application_rate = calculate_application_rate(user_id, time_period)
    
    # Calculate overall effectiveness
    effectiveness_score = (
        time_efficiency * 0.4 +
        retention_rate * 0.3 +
        application_rate * 0.3
    )
    
    return {
        'effectiveness_score': effectiveness_score,
        'time_efficiency': time_efficiency,
        'retention_rate': retention_rate,
        'application_rate': application_rate,
        'recommendations': generate_learning_recommendations(effectiveness_score)
    }
```

### Market Intelligence Integration

#### 1. **Job Market Analysis**

```python
def analyze_job_market(career_path, location, time_period):
    """
    Analyze job market trends for specific career path
    """
    job_postings = get_job_postings(career_path, location, time_period)
    salary_data = get_salary_data(career_path, location, time_period)
    
    # Calculate demand trends
    demand_trend = calculate_demand_trend(job_postings, time_period)
    
    # Calculate skill requirements trends
    skill_trends = analyze_skill_requirements(job_postings)
    
    # Calculate salary trends
    salary_trends = analyze_salary_trends(salary_data, time_period)
    
    # Calculate competition level
    competition_level = calculate_competition_level(career_path, location)
    
    return {
        'demand_trend': demand_trend,
        'skill_trends': skill_trends,
        'salary_trends': salary_trends,
        'competition_level': competition_level,
        'recommendations': generate_market_recommendations(
            demand_trend, skill_trends, salary_trends, competition_level
        )
    }
```

This comprehensive business logic framework ensures that SUMAKSES provides accurate, personalized, and effective career transition guidance based on data-driven algorithms and user-centered design principles. 