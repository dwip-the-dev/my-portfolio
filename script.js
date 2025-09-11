// DOM Elements
const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const messageToast = document.getElementById('messageToast');
const blogGrid = document.getElementById('blogGrid');
const blogLoading = document.getElementById('blogLoading');
const filterBtns = document.querySelectorAll('.filter-btn');

// State Management
let currentSection = 'home';
let isLoading = false;
let animationQueue = [];
let currentFilter = 'all';

// Dynamic Blog Data - 50+ Articles
const blogPosts = [
    // Recent Posts (2024-2025)
    {
        id: 1,
        title: "Building Real-Time Chat Apps with WebSockets",
        excerpt: "Learn how to create interactive chat applications using WebSocket technology and Node.js for seamless real-time communication.",
        category: "web",
        date: "2025-01-15",
        views: 2420,
        likes: 189,
        readTime: "8 min read",
        tags: ["WebSocket", "Node.js", "Real-time"]
    },
    {
        id: 2,
        title: "Python API Development with FastAPI",
        excerpt: "Complete guide to building high-performance APIs using FastAPI, including authentication, validation, and documentation.",
        category: "python",
        date: "2025-01-10",
        views: 3150,
        likes: 256,
        readTime: "12 min read",
        tags: ["Python", "FastAPI", "API"]
    },
    {
        id: 3,
        title: "Advanced MySQL Query Optimization",
        excerpt: "Deep dive into MySQL performance tuning, indexing strategies, and complex query optimization techniques.",
        category: "tutorial",
        date: "2025-01-05",
        views: 1890,
        likes: 134,
        readTime: "15 min read",
        tags: ["MySQL", "Database", "Performance"]
    },
    {
        id: 4,
        title: "Creating Dynamic Forms with JavaScript",
        excerpt: "Build interactive and responsive forms with real-time validation and dynamic field generation using vanilla JavaScript.",
        category: "web",
        date: "2024-12-28",
        views: 1450,
        likes: 98,
        readTime: "9 min read",
        tags: ["JavaScript", "Forms", "Validation"]
    },
    {
        id: 5,
        title: "RESTful API Design Best Practices",
        excerpt: "Essential principles for designing robust, scalable, and maintainable REST APIs with proper status codes and documentation.",
        category: "api",
        date: "2024-12-22",
        views: 2200,
        likes: 167,
        readTime: "11 min read",
        tags: ["REST", "API", "Design"]
    },
    {
        id: 6,
        title: "Python Data Structures and Algorithms",
        excerpt: "Comprehensive guide to implementing and optimizing common data structures and algorithms in Python.",
        category: "python",
        date: "2024-12-18",
        views: 2850,
        likes: 203,
        readTime: "20 min read",
        tags: ["Python", "Algorithms", "Data Structures"]
    },
    {
        id: 7,
        title: "Modern CSS Grid and Flexbox Layouts",
        excerpt: "Master responsive web layouts using CSS Grid and Flexbox with practical examples and best practices.",
        category: "web",
        date: "2024-12-15",
        views: 1680,
        likes: 125,
        readTime: "13 min read",
        tags: ["CSS", "Grid", "Flexbox"]
    },
    {
        id: 8,
        title: "Authentication and JWT Tokens in APIs",
        excerpt: "Implement secure authentication systems using JWT tokens, refresh tokens, and role-based access control.",
        category: "api",
        date: "2024-12-10",
        views: 1950,
        likes: 142,
        readTime: "14 min read",
        tags: ["JWT", "Authentication", "Security"]
    },
    {
        id: 9,
        title: "Building CLI Tools with Python",
        excerpt: "Create powerful command-line applications using Python's argparse, click, and other CLI development libraries.",
        category: "python",
        date: "2024-12-05",
        views: 1230,
        likes: 87,
        readTime: "10 min read",
        tags: ["Python", "CLI", "Tools"]
    },
    {
        id: 10,
        title: "Responsive Web Design Fundamentals",
        excerpt: "Learn the core principles of responsive design, mobile-first approach, and cross-browser compatibility.",
        category: "web",
        date: "2024-11-28",
        views: 2100,
        likes: 156,
        readTime: "12 min read",
        tags: ["Responsive", "Mobile", "CSS"]
    },
    // 2024 Posts
    {
        id: 11,
        title: "API Rate Limiting and Throttling",
        excerpt: "Implement effective rate limiting strategies to protect your APIs from abuse and ensure fair usage.",
        category: "api",
        date: "2024-11-22",
        views: 1580,
        likes: 112,
        readTime: "9 min read",
        tags: ["Rate Limiting", "API", "Security"]
    },
    {
        id: 12,
        title: "Python Web Scraping with BeautifulSoup",
        excerpt: "Extract data from websites efficiently using Python's BeautifulSoup library with practical examples.",
        category: "python",
        date: "2024-11-18",
        views: 1890,
        likes: 134,
        readTime: "11 min read",
        tags: ["Python", "Web Scraping", "BeautifulSoup"]
    },
    {
        id: 13,
        title: "JavaScript ES6+ Features Every Developer Should Know",
        excerpt: "Explore modern JavaScript features including arrow functions, destructuring, async/await, and modules.",
        category: "web",
        date: "2024-11-15",
        views: 2450,
        likes: 189,
        readTime: "16 min read",
        tags: ["JavaScript", "ES6", "Modern JS"]
    },
    {
        id: 14,
        title: "Database Migration Strategies",
        excerpt: "Best practices for managing database schema changes, versioning, and deployment strategies.",
        category: "tutorial",
        date: "2024-11-10",
        views: 1340,
        likes: 95,
        readTime: "13 min read",
        tags: ["Database", "Migration", "DevOps"]
    },
    {
        id: 15,
        title: "Error Handling in REST APIs",
        excerpt: "Comprehensive guide to implementing proper error handling, status codes, and user-friendly error messages.",
        category: "api",
        date: "2024-11-05",
        views: 1720,
        likes: 128,
        readTime: "10 min read",
        tags: ["Error Handling", "REST", "API"]
    },
    {
        id: 16,
        title: "Python Decorators Explained",
        excerpt: "Understand and implement Python decorators with practical examples and advanced use cases.",
        category: "python",
        date: "2024-10-28",
        views: 1650,
        likes: 117,
        readTime: "12 min read",
        tags: ["Python", "Decorators", "Advanced"]
    },
    {
        id: 17,
        title: "CSS Animation Performance Optimization",
        excerpt: "Optimize CSS animations for better performance using GPU acceleration and efficient animation techniques.",
        category: "web",
        date: "2024-10-25",
        views: 1480,
        likes: 103,
        readTime: "8 min read",
        tags: ["CSS", "Animation", "Performance"]
    },
    {
        id: 18,
        title: "Building Microservices with Python",
        excerpt: "Design and implement microservices architecture using Python, Docker, and container orchestration.",
        category: "python",
        date: "2024-10-20",
        views: 2350,
        likes: 178,
        readTime: "18 min read",
        tags: ["Microservices", "Python", "Docker"]
    },
    {
        id: 19,
        title: "Advanced Form Validation Techniques",
        excerpt: "Implement client-side and server-side validation with custom validators and real-time feedback.",
        category: "web",
        date: "2024-10-15",
        views: 1560,
        likes: 112,
        readTime: "11 min read",
        tags: ["Validation", "Forms", "JavaScript"]
    },
    {
        id: 20,
        title: "API Documentation with Swagger/OpenAPI",
        excerpt: "Create comprehensive API documentation using Swagger/OpenAPI specification and interactive documentation.",
        category: "api",
        date: "2024-10-10",
        views: 1890,
        likes: 145,
        readTime: "14 min read",
        tags: ["Swagger", "Documentation", "OpenAPI"]
    },
    // 2023-2024 Posts
    {
        id: 21,
        title: "Python Virtual Environments Best Practices",
        excerpt: "Manage Python dependencies effectively using virtual environments, pip, and requirements files.",
        category: "python",
        date: "2024-09-28",
        views: 1420,
        likes: 98,
        readTime: "9 min read",
        tags: ["Python", "Virtual Env", "Dependencies"]
    },
    {
        id: 22,
        title: "Modern JavaScript Testing Strategies",
        excerpt: "Implement comprehensive testing for JavaScript applications using Jest, testing libraries, and best practices.",
        category: "web",
        date: "2024-09-22",
        views: 1780,
        likes: 132,
        readTime: "15 min read",
        tags: ["Testing", "JavaScript", "Jest"]
    },
    {
        id: 23,
        title: "Database Indexing Fundamentals",
        excerpt: "Understand database indexing strategies, types of indexes, and when to use them for optimal performance.",
        category: "tutorial",
        date: "2024-09-18",
        views: 1650,
        likes: 119,
        readTime: "12 min read",
        tags: ["Database", "Indexing", "Performance"]
    },
    {
        id: 24,
        title: "Asynchronous JavaScript Patterns",
        excerpt: "Master async/await, promises, and callback patterns for handling asynchronous operations in JavaScript.",
        category: "web",
        date: "2024-09-15",
        views: 2100,
        likes: 165,
        readTime: "13 min read",
        tags: ["JavaScript", "Async", "Promises"]
    },
    {
        id: 25,
        title: "Python Context Managers",
        excerpt: "Learn to create and use context managers for resource management and clean code practices in Python.",
        category: "python",
        date: "2024-09-10",
        views: 1320,
        likes: 89,
        readTime: "10 min read",
        tags: ["Python", "Context Managers", "Best Practices"]
    },
    {
        id: 26,
        title: "API Versioning Strategies",
        excerpt: "Implement effective API versioning strategies to maintain backward compatibility and smooth migrations.",
        category: "api",
        date: "2024-09-05",
        views: 1580,
        likes: 115,
        readTime: "11 min read",
        tags: ["API", "Versioning", "Migration"]
    },
    {
        id: 27,
        title: "CSS Custom Properties (Variables)",
        excerpt: "Leverage CSS custom properties for dynamic styling, theming, and maintainable stylesheets.",
        category: "web",
        date: "2024-08-28",
        views: 1450,
        likes: 102,
        readTime: "8 min read",
        tags: ["CSS", "Variables", "Theming"]
    },
    {
        id: 28,
        title: "Python List Comprehensions and Generators",
        excerpt: "Write more efficient and readable Python code using list comprehensions, generator expressions, and iterators.",
        category: "python",
        date: "2024-08-22",
        views: 1890,
        likes: 142,
        readTime: "12 min read",
        tags: ["Python", "Comprehensions", "Generators"]
    },
    {
        id: 29,
        title: "Web Performance Optimization Techniques",
        excerpt: "Improve website performance through code splitting, lazy loading, and resource optimization strategies.",
        category: "web",
        date: "2024-08-18",
        views: 2200,
        likes: 178,
        readTime: "16 min read",
        tags: ["Performance", "Optimization", "Web"]
    },
    {
        id: 30,
        title: "Building GraphQL APIs with Python",
        excerpt: "Create flexible and efficient GraphQL APIs using Python libraries like Graphene and Strawberry.",
        category: "api",
        date: "2024-08-15",
        views: 1750,
        likes: 134,
        readTime: "14 min read",
        tags: ["GraphQL", "Python", "API"]
    },
    // More 2023-2024 Posts
    {
        id: 31,
        title: "JavaScript Module Systems (ES6, CommonJS)",
        excerpt: "Understand different JavaScript module systems and how to organize code effectively in modern applications.",
        category: "web",
        date: "2024-08-10",
        views: 1620,
        likes: 118,
        readTime: "10 min read",
        tags: ["JavaScript", "Modules", "ES6"]
    },
    {
        id: 32,
        title: "Python Type Hints and Static Analysis",
        excerpt: "Improve code quality and maintainability using Python type hints and static analysis tools like mypy.",
        category: "python",
        date: "2024-08-05",
        views: 1380,
        likes: 95,
        readTime: "11 min read",
        tags: ["Python", "Type Hints", "Static Analysis"]
    },
    {
        id: 33,
        title: "Database Connection Pooling",
        excerpt: "Optimize database performance and resource usage through effective connection pooling strategies.",
        category: "tutorial",
        date: "2024-07-28",
        views: 1490,
        likes: 108,
        readTime: "9 min read",
        tags: ["Database", "Connection Pooling", "Performance"]
    },
    {
        id: 34,
        title: "Responsive Images and Lazy Loading",
        excerpt: "Implement responsive images with proper lazy loading for optimal web performance and user experience.",
        category: "web",
        date: "2024-07-22",
        views: 1850,
        likes: 138,
        readTime: "12 min read",
        tags: ["Images", "Lazy Loading", "Performance"]
    },
    {
        id: 35,
        title: "API Security Best Practices",
        excerpt: "Secure your APIs against common vulnerabilities using authentication, authorization, and validation techniques.",
        category: "api",
        date: "2024-07-18",
        views: 2100,
        likes: 167,
        readTime: "15 min read",
        tags: ["Security", "API", "Authentication"]
    },
    {
        id: 36,
        title: "Python Multiprocessing and Threading",
        excerpt: "Leverage Python's multiprocessing and threading capabilities for concurrent and parallel programming.",
        category: "python",
        date: "2024-07-15",
        views: 1720,
        likes: 128,
        readTime: "13 min read",
        tags: ["Python", "Multiprocessing", "Threading"]
    },
    {
        id: 37,
        title: "CSS Grid Layout Patterns",
        excerpt: "Master CSS Grid with practical layout patterns and responsive design techniques for modern web layouts.",
        category: "web",
        date: "2024-07-10",
        views: 1580,
        likes: 115,
        readTime: "11 min read",
        tags: ["CSS Grid", "Layout", "Responsive"]
    },
    {
        id: 38,
        title: "Building Real-time Applications with WebSockets",
        excerpt: "Create interactive real-time applications using WebSocket technology for instant communication.",
        category: "tutorial",
        date: "2024-07-05",
        views: 1950,
        likes: 152,
        readTime: "14 min read",
        tags: ["WebSockets", "Real-time", "Communication"]
    },
    {
        id: 39,
        title: "Python Data Validation with Pydantic",
        excerpt: "Ensure data integrity and type safety using Pydantic for robust data validation in Python applications.",
        category: "python",
        date: "2024-06-28",
        views: 1430,
        likes: 102,
        readTime: "10 min read",
        tags: ["Python", "Pydantic", "Validation"]
    },
    {
        id: 40,
        title: "Progressive Web Apps (PWA) Development",
        excerpt: "Build modern web applications with PWA features like offline functionality and native app-like experience.",
        category: "web",
        date: "2024-06-22",
        views: 2250,
        likes: 182,
        readTime: "17 min read",
        tags: ["PWA", "Service Workers", "Offline"]
    },
    // Early 2023-2024 Posts
    {
        id: 41,
        title: "API Caching Strategies",
        excerpt: "Implement effective caching mechanisms to improve API performance and reduce server load.",
        category: "api",
        date: "2024-06-18",
        views: 1680,
        likes: 125,
        readTime: "12 min read",
        tags: ["Caching", "API", "Performance"]
    },
    {
        id: 42,
        title: "Python File Handling and I/O Operations",
        excerpt: "Master file operations, context managers, and I/O handling in Python for robust data processing.",
        category: "python",
        date: "2024-06-15",
        views: 1520,
        likes: 112,
        readTime: "9 min read",
        tags: ["Python", "File I/O", "Data Processing"]
    },
    {
        id: 43,
        title: "Modern CSS Selectors and Pseudo-classes",
        excerpt: "Leverage advanced CSS selectors and pseudo-classes for precise styling and interactive elements.",
        category: "web",
        date: "2024-06-10",
        views: 1390,
        likes: 98,
        readTime: "8 min read",
        tags: ["CSS", "Selectors", "Pseudo-classes"]
    },
    {
        id: 44,
        title: "Database Transaction Management",
        excerpt: "Understand ACID properties and implement proper transaction management for data consistency.",
        category: "tutorial",
        date: "2024-06-05",
        views: 1750,
        likes: 135,
        readTime: "13 min read",
        tags: ["Database", "Transactions", "ACID"]
    },
    {
        id: 45,
        title: "JavaScript Design Patterns",
        excerpt: "Apply common design patterns in JavaScript for maintainable and scalable application architecture.",
        category: "web",
        date: "2024-05-28",
        views: 2050,
        likes: 162,
        readTime: "15 min read",
        tags: ["JavaScript", "Design Patterns", "Architecture"]
    },
    {
        id: 46,
        title: "Python Package Distribution and PyPI",
        excerpt: "Learn to create, package, and distribute Python packages on PyPI for the community.",
        category: "python",
        date: "2024-05-22",
        views: 1280,
        likes: 89,
        readTime: "11 min read",
        tags: ["Python", "PyPI", "Packaging"]
    },
    {
        id: 47,
        title: "Cross-Origin Resource Sharing (CORS)",
        excerpt: "Understand and implement CORS policies for secure cross-origin requests in web applications.",
        category: "api",
        date: "2024-05-18",
        views: 1890,
        likes: 142,
        readTime: "10 min read",
        tags: ["CORS", "Security", "Web API"]
    },
    {
        id: 48,
        title: "CSS Container Queries",
        excerpt: "Create responsive components using CSS container queries for element-based responsive design.",
        category: "web",
        date: "2024-05-15",
        views: 1650,
        likes: 119,
        readTime: "9 min read",
        tags: ["CSS", "Container Queries", "Responsive"]
    },
    {
        id: 49,
        title: "Python Memory Management and Optimization",
        excerpt: "Optimize Python applications through effective memory management and performance profiling techniques.",
        category: "python",
        date: "2024-05-10",
        views: 1540,
        likes: 108,
        readTime: "12 min read",
        tags: ["Python", "Memory", "Optimization"]
    },
    {
        id: 50,
        title: "Building Accessible Web Applications",
        excerpt: "Create inclusive web experiences following WCAG guidelines and accessibility best practices.",
        category: "tutorial",
        date: "2024-05-05",
        views: 1920,
        likes: 156,
        readTime: "14 min read",
        tags: ["Accessibility", "WCAG", "Inclusive Design"]
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeBlogSystem();
    initializeParallaxEffects();
    
    // Remove preloader after initial load
    setTimeout(() => {
        hidePreloader();
    }, 3000);
});

