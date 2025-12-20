/**
 * script.js
 *
 * Handles dynamic content injection and all GSAP premium animations.
 */

// Import data from the separate projects file
import projectsData from './projects.js';

// --- CONFIGURATION DATA (Skills & Tools) ---
// Used for both About Me and Skills Sections
const skillsData = [
    { name: "HTML", percentage: 91, level: "Advanced", icon: "fab fa-html5", color: "text-orange-500" },
    { name: "CSS/Tailwind", percentage: 88, level: "Advanced", icon: "fab fa-css3-alt", color: "text-blue-500" },
    { name: "JavaScript", percentage: 78, level: "Intermediate", icon: "fab fa-js", color: "text-yellow-500" },
    { name: "React", percentage: 72, level: "Intermediate", icon: "fab fa-react", color: "text-cyan-400" },
    { name: "GitHub/Git", percentage: 90, level: "Advanced", icon: "fab fa-github", color: "text-gray-400" },
    { name: "VS Code", percentage: 95, level: "Expert", icon: "fas fa-code", color: "text-blue-400" },
    { name: "Vercel/Cloudflare", percentage: 85, level: "Advanced", icon: "fas fa-cloud", color: "text-gray-300" },
    { name: "Firebase", percentage: 65, level: "Intermediate", icon: "fas fa-fire", color: "text-orange-600" },
];

// --- 1. DYNAMIC CONTENT GENERATION ---

// Function to generate the skill card HTML
const generateSkillCard = (skill) => `
    <div class="p-4 bg-primary-dark/50 rounded-lg shadow-md border border-accent-pink/10">
        <div class="flex items-center space-x-4 mb-3">
            <i class="${skill.icon} ${skill.color} text-4xl"></i>
            <h4 class="text-xl font-semibold">${skill.name}</h4>
        </div>
        <p class="text-sm text-text-light/60 mb-2">${skill.level} (${skill.percentage}%)</p>
        <div class="w-full bg-primary-dark rounded-full h-2">
            <div class="bg-accent-pink h-2 rounded-full" style="width: ${skill.percentage}%" data-gsap="skill-bar"></div>
        </div>
    </div>
`;

// 1.1 Skills Summary (About Section)
const skillsSummaryContainer = document.getElementById('skills-summary-container');
skillsSummaryContainer.innerHTML = skillsData.slice(0, 4).map(generateSkillCard).join('');

// 1.2 Detailed Skills Section
const detailedSkillsContainer = document.getElementById('detailed-skills-container');
detailedSkillsContainer.innerHTML = skillsData.map(generateSkillCard).join('');


// Function to generate project card HTML
const generateProjectCard = (project, index) => {
    const isEven = index % 2 === 0;
    const layoutClass = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
    const tagHtml = project.tags.map(tag => `<span class="inline-block bg-accent-pink/20 text-accent-pink text-xs font-semibold px-3 py-1 rounded-full">${tag}</span>`).join('');

    return `
        <div class="project-card flex flex-col ${layoutClass} items-center bg-card-bg rounded-3xl overflow-hidden shadow-2xl" data-gsap="project-card">
            <div class="md:w-1/2 w-full h-80 md:h-auto overflow-hidden">
                <img src="${project.image}" alt="${project.name} Screenshot" class="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out cursor-pointer" />
            </div>
            <div class="md:w-1/2 w-full p-8 md:p-12 space-y-6">
                <h3 class="text-4xl font-bold text-accent-pink">${project.name}</h3>
                <p class="text-xl text-text-light/80">${project.description}</p>
                <div class="flex flex-wrap gap-2">${tagHtml}</div>
                <div class="flex space-x-6 pt-4">
                    <a href="${project.liveLink}" target="_blank" class="px-6 py-3 bg-accent-pink text-primary-dark font-semibold rounded-full hover:bg-white transition duration-300 flex items-center shadow-lg">
                        <i class="fas fa-external-link-alt mr-2"></i> View Live
                    </a>
                    <a href="${project.githubLink}" target="_blank" class="px-6 py-3 border border-text-light/30 text-text-light font-semibold rounded-full hover:bg-primary-dark transition duration-300 flex items-center">
                        <i class="fab fa-github mr-2"></i> Code
                    </a>
                </div>
            </div>
        </div>
    `;
};

// 1.3 Projects Section
const projectsContainer = document.getElementById('projects-container');
projectsContainer.innerHTML = projectsData.map(generateProjectCard).join('');


// --- 2. PREMIUM GSAP ANIMATIONS ---

gsap.registerPlugin(ScrollTrigger);

// 2.1 Initial Page Load Animation (The "Call" or Hero Entry Animation)
const header = document.getElementById('header');
const heroLeft = document.querySelector('.hero-left');

gsap.from(header, { duration: 0.8, y: -100, opacity: 0, ease: "power2.out" });
gsap.from(heroLeft.children, {
    duration: 1.2,
    y: 50,
    opacity: 0,
    stagger: 0.15, // Staggered entry for each text element
    ease: "power3.out",
    delay: 0.5
});
gsap.from('.hero-right img', {
    duration: 1.5,
    scale: 0.9,
    opacity: 0,
    ease: "elastic.out(1, 0.5)",
    delay: 1.0
});


// 2.2 Scroll-based Animations (Using ScrollTrigger)

// General Scroll Fade Animation
document.querySelectorAll('[data-gsap="scroll-fade"]').forEach(el => {
    gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1.0,
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Animation starts when top of element hits 85% of viewport
            toggleActions: "play none none reverse",
        }
    });
});

// Scroll Fade Left
document.querySelectorAll('[data-gsap="scroll-fade-left"]').forEach(el => {
    gsap.from(el, {
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
        }
    });
});

// Scroll Fade Right
document.querySelectorAll('[data-gsap="scroll-fade-right"]').forEach(el => {
    gsap.from(el, {
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
        }
    });
});

// Project Card Animation
document.querySelectorAll('.project-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 100,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });
});

// Skill Bar Animation
document.querySelectorAll('[data-gsap="skill-bar"]').forEach(bar => {
    const width = bar.style.width;
    gsap.from(bar, {
        width: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse",
        }
    });
});


// 2.3 Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    gsap.fromTo(mobileMenu, { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', duration: 0.5, ease: 'power3.out' });
});

closeMenuBtn.addEventListener('click', () => {
    gsap.to(mobileMenu, { opacity: 0, x: '100%', duration: 0.5, ease: 'power3.in', onComplete: () => mobileMenu.classList.add('hidden') });
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        gsap.to(mobileMenu, { opacity: 0, x: '100%', duration: 0.5, ease: 'power3.in', onComplete: () => mobileMenu.classList.add('hidden') });
    });
});
