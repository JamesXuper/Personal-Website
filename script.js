document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    setupThemeSwitcher();
    
    // Text typing animation
    setupTypingAnimation();
});

/**
 * Theme switching functionality
 */
function setupThemeSwitcher() {
    const themeToggle = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        // Toggle theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Custom cursor effect removed

/**
 * Text typing animation
 */
function setupTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const titles = [
        'Data Analyst',
        'Teacher',
        'Python Enthusiast',
        'Data Visualizer'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        // Determine typing speed based on current state
        let typingSpeed;
        
        if (isPaused) {
            typingSpeed = 3000; // Pause at complete title for 3 seconds
            isPaused = false;
        } else if (isDeleting) {
            typingSpeed = 50; // Delete faster
        } else {
            typingSpeed = 150; // Type at moderate speed
        }
        
        // Typing or deleting text
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Logic for switching states
        if (!isDeleting && charIndex === currentTitle.length) {
            // Finished typing the full title - pause before deleting
            isPaused = true;
            // Don't set isDeleting yet - wait for the pause to finish
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting the title
            isDeleting = false;
            // Move to next title
            titleIndex = (titleIndex + 1) % titles.length;
        }
        
        // Schedule the next update
        setTimeout(() => {
            // After pause, start deleting
            if (isPaused === false && !isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
            }
            type();
        }, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}