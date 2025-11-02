// Portfolio projects data
const projects = [
  {
    "name": "COMFORT (2021)",
    "description": "This photo is very special to me. It's one of my favorite captures of my cat, who passed away in 2024. This was taken before Christmas (around November 2021). I like the lighting in this picture because the warm glow reminds me of his comforting presence and the joy he gave me. I chose this photo because it keeps his memory alive in a simple but meaningful way.",
    "image": "projects/comfort.jpg",
    "tags": [
      "Cat",
      "Comfort",
      "Pet"
    ]
  },
  {
    "name": "CHROMATIC PAUSE",
    "description": "I captured this gas station because the colors and light made an ordinary place feel cinematic. It reminded me how beauty can exist in the most unexpected corners.",
    "image": "projects/chromatic_pause.jpg",
    "tags": [
      "Night",
      "Light",
      "Station"
    ]
  },
  {
    "name": "UNSCRIPTED ELEGANCE",
    "description": "No suit, no stage, just a polo, a tie, and a quiet smile. Confidence doesn't need perfection, only presence.",
    "image": "projects/unscripted_elegance.jpg",
    "tags": [
      "Confidence",
      "Perfection"
    ]
  },
  {
    "name": "THE QUIET MUSE",
    "description": "My cat's gaze held a mysterious calm that I couldn't look away from. Even in stillness, she carried a presence that felt both haunting and beautiful.",
    "image": "projects/the_quite_muse.jpg",
    "tags": [
      "Cat"
    ]
  },
  {
    "name": "CONFIDENCE IN A SUIT",
    "description": "I photographed this moment because his smirk carried a mix of playfulness and quiet strength. The red and yellow glow behind him gave the portrait an unexpected edge.",
    "image": "projects/confidence_in_a_suit.jpg",
    "tags": [
      "Confidence",
      "Suit"
    ]
  },
  {
    "name": "LIGHTED GATHERING",
    "description": "A glowing kubo at Plaza, open to everyone under its light. I captured it because even without walls, it felt like a home where people gather and share the night.",
    "image": "projects/lighted_gathering.jpg",
    "tags": [
      "Kubo",
      "Plaza",
      "Night",
      "Light"
    ]
  },
  {
    "name": "MORNING WALK",
    "description": "I captured this moment because the quiet trail showed the beauty of starting the day in motion. The person walking added life to the stillness of the scene.",
    "image": "projects/morning_walk.jpg",
    "tags": [
      "Scenery",
      "Trails"
    ]
  },
  {
    "name": "PERSPECTIVE",
    "description": "I captured this because I liked how the frame felt unplanned yet intentional. Sometimes random angles tell the most honest stories.",
    "image": "projects/perspective.jpg",
    "tags": [
      "Perspective",
      "Stories"
    ]
  },
  {
    "name": "LINES AND LIGHTS",
    "description": "I captured this scene because the clean architecture and sharp lines stood out against the soft daylight. It felt like a balance between structure and calm.",
    "image": "projects/lines_and_light.jpg",
    "tags": [
      "Lines",
      "Architecture",
      "Structure"
    ]
  },
  {
    "name": "SCENES OF DAILY LIFE",
    "description": "I took this picture because it shows the ordinary view I often see, but rarely pay attention to. It reminds me that even simple moments in familiar places are worth noticing.",
    "image": "projects/scenes_of_daily_life.jpg",
    "tags": [
      "View",
      "Scene"
    ]
  },
  {
    "name": "WHISPER OF THE HILLS",
    "description": "I captured this because the bright green felt calming, like the trees were wrapping me in quiet. It made me pause and appreciate how refreshing nature can be.",
    "image": "projects/whispers_of_the_hills.jpg",
    "tags": [
      "Hill",
      "Nature"
    ]
  },
  {
    "name": "Chromatic Pause",
    "description": "In auto mode, the gas station lights appeared harsh and uneven. With manual settings, I balanced the exposure to highlight the colors more softly — turning an ordinary stop into a cinematic scene.",
    "image": "projects/chromatic_pauseV2.jpg",
    "tags": [
      "auto mode"
    ]
  },
  {
    "name": "Lighted Gathering",
    "description": "The auto shot captured the brightness but missed the mood. Manual control helped me balance the warm tones, showing how light connects people in small, beautiful ways.",
    "image": "projects/lighted_gatheringV2.jpg",
    "tags": [
      "auto mode"
    ]
  }
];

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
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