// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== MENU TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards with animation
        menuCards.forEach(card => {
            if (card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== TESTIMONIALS CAROUSEL =====
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = cards.length;

// Create dots
cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-rotate testimonials every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Pause on hover
const carousel = document.getElementById('testimonialsCarousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// ===== RESERVATION FORM =====
const reservationForm = document.getElementById('reservationForm');
const dateInput = document.getElementById('guestDate');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const date = document.getElementById('guestDate').value;
    const time = document.getElementById('guestTime').value;
    const guests = document.getElementById('guestCount').value;

    if (!name || !phone || !date || !time || !guests) {
        showToast('Please fill in all required fields! 📝');
        return;
    }

    // Show success toast
    showToast(`Thank you ${name}! Your table for ${guests} on ${formatDate(date)} at ${time} is reserved! 🎉`);
    reservationForm.reset();
});

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    // Remove existing toast if any
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
