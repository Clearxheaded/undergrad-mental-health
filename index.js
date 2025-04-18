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

// Create the self-assessment tool
const createAssessmentForm = (container) => {
    const questions = [
        {
            question: "How often do you feel overwhelmed by academic pressure?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
        },
        {
            question: "How well do you feel connected to your academic community?",
            options: ["Very connected", "Somewhat connected", "Neutral", "Somewhat disconnected", "Very disconnected"]
        },
        {
            question: "How often do you have trouble sleeping due to academic stress?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
        },
        {
            question: "Do you have access to mentors who understand your specific challenges?",
            options: ["Definitely yes", "Somewhat yes", "Unsure", "Somewhat no", "Definitely no"]
        },
        {
            question: "Are you a transfer student, international student, or student athlete?",
            options: ["Yes, transfer student", "Yes, international student", "Yes, student athlete", "No", "Prefer not to say"]
        }
    ];
    
    let formHTML = '<form id="mentalHealthAssessment">';
    
    questions.forEach((q, index) => {
        formHTML += `<div class="question-block">
            <p class="question">${index + 1}. ${q.question}</p>
            <div class="options-group">`;
        
        q.options.forEach((option, optIndex) => {
            formHTML += `
                <label class="option-label">
                    <input type="radio" name="question${index}" value="${optIndex}">
                    <span class="option-text">${option}</span>
                </label>`;
        });
        
        formHTML += `</div>
        </div>`;
    });
    
    formHTML += `
        <button type="submit" class="submit-button">Get Recommendations</button>
    </form>
    <div id="assessmentResults" style="display: none;"></div>`;
    
    container.innerHTML = formHTML;
    
    // Add event listener to form submission
    document.getElementById('mentalHealthAssessment').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Calculate a simple score (this would be more sophisticated in real implementation)
        let needsMentorship = false;
        let needsCounseling = false;
        
        // Check responses to determine recommendations
        const responses = questions.map((_, index) => {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            return selected ? parseInt(selected.value) : null;
        });
        
        // If scoring high on overwhelm or sleep issues, suggest counseling
        if (responses[0] > 2 || responses[2] > 2) {
            needsCounseling = true;
        }
        
        // If scoring low on connection or mentorship, suggest mentorship
        if (responses[1] > 2 || responses[3] > 2) {
            needsMentorship = true;
        }
        
        // Display results
        const resultsContainer = document.getElementById('assessmentResults');
        resultsContainer.style.display = 'block';
        
        let recommendationHTML = `
            <h3>Your Assessment Results</h3>
            <p>Based on your responses, here are some personalized recommendations:</p>
            <ul>`;
        
        if (needsCounseling) {
            recommendationHTML += `<li>Consider scheduling a consultation with campus counseling services to address stress and potential sleep issues.</li>`;
        }
        
        if (needsMentorship) {
            recommendationHTML += `<li>You might benefit from joining a mentorship program like the First-Year Fellows (FYF) to increase your sense of connection and support.</li>`;
        }
        
        // Add specific recommendations based on student type (question 5)
        if (responses[4] === 0) { // Transfer student
            recommendationHTML += `<li>As a transfer student, connect with specific transfer student resources and peer mentors who understand the unique challenges of "transfer shock".</li>`;
        } else if (responses[4] === 1) { // International student
            recommendationHTML += `<li>As an international student, cultural adjustment resources and international student mentors could help with acculturation difficulties.</li>`;
        } else if (responses[4] === 2) { // Student athlete
            recommendationHTML += `<li>Student-athlete specific mental health resources can help balance the demands of academics and athletic performance.</li>`;
        }
        
        recommendationHTML += `</ul>
            <p>Remember, seeking help is a sign of strength. Many students face similar challenges, and resources are available to support you.</p>`;
        
        resultsContainer.innerHTML = recommendationHTML;
    });
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
    createCharts(); // Add this line to create charts
    setupScrollAnimations();
    setupAudioPlayer();
    setupSmoothScrolling();
    
    // Add CSS class for animation
    document.body.classList.add('loaded');
});