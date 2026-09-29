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

    // Form Submission is handled natively by HTML action

    // Auto-center the 3rd video (index 2) in the videos grid on load
    const videosGrid = document.querySelector('.videos-grid');
    if (videosGrid) {
        const videos = videosGrid.querySelectorAll('.raw-video');
        
        // Force iOS to autoplay videos if it blocked them
        videos.forEach(vid => {
            vid.play().catch(e => console.log('Autoplay prevented:', e));
        });

        if (videos.length >= 3) {
            // Wait for layout to settle then scroll
            setTimeout(() => {
                const thirdVideo = videos[2];
                const scrollPos = thirdVideo.offsetLeft - (videosGrid.clientWidth / 2) + (thirdVideo.clientWidth / 2);
                // Set scrollLeft directly to avoid Safari fighting scroll-snap during a smooth scroll
                videosGrid.scrollLeft = scrollPos;
            }, 300);
        }
    }

});
