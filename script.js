// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add typing effect to hero text
const heroText = document.querySelector('.hero p');
const text = heroText.textContent;
heroText.textContent = '';

setTimeout(() => {
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
}, 1000);

// Add particle effect to background
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '-10px';
    particle.style.zIndex = '1';

    document.body.appendChild(particle);

    let posY = -10;
    let posX = parseFloat(particle.style.left);
    let speed = Math.random() * 3 + 1;
    let drift = (Math.random() - 0.5) * 0.5;

    const animate = () => {
        posY += speed;
        posX += drift;

        particle.style.top = posY + 'px';
        particle.style.left = posX + 'px';

        if (posY > window.innerHeight) {
            particle.remove();
        } else {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// Create particles periodically
setInterval(createParticle, 300);

// Add interactive hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.cta-button, .project-link').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
progressBar.style.zIndex = '10000';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add dynamic background color change based on scroll
window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.1;

    // Change hero background based on scroll
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${rate}px)`;
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add dynamic skill bar animations
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'slideInUp 0.6s ease-out forwards';
});

// Add more CSS animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .skill-item {
                opacity: 0;
            }
            
            .project-card {
                position: relative;
                overflow: hidden;
            }
            
            .project-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .project-card:hover::before {
                left: 100%;
            }
            
            .contact-item {
                cursor: pointer;
            }
            
            .contact-item:hover {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }
        `;
document.head.appendChild(additionalStyle);

// Add mobile menu toggle (for future enhancement)
const mobileMenuButton = document.createElement('button');
mobileMenuButton.innerHTML = '☰';
mobileMenuButton.style.display = 'none';
mobileMenuButton.style.background = 'none';
mobileMenuButton.style.border = 'none';
mobileMenuButton.style.fontSize = '1.5rem';
mobileMenuButton.style.cursor = 'pointer';
mobileMenuButton.style.color = '#333';

document.querySelector('nav').appendChild(mobileMenuButton);

// Show mobile menu button on small screens
const checkMobile = () => {
    if (window.innerWidth <= 768) {
        mobileMenuButton.style.display = 'block';
    } else {
        mobileMenuButton.style.display = 'none';
    }
};

window.addEventListener('resize', checkMobile);
checkMobile();