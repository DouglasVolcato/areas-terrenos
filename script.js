document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.remove('fa-times');
            mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Ticker Duplication for Infinite Scroll
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const tickerContent = ticker.innerHTML;
        // Duplicate content enough times to fill width + scroll buffer
        // Simple strategy: repeat 4 times
        ticker.innerHTML = tickerContent + tickerContent + tickerContent + tickerContent;
    }

    // 4. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to only animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .feature-card, .pain-card, .contact-card, .stat-box');
    
    animatedElements.forEach(el => {
        // Add base class for animation initialization logic if needed
        // Here we just use the observer to toggle a class or we can assume CSS handles it
        // My CSS for .fade-in handles animation on load, but let's add interaction
        // Actually, CSS .fade-in runs immediately. Let's change strategy:
        // By default CSS runs animation. For scroll trigger, we usually use opacity 0 and add class.
        // Let's modify inline styles or just add a 'scroll-animate' class logic.
        
        // For this implementation, I used .fade-in with animation for Hero.
        // For other sections, let's add 'scroll-hidden' class and remove it/add 'scroll-visible'.
        
        if (!el.classList.contains('hero-title') && !el.classList.contains('hero-subtitle') && !el.classList.contains('hero-buttons')) {
             el.style.opacity = '0';
             el.style.transform = 'translateY(20px)';
             el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
             observer.observe(el);
        }
    });

    // Override observer callback to handle the specific styling applied above
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
         if (!el.classList.contains('hero-title') && !el.classList.contains('hero-subtitle') && !el.classList.contains('hero-buttons') && !el.classList.contains('trust-indicators')) {
            scrollObserver.observe(el);
         }
    });

    // 5. Smooth Scroll for Anchor Links (polishing default behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});