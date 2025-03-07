
    // Mobile navigation toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Navbar scroll effect
    const navContainer = document.querySelector('.nav-container');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
            
            // smooth scroll for back-to-top button (it has its own handler)
            if (this.id === 'back-to-top') return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        timelineItems.forEach(item => {
            const elementHeight = item.offsetHeight;
            const elementTopPosition = item.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                item.classList.add('visible');
            }
        });
        
        // Back to top button visibility
        const backToTopButton = document.getElementById('back-to-top');
        if (windowTopPosition > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Initial check
    window.addEventListener('load', checkIfInView);

    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Back to top functionality
    document.getElementById('back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gallery image click effect (placeholder for lightbox functionality)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            
        });
    });

// Lightbox Functionality
class Lightbox {
    constructor() {
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxCaption = document.querySelector('.lightbox-caption');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.galleryItems = document.querySelectorAll('.gallery-item');

        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Add click events to gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.open(index));
        });

        // Close button event
        this.closeBtn.addEventListener('click', () => this.close());

        // Close lightbox when clicking outside the image
        this.lightbox.addEventListener('click', (event) => {
            if (event.target === this.lightbox) {  // Ensure click is on overlay, not image
                this.close();
            }
        });

        // Navigation events
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('open')) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    }

    open(index) {
        this.currentIndex = index;
        const item = this.galleryItems[index];
        const img = item.querySelector('img');

        this.lightboxImage.src = img.src;
        this.lightboxCaption.textContent = img.alt;
        this.lightbox.classList.add('open');
    }

    // Function to close lightbox
    close() {
        this.lightbox.classList.remove('open'); // Hide the lightbox properly
    }

    prev() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.galleryItems.length - 1;
        }
        this.open(this.currentIndex);
    }

    next() {
        this.currentIndex++;
        if (this.currentIndex >= this.galleryItems.length) {
            this.currentIndex = 0;
        }
        this.open(this.currentIndex);
    }
}

// Initialize lightbox when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});

function toggleGallery() {
    let galleryGrid = document.querySelector('.gallery-grid');
    let button = document.querySelector('button');

    if (galleryGrid.style.display === 'none' || galleryGrid.style.display === '') {
        galleryGrid.style.display = 'grid';  // Show images
        button.textContent = "Hide Gallery"; // Change button text
    } else {
        galleryGrid.style.display = 'none'; // Hide images
        button.textContent = "Show Gallery"; // Change button text
    }
}

const quotes = [
    {
        text: `"Kisumu is not just a city; it's a feeling, a lifestyle, and a home where the sunset kisses the lake goodnight."`,
        author: "- A Traveler's Journal"
    },
    {
        text: `"From the vibrant fish markets to the breathtaking lakeside views, Kisumu is a city of wonder."`,
        author: "- Local Explorer"
    },
    {
        text: `"In Kisumu, every sunrise whispers new adventures, and every sunset tells a story."`,
        author: "- Kisumu Enthusiast"
    }
];

let quoteIndex = 0;
const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".quote-author");

function typeQuote() {
    let quote = quotes[quoteIndex];
    let quoteText = quote.text;
    let authorText = `\n${quote.author}`; // New line before author
    let i = 0;
    let typingFinished = false;

    quoteElement.innerHTML = "";
    authorElement.innerHTML = "";
    quoteElement.style.opacity = 1;  // Make sure the quote is visible
    authorElement.style.opacity = 0; // Hide author initially

    function type() {
        if (i < quoteText.length) {
            quoteElement.textContent += quoteText[i];
        } else if (i < quoteText.length + authorText.length) {
            if (!typingFinished) {
                quoteElement.innerHTML += "<br>"; // Add new line before author
                typingFinished = true;
                authorElement.style.opacity = 1; // Make author visible
            }
            authorElement.textContent += authorText[i - quoteText.length];
        }
        i++;
        if (i < quoteText.length + authorText.length) {
            setTimeout(type, 50); // Typing speed
        } else {
            setTimeout(() => fadeOutQuote(), 2000); // Pause before fading out
        }
    }

    type();
}

function fadeOutQuote() {
    quoteElement.style.transition = "opacity 1s ease";
    authorElement.style.transition = "opacity 1s ease";
    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length; // Move to next quote
        typeQuote(); // Start next quote
    }, 1000); // Wait for fade-out
}

// Start animation when user scrolls to the section
function checkScroll() {
    const section = document.querySelector("#quote");
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        window.removeEventListener("scroll", checkScroll); // Only start once
        typeQuote();
    }
}

window.addEventListener("scroll", checkScroll);
