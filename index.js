// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Interactive Elements
const setupInteractiveElements = () => {
    const assessmentButton = document.getElementById('assessmentButton');
    const assessmentContent = document.getElementById('assessmentContent');
    const resourceFinderButton = document.getElementById('resourceFinderButton');
    const resourceFinderContent = document.getElementById('resourceFinderContent');
    
    if (assessmentButton && assessmentContent) {
        assessmentButton.addEventListener('click', () => {
            assessmentContent.style.display = assessmentContent.style.display === 'block' ? 'none' : 'block';
            if (assessmentContent.style.display === 'block') {
                // Create assessment form when shown
                createAssessmentForm(assessmentContent);
            }
        });
    }
    
    if (resourceFinderButton && resourceFinderContent) {
        resourceFinderButton.addEventListener('click', () => {
            resourceFinderContent.style.display = resourceFinderContent.style.display === 'block' ? 'none' : 'block';
            if (resourceFinderContent.style.display === 'block') {
                // Create resource finder when shown
                createResourceFinder(resourceFinderContent);
            }
        });
    }
}

// Create the comprehensive self-assessment tool
const createAssessmentForm = (container) => {
    // Define assessment categories and questions
    const assessmentData = [
        {
            category: "Academic Stress",
            icon: "fas fa-book",
            description: "Evaluates how academic demands and expectations are affecting your mental wellbeing",
            questions: [
                {
                    question: "How often do you feel overwhelmed by your academic workload?",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"]
                },
                {
                    question: "How difficult is it for you to maintain focus during study sessions?",
                    options: ["Not difficult", "Slightly difficult", "Somewhat difficult", "Very difficult", "Extremely difficult"]
                },
                {
                    question: "How often do you procrastinate on assignments due to feeling overwhelmed?",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"]
                },
                {
                    question: "How concerned are you about your academic performance?",
                    options: ["Not concerned", "Slightly concerned", "Moderately concerned", "Very concerned", "Extremely concerned"]
                }
            ]
        },
        {
            category: "Social Connection",
            icon: "fas fa-users",
            description: "Measures your sense of belonging and social support within your academic community",
            questions: [
                {
                    question: "How connected do you feel to other students at your institution?",
                    options: ["Very connected", "Somewhat connected", "Neutral", "Somewhat disconnected", "Very disconnected"]
                },
                {
                    question: "How comfortable are you reaching out to peers when you need support?",
                    options: ["Very comfortable", "Somewhat comfortable", "Neutral", "Somewhat uncomfortable", "Very uncomfortable"]
                },
                {
                    question: "How often do you participate in social activities or events on campus?",
                    options: ["Very frequently", "Frequently", "Sometimes", "Rarely", "Never"]
                },
                {
                    question: "Do you have people you can rely on when facing challenges?",
                    options: ["Definitely yes", "Probably yes", "Not sure", "Probably not", "Definitely not"]
                }
            ]
        },
        {
            category: "Personal Wellbeing",
            icon: "fas fa-heart",
            description: "Assesses your general mental health status, including sleep, self-care, and emotional regulation",
            questions: [
                {
                    question: "How would you rate your overall sleep quality?",
                    options: ["Excellent", "Good", "Fair", "Poor", "Very poor"]
                },
                {
                    question: "How often do you engage in self-care activities (exercise, hobbies, relaxation)?",
                    options: ["Daily", "Several times a week", "Once a week", "Rarely", "Never"]
                },
                {
                    question: "How difficult is it for you to manage stress?",
                    options: ["Not difficult", "Slightly difficult", "Moderately difficult", "Very difficult", "Extremely difficult"]
                },
                {
                    question: "How often do you experience persistent negative thoughts or emotions?",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"]
                }
            ]
        }
    ];

    // Student profile questions
    const profileQuestions = [
        {
            question: "Which best describes your current academic situation?",
            options: ["First-year student", "Transfer student", "International student", "Student-athlete", "Returning/continuing student", "Other"]
        },
        {
            question: "What is your primary field of study?",
            options: ["STEM", "Humanities", "Business", "Arts", "Social Sciences", "Health Sciences", "Undecided/Other"]
        },
        {
            question: "How many credit hours are you currently taking?",
            options: ["Less than 12", "12-15", "16-18", "More than 18"]
        }
    ];

    // Create the form HTML
    let formHTML = '<form id="mentalHealthAssessment">';
    
    // Add assessment categories
    assessmentData.forEach((category, catIndex) => {
        formHTML += `
            <div class="assessment-category">
                <h4><i class="${category.icon}"></i> ${category.category}</h4>
                <p class="category-description">${category.description}</p>
        `;
        
        // Add questions for this category
        category.questions.forEach((q, qIndex) => {
            const questionId = `cat${catIndex}_q${qIndex}`;
            
            formHTML += `
                <div class="question-block">
                    <p class="question">${q.question}</p>
                    <div class="options-group">
            `;
            
            // Add options for this question
            q.options.forEach((option, optIndex) => {
                formHTML += `
                    <label class="option-label">
                        <input type="radio" name="${questionId}" value="${optIndex}" required>
                        <span class="option-text">${option}</span>
                    </label>
                `;
            });
            
            formHTML += `
                    </div>
                </div>
            `;
        });
        
        formHTML += '</div>';
    });
    
    // Add profile questions
    formHTML += `<div class="assessment-category">
        <h4><i class="fas fa-user-circle"></i> Your Profile</h4>
        <p class="category-description">This information helps tailor recommendations to your specific circumstances</p>
    `;
    
    profileQuestions.forEach((q, index) => {
        formHTML += `
            <div class="question-block">
                <p class="question">${q.question}</p>
                <div class="options-group">
        `;
        
        q.options.forEach((option, optIndex) => {
            formHTML += `
                <label class="option-label">
                    <input type="radio" name="profile${index}" value="${optIndex}" required>
                    <span class="option-text">${option}</span>
                </label>
            `;
        });
        
        formHTML += `
                </div>
            </div>
        `;
    });
    
    formHTML += `</div>
        <button type="submit" class="submit-button">Get Personalized Assessment</button>
    </form>
    <div id="assessmentResults" style="display: none;"></div>`;
    
    container.innerHTML = formHTML;
    
    // Add event listener to form submission
    document.getElementById('mentalHealthAssessment').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Calculate scores for each category
        const scores = assessmentData.map((category, catIndex) => {
            let totalScore = 0;
            let answeredQuestions = 0;
            
            category.questions.forEach((_, qIndex) => {
                const questionId = `cat${catIndex}_q${qIndex}`;
                const selected = document.querySelector(`input[name="${questionId}"]:checked`);
                
                if (selected) {
                    // For most questions, higher values (4) indicate more issues
                    // For positively worded questions, we need to invert the score
                    let score = parseInt(selected.value);
                    
                    // Check if this is a positively worded question that needs score inversion
                    if ((catIndex === 1 && (qIndex === 0 || qIndex === 2 || qIndex === 3)) || 
                        (catIndex === 2 && qIndex === 1)) {
                        score = 4 - score; // Invert the 0-4 scale
                    }
                    
                    totalScore += score;
                    answeredQuestions++;
                }
            });
            
            // Calculate percentage
            const maxPossibleScore = answeredQuestions * 4; // 4 is max value per question
            const scorePercentage = (totalScore / maxPossibleScore) * 100;
            
            return {
                category: category.category,
                score: scorePercentage,
                level: scorePercentage < 30 ? "low" : scorePercentage < 60 ? "moderate" : "high"
            };
        });
        
        // Get profile information
        const profile = {
            studentType: profileQuestions[0].options[getSelectedValue('profile0')],
            fieldOfStudy: profileQuestions[1].options[getSelectedValue('profile1')],
            creditHours: profileQuestions[2].options[getSelectedValue('profile2')]
        };
        
        // Generate personalized recommendations
        displayResults(scores, profile);
    });
    
    // Helper function to get selected radio button value
    const getSelectedValue = (name) => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? parseInt(selected.value) : null;
    };
    
    // Display assessment results
    const displayResults = (scores, profile) => {
        const resultsContainer = document.getElementById('assessmentResults');
        resultsContainer.style.display = 'block';
        
        let resultsHTML = `
            <div class="results-summary">
                <h3>Your Mental Health Assessment Results</h3>
                <p>Based on your responses, we've analyzed your wellbeing across three key dimensions:</p>
                
                <div class="dimension-scores">
        `;
        
        // Add score visualization for each dimension
        scores.forEach(score => {
            const levelClass = `score-${score.level}`;
            const levelText = score.level === "low" ? "Good" : score.level === "moderate" ? "Moderate concern" : "High concern";
            
            resultsHTML += `
                <div class="dimension-score">
                    <div class="dimension-label">${score.category}:</div>
                    <div class="score-bar">
                        <div class="score-value ${levelClass}" style="width: ${score.score}%"></div>
                    </div>
                    <div class="score-text">${levelText}</div>
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
            
            <h3>Personalized Recommendations</h3>
            <p>Based on your profile as a ${profile.studentType.toLowerCase()} studying ${profile.fieldOfStudy.toLowerCase()} with ${profile.creditHours.toLowerCase()} credit hours, here are your tailored recommendations:</p>
            
            <div class="recommendation-block">
        `;
        
        // Generate recommendations based on scores and profile
        const recommendations = generateRecommendations(scores, profile);
        recommendations.forEach(rec => {
            resultsHTML += `
                <div class="recommendation">
                    <h5>${rec.title}</h5>
                    <p>${rec.description}</p>
                </div>
            `;
        });
        
        resultsHTML += `
            </div>
            <p class="important-note"><strong>Note:</strong> This assessment is not a clinical diagnostic tool. If you're experiencing significant distress, please contact your institution's counseling services or a mental health professional.</p>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Generate recommendations based on assessment results
    const generateRecommendations = (scores, profile) => {
        const recommendations = [];
        
        // Academic Stress Recommendations
        const academicScore = scores.find(s => s.category === "Academic Stress");
        if (academicScore) {
            if (academicScore.level === "high") {
                recommendations.push({
                    title: "Academic Workload Management",
                    description: "Your responses indicate significant academic stress. Consider meeting with an academic advisor to review your course load and develop a manageable study schedule that includes regular breaks and self-care time."
                });
                
                // Add recommendation based on credit hours
                if (profile.creditHours === "More than 18") {
                    recommendations.push({
                        title: "Credit Hour Reduction",
                        description: "Consider reducing your course load next semester. Research shows that students with excessive credit hours experience significantly higher levels of burnout and reduced academic performance."
                    });
                }
            } else if (academicScore.level === "moderate") {
                recommendations.push({
                    title: "Study Skills Enhancement",
                    description: "You're experiencing moderate academic stress. Explore resources at your campus learning center for study skills workshops, time management techniques, and academic coaching to help manage your workload more effectively."
                });
            }
        }
        
        // Social Connection Recommendations
        const socialScore = scores.find(s => s.category === "Social Connection");
        if (socialScore) {
            if (socialScore.level === "high") {
                // Tailored recommendation based on student type
                if (profile.studentType === "International student") {
                    recommendations.push({
                        title: "International Student Community",
                        description: "As an international student, building social connections can be challenging. Consider joining your institution's international student association or cultural groups, and explore mentor programs specifically designed for international students."
                    });
                } else if (profile.studentType === "Transfer student") {
                    recommendations.push({
                        title: "Transfer Student Networking",
                        description: "Transfer students often face unique challenges in establishing social connections. Look into transfer student organizations and peer mentoring programs at your institution to connect with others who share similar experiences."
                    });
                } else {
                    recommendations.push({
                        title: "Social Connection Building",
                        description: "Your responses indicate feelings of social isolation. Consider joining student organizations related to your interests or major, attending campus events, or participating in study groups to build meaningful connections."
                    });
                }
            }
        }
        
        // Personal Wellbeing Recommendations
        const wellbeingScore = scores.find(s => s.category === "Personal Wellbeing");
        if (wellbeingScore) {
            if (wellbeingScore.level === "high") {
                recommendations.push({
                    title: "Mental Health Support",
                    description: "Your responses suggest significant concerns with personal wellbeing, including possible difficulties with sleep, stress management, or emotional regulation. We strongly recommend connecting with your campus counseling center for support."
                });
            } else if (wellbeingScore.level === "moderate") {
                recommendations.push({
                    title: "Wellness Practices",
                    description: "Consider incorporating regular self-care practices into your routine, such as mindfulness meditation, physical activity, or journaling. These practices can help manage stress and improve overall wellbeing."
                });
            }
            
            // Sleep-specific recommendation if applicable
            if (wellbeingScore.level === "high" || wellbeingScore.level === "moderate") {
                recommendations.push({
                    title: "Sleep Hygiene Improvement",
                    description: "Prioritize healthy sleep habits by maintaining a consistent sleep schedule, creating a relaxing bedtime routine, limiting screen time before bed, and creating a comfortable sleep environment."
                });
            }
        }
        
        // Field of study specific recommendation
        if (profile.fieldOfStudy === "STEM") {
            recommendations.push({
                title: "STEM-Specific Support",
                description: "STEM fields often involve high workloads and pressure. Consider joining a study group or seeking peer tutoring to manage challenging coursework. Look for mentorship opportunities with upper-level students or faculty in your field."
            });
        } else if (profile.fieldOfStudy === "Arts") {
            recommendations.push({
                title: "Creative Expression for Wellbeing",
                description: "As an arts student, consider using your creative practices not only for academic work but also as a therapeutic outlet for stress and emotional expression."
            });
        }
        
        return recommendations;
    };
}

// Create the resource finder tool
const createResourceFinder = (container) => {
    // Resources based on the paper's findings
    const resources = [
        {
            name: "First-Year Fellows (FYF) Program",
            type: "Mentorship",
            description: "Pairs upperclassmen with first-year students sharing the same or related major to provide continuous, personalized guidance and support.",
            forGroups: ["All Students", "First-Year Students"],
            link: "#"
        },
        {
            name: "Transfer Student Network",
            type: "Peer Support",
            description: "Support group specifically for Community College Transfer students to help navigate credit transfers and adjustment to university life.",
            forGroups: ["Transfer Students"],
            link: "#"
        },
        {
            name: "International Student Mentorship",
            type: "Mentorship",
            description: "Culturally sensitive mentoring program that pairs international students with peers who can help with acculturation and cultural adjustment.",
            forGroups: ["International Students"],
            link: "#"
        },
        {
            name: "Student-Athlete Mental Health Initiative",
            type: "Support Program",
            description: "Specialized support for student-athletes managing the dual pressures of academic and athletic performance.",
            forGroups: ["Student-Athletes"],
            link: "#"
        },
        {
            name: "Academic Stress Management Workshop",
            type: "Workshop",
            description: "Learn effective techniques to manage academic pressures, workload, and exam stress.",
            forGroups: ["All Students", "High-Stress Majors"],
            link: "#"
        },
        {
            name: "Counseling Center",
            type: "Professional Support",
            description: "Provides confidential mental health services including individual counseling, group therapy, and crisis intervention.",
            forGroups: ["All Students"],
            link: "#"
        }
    ];

    let finderHTML = `
        <div class="resource-filter">
            <h3>Find Resources That Match Your Needs</h3>
            <div class="filter-options">
                <div class="filter-group">
                    <label>I am a:</label>
                    <select id="studentTypeFilter">
                        <option value="All Students">All Students</option>
                        <option value="First-Year Students">First-Year Student</option>
                        <option value="Transfer Students">Transfer Student</option>
                        <option value="International Students">International Student</option>
                        <option value="Student-Athletes">Student-Athlete</option>
                        <option value="High-Stress Majors">Student in High-Stress Major</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Resource Type:</label>
                    <select id="resourceTypeFilter">
                        <option value="All">All Types</option>
                        <option value="Mentorship">Mentorship</option>
                        <option value="Peer Support">Peer Support</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Professional Support">Professional Support</option>
                    </select>
                </div>
            </div>
            <button id="filterResourcesButton" class="filter-button">Find Resources</button>
        </div>
        <div id="resourceResults" class="resource-results"></div>
    `;
    
    container.innerHTML = finderHTML;
    
    // Add event listener to filter button
    document.getElementById('filterResourcesButton').addEventListener('click', () => {
        const studentType = document.getElementById('studentTypeFilter').value;
        const resourceType = document.getElementById('resourceTypeFilter').value;
        
        // Filter resources
        let filteredResources = resources;
        
        if (studentType !== "All Students") {
            filteredResources = filteredResources.filter(resource => 
                resource.forGroups.includes(studentType)
            );
        }
        
        if (resourceType !== "All") {
            filteredResources = filteredResources.filter(resource => 
                resource.type === resourceType
            );
        }
        
        // Display filtered resources
        const resultsContainer = document.getElementById('resourceResults');
        
        if (filteredResources.length === 0) {
            resultsContainer.innerHTML = '<p>No resources match your criteria. Please try different filters.</p>';
            return;
        }
        
        let resultsHTML = '<h3>Recommended Resources</h3>';
        
        filteredResources.forEach(resource => {
            resultsHTML += `
                <div class="resource-result">
                    <h4>${resource.name}</h4>
                    <span class="resource-type">${resource.type}</span>
                    <p>${resource.description}</p>
                    <a href="${resource.link}" class="resource-link">Learn More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = resultsHTML;
    });
}

