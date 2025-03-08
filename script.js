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

    // Find the longest title to set consistent width
    const titles = [
        'James Xu',
        'Data Analyst',
        'Teacher',
        'Lifelong student'
    ];
    
    // Set initial conditions
    let currentTitleIndex = 0;
    let isDeleting = false;
    let text = 'James Xu';
    
    // Calculate minimum width based on longest title and set it
    const longestTitle = titles.reduce((a, b) => a.length > b.length ? a : b);
    typingElement.style.minWidth = longestTitle.length + 'ch';
    
    function tick() {
        const currentTitle = titles[currentTitleIndex];
        
        // Handle typing or deleting
        if (isDeleting) {
            // Remove a character
            text = text.slice(0, -1);
        } else {
            // Add a character until we reach the full title
            const nextChar = currentTitle.charAt(text.length);
            if (text.length < currentTitle.length) {
                text += nextChar;
            }
        }
        
        // Always keep content in the element to prevent layout shift
        if (text.length === 0) {
            typingElement.innerHTML = '&nbsp;';
        } else {
            typingElement.textContent = text;
        }
        
        // Determine next state and timing
        let typingSpeed = 150;
        
        // If we've deleted everything
        if (isDeleting && text.length === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause briefly before typing next word
        } 
        // If we've typed the full word
        else if (!isDeleting && text.length === currentTitle.length) {
            // Pause at the full word
            typingSpeed = 2000;
            // Schedule deletion after pause
            setTimeout(() => {
                isDeleting = true;
                tick();
            }, typingSpeed);
            return;
        }
        // Faster deletion speed
        else if (isDeleting) {
            typingSpeed = 80;
        }
        
        setTimeout(tick, typingSpeed);
    }
    
    // Start with a pause before beginning the animation
    setTimeout(() => {
        isDeleting = true;
        tick();
    }, 3000);
}