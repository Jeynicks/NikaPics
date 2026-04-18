let projects = [];
let currentIndex = 0;

// DOM Elements
const grid = document.getElementById('portfolioGrid');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalClose = document.getElementById('modalClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Render portfolio grid
function renderPortfolio() {
  projects.forEach((project, idx) => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.innerHTML = `
      <img src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="portfolio-overlay">
        <h3><i class="fas fa-star"></i> ${project.name}</h3>
        <p>${project.description.substring(0, 100)}...</p>
      </div>
    `;
    item.addEventListener('click', () => openModal(idx));
    grid.appendChild(item);
  });
}

// Modal functions
function openModal(idx) {
  currentIndex = idx;
  updateModal();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateModal() {
  const project = projects[currentIndex];
  modalImg.src = project.image;
  modalImg.alt = project.name;
  modalTitle.innerHTML = `<i class="fas fa-star"></i> ${project.name}`;
  modalDesc.textContent = project.description;
  modalTags.innerHTML = project.tags.map(tag =>
    `<span class="tag">${tag}</span>`
  ).join('');
}

// Event listeners
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  updateModal();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % projects.length;
  updateModal();
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateModal();
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % projects.length;
    updateModal();
  }
});

// Add scroll animation for nav
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
  }

  lastScroll = currentScroll;
});

// Initialize: fetch projects from JSON, then render
document.addEventListener('DOMContentLoaded', () => {
  fetch('projects.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load projects.json');
      return response.json();
    })
    .then(data => {
      projects = data;
      renderPortfolio();
    })
    .catch(err => {
      console.error('Error loading projects:', err);
      grid.innerHTML = '<p style="color:red;">Failed to load projects. Please try again.</p>';
    });
});