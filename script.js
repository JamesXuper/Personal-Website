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
 * Text typing animation for the main heading
 */
function setupTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const titles = [
        'James Xu',
        'Data Analyst',
        'Teacher',
        'Python Enthusiast'
    ];
    
    let currentTitleIndex = 0;
    let isDeleting = false;
    let text = 'James Xu';
    let charIndex = text.length;
    
    function tick() {
        const currentTitle = titles[currentTitleIndex];
        const fullLength = currentTitle.length;
        
        // Check if we're done deleting current word
        if (isDeleting && text.length === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            charIndex = 0;
            
            // Add a non-breaking space to prevent layout shift when empty
            typingElement.innerHTML = '&nbsp;';
            setTimeout(() => {
                typingElement.textContent = '';
                tick();
            }, 50);
            return;
        }
        
        // Handle typing or deleting
        if (isDeleting) {
            // Remove a character
            text = currentTitle.substring(0, text.length - 1);
            typingElement.textContent = text;
            setTimeout(tick, 80); // Deletion speed
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
    
    // Start with a pause before beginning the animation
    setTimeout(() => {
        isDeleting = true;
        tick();
    }, 3000);
}