// Create charts for data visualization
const createCharts = () => {
    // Mental Health Prevalence Chart - Updated with precise Bryant & Welding data (76% with moderate to serious distress)
    const mentalHealthCtx = document.getElementById('mentalHealthChart');
    if (mentalHealthCtx) {
        new Chart(mentalHealthCtx, {
            type: 'bar',
            data: {
                labels: ['No/Minimal Distress', 'Moderate to Serious Distress'],
                datasets: [{
                    label: 'Percentage of Undergraduate Students',
                    data: [24, 76], // Based on 2023 ACHA survey showing 76% experiencing moderate to serious distress
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Psychological Distress Among Undergraduate Students (2023)'
                    }
                }
            }
        });
    }

    // College Impact on Mental Health Chart - Using precise Bryant and Welding data
    const mentalHealthImpactCtx = document.getElementById('mentalHealthImpactChart');
    if (mentalHealthImpactCtx) {
        new Chart(mentalHealthImpactCtx, {
            type: 'pie',
            data: {
                labels: ['Worsened', 'Stayed the Same or Improved'],
                datasets: [{
                    label: 'Mental Health in College',
                    data: [51, 49], // Based on Bryant & Welding survey of 1,000 undergraduate students
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Impact of College on Student Mental Health'
                    }
                }
            }
        });
    }

    // Diagnosed Mental Health Conditions Chart - Based on ACHA's Spring 2023 survey data
    const diagnosedConditionsCtx = document.getElementById('academicBurdenChart');
    if (diagnosedConditionsCtx) {
        new Chart(diagnosedConditionsCtx, {
            type: 'bar',
            data: {
                labels: ['Anxiety', 'Depression', 'Trauma/PTSD', 'Eating Disorder', 'OCD', 'Bipolar', 'Substance Use'],
                datasets: [{
                    label: 'Percentage of Students Diagnosed',
                    data: [36, 28, 8, 7, 7, 3, 1], // Exact percentages from the ACHA 2023 survey
                    backgroundColor: 'rgba(153, 102, 255, 0.7)',
                    borderColor: 'rgb(153, 102, 255)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Mental Health Conditions Diagnosed in College Students (2023)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage of Students'
                        }
                    }
                }
            }
        });
    }
}

// Scroll animations
const setupScrollAnimations = () => {
    // Get all sections
    const sections = document.querySelectorAll('.section');
    
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Audio player functionality
const setupAudioPlayer = () => {
    const playButton = document.querySelector('.audio-player i');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Toggle between play and pause icons
            if (playButton.classList.contains('fa-play-circle')) {
                playButton.classList.remove('fa-play-circle');
                playButton.classList.add('fa-pause-circle');
                // Audio would play here in a real implementation
            } else {
                playButton.classList.remove('fa-pause-circle');
                playButton.classList.add('fa-play-circle');
                // Audio would pause here in a real implementation
            }
        });
    }
}

// Smooth scrolling for navigation links
const setupSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Wait for DOM to be loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    setupInteractiveElements();
    createCharts();
    setupScrollAnimations();
    setupAudioPlayer();
    setupSmoothScrolling();
    
    // Add CSS class for animation
    document.body.classList.add('loaded');
});