// Preloader Animation
function initializePreloader() {
    const letters = document.querySelectorAll('.letter');
    const loadingProgress = document.querySelector('.loading-progress');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
    
    // Animate letters with staggered delay
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('active');
            
            // Add typewriter sound effect (visual feedback)
            letter.style.transform = 'scale(1.1)';
            setTimeout(() => {
                letter.style.transform = 'scale(1)';
            }, 150);
            
        }, 500 + (index * 400));
    });
}

function hidePreloader() {
    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.style.display = 'none';
        // Initialize page animations after preloader
        showSection('home');
        animateOnScroll();
    }, 500);
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add toggle animation
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
}

// Navigation Management
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetSection = e.currentTarget.getAttribute('data-section');
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Show target section
    showSection(targetSection);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Smooth scroll to section
    scrollToSection(targetSection);
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Trigger section-specific animations
        triggerSectionAnimations(sectionId);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver(handleSectionIntersection, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Enhanced parallax effects
    const floatingElements = document.querySelectorAll('.floating-circle, .floating-square, .floating-triangle');
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const rotation = scrolled * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
    
    // Parallax backgrounds
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
    });
    
    // Navbar background opacity
    if (scrolled > 50) {
        navbar.style.background = 'hsla(var(--bg-primary), 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'hsla(var(--bg-primary), 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

function handleSectionIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Update active navigation
            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === sectionId) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
            
            // Show section
            showSection(sectionId);
        }
    });
}

