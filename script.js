// app.js renders the DOM synchronously before this script runs,
// so all elements are already present when this file executes.

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-up animation to section elements
document.querySelectorAll(
  '.service-card, .testimonial-card, .pricing-card, .about-box, .section-header, .hero-content, .about-content, .contact-info, .contact-form, .cta-box, .blog-card, .faq-item, .counter-card'
).forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  // Basic validation
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }, 1200);
});

// Notification system
function showNotification(message, type) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '16px 28px',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.95rem',
    zIndex: '9999',
    maxWidth: '400px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    transform: 'translateY(20px)',
    opacity: '0',
    transition: 'all 0.4s ease',
    background: type === 'success' ? '#06D6A0' : '#EF4444'
  });

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  });

  setTimeout(() => {
    notification.style.transform = 'translateY(20px)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 400);
  }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const icon   = btn.querySelector('.faq-icon');
    const isOpen = btn.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('open');
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.faq-icon').textContent = '+';
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      icon.textContent = '−';
      answer.classList.add('open');
    }
  });
});

// ===== Animated Counters =====
function animateCounter(el, end, suffix, duration) {
  const start = 0;
  const startTime = performance.now();
  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * end);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end      = parseInt(el.dataset.end, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration, 10) || 1500;
    animateCounter(el, end, suffix, duration);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.counter-number').forEach(el => counterObserver.observe(el));

// ===== Scroll-to-top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
