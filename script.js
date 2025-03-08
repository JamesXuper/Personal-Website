document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    setupThemeSwitcher();
    
    // Custom cursor effect
    setupCustomCursor();
    
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
 * Custom cursor effect
 */
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('custom-cursor-follower');
    
    // Add to DOM
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with slight delay
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });
    
    // Add hover effect for links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursorFollower.style.width = '45px';
            cursorFollower.style.height = '45px';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

/**
 * Text typing animation
 */
function setupTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Data analyst',
        'Teacher',
        'Python enthusiast',
        'Data visualizer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        // Set typing speed based on state
        if (isDeleting) {
            typingSpeed = 50; // Faster when deleting
        } else {
            // Slower when typing, random variation for realism
            typingSpeed = 100 + Math.random() * 50;
        }
        
        // If deleting
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // If finished typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            typingSpeed = 1500; // Pause 1.5s at full text
            isDeleting = true;
        } 
        // If finished deleting the phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false