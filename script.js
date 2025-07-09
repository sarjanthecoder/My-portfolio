/* ==================  script.js  ================== */

/* 1. BURGER TOGGLE */
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* 2. SCROLL‑SPY (purple active link) */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
        );
      }
    });
  },
  { rootMargin: '0px 0px -60% 0px' } /* switch when 40% into viewport */
);
sections.forEach((s) => spy.observe(s));

/* 3. FOOTER YEAR */
document.getElementById('year').textContent = new Date().getFullYear();

/* 4. EMAILJS INIT + SEND */
emailjs.init('wrPvV8YlHoJU7FbV3');            // <-- your public key
const contactForm = document.getElementById('contact-form');
const statusEl    = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending…';
  statusEl.style.color = '#aaa';

  try {
    await emailjs.sendForm('service_wk9v12g', 'template_x1fnbto', contactForm);
    statusEl.textContent = 'Message sent ✔';
    statusEl.style.color = 'limegreen';
    contactForm.reset();
  } catch (err) {
    console.error('EmailJS', err);
    statusEl.textContent = 'Error – see console';
    statusEl.style.color = 'red';
  }
});
/**typing */ 
/* === Typing animation for About section === */
const roles = [
  'Full‑Stack Developer',
  'API Integrator',
  'Cloud Enthusiast',
  'Database Designer',
  'DevOps Advocate'
];

let roleIdx = 0;
let charIdx = 0;
const typedSpan = document.getElementById('typed-role');
const cursor    = document.querySelector('.typing-line .cursor');
const TYPING_SPEED = 80;      // ms per character
const PAUSE_TIME   = 1500;    // pause before backspacing

function type() {
  if (charIdx < roles[roleIdx].length) {
    typedSpan.textContent += roles[roleIdx].charAt(charIdx);
    charIdx++;
    setTimeout(type, TYPING_SPEED);
  } else {
    setTimeout(erase, PAUSE_TIME);
  }
}
function erase() {
  if (charIdx > 0) {
    typedSpan.textContent = roles[roleIdx].substring(0, charIdx - 1);
    charIdx--;
    setTimeout(erase, TYPING_SPEED / 1.5);
  } else {
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(type, TYPING_SPEED);
  }
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 600));

/*cert img pop*/
/* ===== CERTIFICATE IMAGE MODAL ===== */
document.addEventListener('DOMContentLoaded', () => {
  const imgs   = document.querySelectorAll('.cert-card img');
  const modal  = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const btnNext = document.getElementById('cert-next');
  const btnPrev = document.getElementById('cert-prev');
  const btnClose= document.getElementById('cert-close');

  let current = 0;

  /* open modal */
  imgs.forEach((img, idx) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      current = idx;
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  /* navigation helpers */
  const show = (i) => {
    current = (i + imgs.length) % imgs.length;   // wrap around
    modalImg.src = imgs[current].src;
  };

  btnNext.addEventListener('click', () => show(current + 1));
  btnPrev.addEventListener('click', () => show(current - 1));
  btnClose.addEventListener('click', () => { modal.style.display = 'none'; });

  /* close on ESC or background click */
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft')  show(current - 1);
  });
});
