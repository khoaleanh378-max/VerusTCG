//slideshow
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('slideCounter');
let current = 0, timer;

function goTo(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  counter.textContent = String(current + 1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

document.getElementById('nextBtn').addEventListener('click', () => { clearInterval(timer); next(); timer = setInterval(next, 5000); });
document.getElementById('prevBtn').addEventListener('click', () => { clearInterval(timer); prev(); timer = setInterval(next, 5000); });
dots.forEach(d => d.addEventListener('click', () => { clearInterval(timer); goTo(+d.dataset.idx); timer = setInterval(next, 5000); }));

timer = setInterval(next, 5000);

//filter tab
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.pack-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('on'));
    tab.classList.add('on');
    const f = tab.dataset.filter;
    cards.forEach(c => {
      const show = f === 'all' || c.dataset.cat === f;
      c.style.display = show ? 'flex' : 'none';
    });
  });
});

//scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('shown'), i * 60);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
