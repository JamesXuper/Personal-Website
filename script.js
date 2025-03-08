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

/**
 * Text typing animation with simplified approach
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
    
    let currentTitleIndex = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;
    
    function tick() {
        const currentTitle = titles[currentTitleIndex];
        const fullLength = currentTitle.length;
        
        // Check if we're done deleting current word
        if (isDeleting && text.length === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            charIndex = 0;
        }
        
        // Handle typing or deleting
        if (isDeleting) {
            // Remove a character
            text = currentTitle.substring(0, text.length - 1);
            typingElement.textContent = text;
            setTimeout(tick, 50); // Faster deletion speed
        } else {
            // Add a character
            text = currentTitle.substring(0, charIndex + 1);
            typingElement.textContent = text;
            charIndex++;
            
            // Check if we've completed typing the word
            if (text.length === fullLength) {
                // Pause at the completed word before starting to delete
                setTimeout(() => {
                    isDeleting = true;
                    tick();
                }, 3000); // 3 second pause when word is complete
            } else {
                // Continue typing
                setTimeout(tick, 150);
            }
        }
    }
    
    // Start the animation
    tick();
}