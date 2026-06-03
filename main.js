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

// ======================================
// MOBILE MENU
// ======================================

const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute('href')
    );

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ======================================
// ACTIVE NAV LINK
// ======================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-section]');

window.addEventListener('scroll', () => {

  let currentSection = '';

  sections.forEach(section => {

    const top = section.offsetTop - 150;

    if (window.scrollY >= top) {
      currentSection = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.remove('active');

    if (link.dataset.section === currentSection) {
      link.classList.add('active');
    }

  });

});

// ======================================
// HERO SEARCH
// ======================================

const searchForm = document.getElementById('heroSearchForm');
const searchInput = document.getElementById('heroSearchInput');

searchForm?.addEventListener('submit', () => {

  const value = searchInput.value
    .trim()
    .toLowerCase();

  if (!value) return;

  let found = false;

  cards.forEach(card => {

    const text =
      card.textContent.toLowerCase();

    if (text.includes(value)) {

      found = true;

      card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      card.classList.add('search-highlight');

      setTimeout(() => {
        card.classList.remove('search-highlight');
      }, 2000);

    }

  });

  if (!found) {
    alert('No matching packs found.');
  }

});

// ======================================
// TESTIMONIAL CAROUSEL
// ======================================

const testimonialSlides =
  document.querySelectorAll('.testimonial-slide');

const testimonialDots =
  document.querySelectorAll('.t-dot');

let testimonialIndex = 0;

function showTestimonial(idx) {

  testimonialSlides.forEach(slide =>
    slide.classList.remove('active')
  );

  testimonialDots.forEach(dot =>
    dot.classList.remove('active')
  );

  testimonialSlides[idx].classList.add('active');
  testimonialDots[idx].classList.add('active');

  testimonialIndex = idx;
}

testimonialDots.forEach((dot, index) => {

  dot.addEventListener('click', () => {
    showTestimonial(index);
  });

});

setInterval(() => {

  let next = testimonialIndex + 1;

  if (next >= testimonialSlides.length) {
    next = 0;
  }

  showTestimonial(next);

}, 5000);

// ======================================
// CONTACT FORM
// ======================================

$('#contactForm').on('submit', function(e) {

  e.preventDefault();

  let valid = true;

  $('.h-error').text('');

  const name =
    $('#cName').val().trim();

  const email =
    $('#cEmail').val().trim();

  const msg =
    $('#cMsg').val().trim();

  if (name.length < 2) {
    $('#cNameErr').text('Please enter your name');
    valid = false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    $('#cEmailErr').text('Invalid email');
    valid = false;
  }

  if (msg.length < 20) {
    $('#cMsgErr').text('Minimum 20 characters');
    valid = false;
  }

  if (!valid) return;

  $('#contactSuccess').fadeIn();

  this.reset();

});

// ======================================
// PRICING MODAL
// ======================================

const pricingModal =
  document.getElementById('pricingModal');

document.querySelectorAll('.pricing-btn')
.forEach(btn => {

  btn.addEventListener('click', () => {

    pricingModal.classList.add('show');

    const plan =
      btn.dataset.planid;

    const checkbox =
      document.querySelector(
        `input[value="${plan}"]`
      );

    if (checkbox) {
      checkbox.checked = true;
    }

  });

});

function closePricingModal() {

  pricingModal.classList.remove('show');

  $('#pricingForm')[0].reset();

  $('#pricingForm').show();

  $('#modalSuccess').hide();

  $('.m-error').text('');
}

document
.getElementById('modalClose')
?.addEventListener('click', closePricingModal);

document
.getElementById('modalCloseBtn')
?.addEventListener('click', closePricingModal);

document
.getElementById('modalSuccessClose')
?.addEventListener('click', closePricingModal);

window.addEventListener('click', e => {

  if (e.target === pricingModal) {
    closePricingModal();
  }

});

// ======================================
// PRICING FORM
// ======================================

$('#pricingForm').on('submit', function(e) {

  e.preventDefault();

  let valid = true;

  $('.m-error').text('');

  const name =
    $('#mName').val().trim();

  const phone =
    $('#mPhone').val().trim();

  const email =
    $('#mEmail').val().trim();

  const services =
    $('input[name="mService"]:checked');

  if (name.length < 2) {
    $('#mNameErr').text('Required');
    valid = false;
  }

  if (phone.length < 8) {
    $('#mPhoneErr').text('Invalid phone');
    valid = false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    $('#mEmailErr').text('Invalid email');
    valid = false;
  }

  if (services.length === 0) {
    $('#mServiceErr').text(
      'Choose at least one service'
    );
    valid = false;
  }

  if (!valid) return;

  $('#pricingForm').hide();
  $('#modalSuccess').fadeIn();

});
