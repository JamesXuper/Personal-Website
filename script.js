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
        'Lifelong student'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeNextChar() {
        const currentTitle = titles[titleIndex];
        
        // Determine typing speed based on current state
        let typingSpeed;
        
        if (isPaused) {
            // Pause at complete title for 3 seconds
            typingSpeed = 3000;
        } else if (isDeleting) {
            // Delete faster
            typingSpeed = 50;
        } else {
            // Type at moderate speed
            typingSpeed = 150;
        }
        
        // Update the text based on current state
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex);
            charIndex--;
        } else if (!isPaused) {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Check state transitions
        if (!isDeleting && !isPaused && charIndex === currentTitle.length) {
            // Finished typing the full title - pause now
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeNextChar();
            }, typingSpeed);
            return;
        } else if (isDeleting && charIndex < 0) {
            // Finished deleting, move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            charIndex = 0;
        }
        
        // Schedule the next update if not paused
        if (!isPaused) {
            setTimeout(typeNextChar, typingSpeed);
        }
    }
    
    // Start the typing animation
    typeNextChar();
}