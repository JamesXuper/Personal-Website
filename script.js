document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    setupThemeSwitcher();
    
    // Modern typing animation
    setupModernTypingAnimation();
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
 * Modern text typing animation for the main heading
 */
function setupModernTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    // Phrases to cycle through
    const phrases = [
        'Data Analyst',
        'Engineer',
        'Problem Solver',
        'Teacher',
        'Lifelong Student'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    // Variable typing speeds for more natural effect
    const typingDelay = 150;
    const erasingDelay = 80;
    const newPhraseDelay = 2000; // Delay before starting to erase
    const initialLoadDelay = 1000; // Initial delay before starting animation
    
    // Function to select random number within a range
    // Makes typing look more natural with variable speeds
    function getRandomSpeed(base, variance) {
        return Math.floor(base + (Math.random() * variance - variance/2));
    }
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isWaiting) {
            // Wait before starting to delete
            isWaiting = false;
            setTimeout(type, newPhraseDelay);
            return;
        }
        
        // Calculate the partial text to display
        let partialText;
        
        if (isDeleting) {
            // When deleting, remove characters
            partialText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // When typing, add characters
            partialText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Update the text content
        typingElement.textContent = partialText;
        
        // Calculate delay for next typing action
        let typeSpeed;
        
        if (isDeleting) {
            // Slightly randomize erasing speed
            typeSpeed = getRandomSpeed(erasingDelay, 40);
        } else {
            // Randomize typing speed more significantly
            typeSpeed = getRandomSpeed(typingDelay, 80);
        }
        
        // Determine next step in animation
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing the current phrase
            isWaiting = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting the current phrase
            isDeleting = false;
            // Move to next phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        // Schedule next frame
        setTimeout(type, typeSpeed);
    }
    
    // Start the animation with a delay
    setTimeout(type, initialLoadDelay);
}