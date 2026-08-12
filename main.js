document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });

    // Before/After Slider
    const sliderContainer = document.querySelector('.image-comparison');
    const beforeWrapper = document.querySelector('.image-before-wrapper');
    const beforeImage = document.querySelector('.image-before');
    const sliderHandle = document.querySelector('.slider-handle');

    if (sliderContainer) {
        let isSliding = false;

        const updateSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Constrain between 0 and 100%
            x = Math.max(0, Math.min(x, rect.width));
            
            const percentage = (x / rect.width) * 100;
            
            beforeWrapper.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
            
            // Adjust the width of the before image so it stays fixed relative to the container
            beforeImage.style.width = `${rect.width}px`;
        };
        
        // Initial setup for image width
        const setupSliderImage = () => {
            const rect = sliderContainer.getBoundingClientRect();
            beforeImage.style.width = `${rect.width}px`;
        };
        
        // Call setup initially and on window resize
        setupSliderImage();
        window.addEventListener('resize', setupSliderImage);

        // Mouse Events
        sliderContainer.addEventListener('mousedown', (e) => {
            isSliding = true;
            updateSlider(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            updateSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isSliding = false;
        });

        // Touch Events for Mobile
        sliderContainer.addEventListener('touchstart', (e) => {
            isSliding = true;
            updateSlider(e.touches[0].clientX);
        });

        window.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            // Prevent scrolling while dragging the slider
            e.preventDefault(); 
            updateSlider(e.touches[0].clientX);
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isSliding = false;
        });
    }

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            fetch("https://formsubmit.co/ajax/contact@pelicanpressurewashing.com.au", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                contactForm.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 2rem; grid-column: 1/-1;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" style="margin-bottom: 1rem;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">Request Sent!</h3>
                        <p style="color: var(--clr-text-light);">Thanks for reaching out. We'll be in touch with your quote shortly.</p>
                        <p style="color: var(--clr-accent); font-size: 0.875rem; margin-top: 1rem;"><strong>Note for Owner:</strong> Please check your email inbox to confirm the FormSubmit activation.</p>
                    </div>
                `;
            })
            .catch(error => {
                console.error(error);
                submitBtn.textContent = 'Error! Try Again';
                submitBtn.disabled = false;
            });
        });
    }
});