// Animation Management
function initializeAnimations() {
    // Animate elements on scroll
    animateOnScroll();
    
    // Statistics counter animation
    animateCounters();
    
    // Typewriter effect for code
    initializeTypewriter();
}

function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.portfolio-item, .blog-card, .timeline-item, .stat-card, .info-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
        element.style.animationPlayState = 'paused';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

function initializeTypewriter() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'typeWriter 0.5s ease-out forwards';
        }, 1000 + (index * 500));
    });
}

function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    const animatedElements = section.querySelectorAll('[class*="animate"]');
    
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * 100);
    });
}

// Portfolio PDF Download
function downloadPortfolio() {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = 'assets/portfolio.pdf';
    link.download = 'DWIP_Portfolio.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showToast('Portfolio downloaded successfully!', 'success');
}

// Contact Form Management
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Validate form
    if (!validateForm()) {
        showToast('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    isLoading = true;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Submit to Web3Forms
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Failed to send message. Please try again later.', 'error');
    } finally {
        // Reset loading state
        isLoading = false;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#EF4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = messageToast;
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `message-toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimizations
const debouncedHandleScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedHandleScroll);

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateSection(e.key === 'ArrowDown' ? 'next' : 'prev');
    }
});

function navigateSection(direction) {
    const sectionIds = ['home', 'portfolio', 'blogs', 'achievements', 'contact'];
    const currentIndex = sectionIds.indexOf(currentSection);
    
    let nextIndex;
    if (direction === 'next') {
        nextIndex = currentIndex < sectionIds.length - 1 ? currentIndex + 1 : 0;
    } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sectionIds.length - 1;
    }
    
    const nextSection = sectionIds[nextIndex];
    showSection(nextSection);
    scrollToSection(nextSection);
    
    // Update active nav link
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === nextSection) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// Blog System Functions
function initializeBlogSystem() {
    loadBlogs();
    initializeBlogFilters();
}

function initializeBlogFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setActiveFilter(e.target);
            filterBlogs(filter);
        });
    });
}

function setActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

function loadBlogs() {
    showBlogLoading();
    
    // Simulate API loading delay
    setTimeout(() => {
        renderBlogs(blogPosts);
        hideBlogLoading();
    }, 1500);
}

function showBlogLoading() {
    if (blogLoading) {
        blogLoading.classList.add('show');
    }
}

function hideBlogLoading() {
    if (blogLoading) {
        blogLoading.classList.remove('show');
    }
}

function filterBlogs(category) {
    showBlogLoading();
    currentFilter = category;
    
    setTimeout(() => {
        const filteredPosts = category === 'all' 
            ? blogPosts 
            : blogPosts.filter(post => post.category === category);
        
        renderBlogs(filteredPosts);
        hideBlogLoading();
    }, 800);
}

function renderBlogs(posts) {
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    posts.forEach((post, index) => {
        const blogCard = createBlogCard(post);
        blogCard.style.animationDelay = `${index * 0.1}s`;
        blogGrid.appendChild(blogCard);
    });
}

function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
        <div class="blog-header">
            <div class="blog-category">${getCategoryLabel(post.category)}</div>
            <div class="blog-date">
                <i class="fas fa-calendar"></i>
                ${formatDate(post.date)}
            </div>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
            <span class="blog-read-time">
                <i class="fas fa-clock"></i>
                ${post.readTime}
            </span>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="blog-footer">
            <div class="blog-stats">
                <span class="blog-stat">
                    <i class="fas fa-eye"></i>
                    ${formatNumber(post.views)} views
                </span>
                <span class="blog-stat">
                    <i class="fas fa-heart"></i>
                    ${post.likes} likes
                </span>
            </div>
            <a href="#" class="blog-link" onclick="openBlogPost(${post.id})">
                Read More
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    return card;
}

function getCategoryLabel(category) {
    const labels = {
        'api': 'API',
        'web': 'Web Dev',
        'python': 'Python',
        'tutorial': 'Tutorial'
    };
    return labels[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        showToast(`Opening "${post.title}" - Feature coming soon!`, 'info');
    }
}

// Parallax Effects
function initializeParallaxEffects() {
    // Add parallax backgrounds to sections
    const sectionsWithParallax = ['#home', '#portfolio', '#achievements'];
    
    sectionsWithParallax.forEach(selector => {
        const section = document.querySelector(selector);
        if (section && !section.querySelector('.parallax-bg')) {
            const parallaxBg = document.createElement('div');
            parallaxBg.className = 'parallax-bg';
            parallaxBg.dataset.speed = '0.3';
            section.style.position = 'relative';
            section.appendChild(parallaxBg);
        }
    });
    
    // Mouse parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', handleMouseParallax);
    }
}

function handleMouseParallax(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const floatingElements = e.currentTarget.querySelectorAll('.floating-circle, .floating-square, .floating-triangle');
    floatingElements.forEach((element, index) => {
        const intensity = (index + 1) * 10;
        element.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
}

// Enhanced Animation Functions
function addEnhancedAnimations() {
    // Add stagger animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
    
    // Add floating animation to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float-on-hover');
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('An unexpected error occurred. Please refresh the page.', 'error');
});

// Page Visibility API
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
        // Refresh section animations
        triggerSectionAnimations(currentSection);
    }
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker when needed
        console.log('Service Worker support detected');
    });
}

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.animate-text');
    animateElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Export functions for global access
window.downloadPortfolio = downloadPortfolio;
window.scrollToSection = scrollToSection;
window.showToast = showToast;
