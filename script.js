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
            typingSpeed = 1500; // Pause at complete title
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
            // Finished typing the full title
            isPaused = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting the title
            isDeleting = false;
            // Move to next title
            titleIndex = (titleIndex + 1) % titles.length;
        }
        
        // Schedule the next update
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}