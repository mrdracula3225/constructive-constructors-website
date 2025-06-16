// Function to load and display projects
async function loadProjects() {
    try {
        // Update the path to be relative to the root
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        if (!projectsContainer) {
            console.error('Projects container not found');
            return;
        }

        if (!data.projects || !Array.isArray(data.projects)) {
            console.error('Invalid projects data format');
            return;
        }

        projectsContainer.innerHTML = data.projects.map(project => `
            <div class="project-card bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
                <div class="relative">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="w-full h-64 object-cover hover-zoom"
                         loading="lazy"
                         onerror="this.src='images/placeholder.webp'">
                    <div class="absolute top-4 right-4 bg-construction-yellow text-construction-blue px-3 py-1 rounded-full text-sm font-semibold">
                        ${project.category}
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">${project.title}</h3>
                    <p class="text-gray-600 dark:text-dark-text-secondary mb-4">${project.description}</p>
                    <div class="space-y-2">
                        ${project.features.map(feature => `
                            <div class="flex items-center text-gray-700 dark:text-dark-text-secondary">
                                <svg class="w-5 h-5 text-construction-yellow mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                ${feature}
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary">
                        Completed: ${project.completionDate}
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize AOS animations for the newly added content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-red-500 dark:text-red-400">Failed to load projects. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Load projects when the DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects); 