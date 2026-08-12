
/* NAV */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.88);
}, {passive:true});

/* MOBILE MENU TOGGLE */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
function closeMobileMenu(){
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
function openMobileMenu(){
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
}
if(navToggle){
  navToggle.addEventListener('click', () => {
    if(navLinks.classList.contains('open')) closeMobileMenu(); else openMobileMenu();
  });
  navOverlay.addEventListener('click', closeMobileMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  window.addEventListener('keydown', e => { if(e.key === 'Escape') closeMobileMenu(); });
}

/* MOBILE STICKY CTA BAR */
const mobileCtaBar = document.getElementById('mobileCtaBar');
const contactSection = document.getElementById('contact');
if(mobileCtaBar){
  window.addEventListener('scroll', () => {
    const pastHero = window.scrollY > window.innerHeight * 0.7;
    const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;
    const contactInView = contactRect && contactRect.top < window.innerHeight * 0.85;
    mobileCtaBar.classList.toggle('visible', pastHero && !contactInView);
  }, {passive:true});
}

/* PARALLAX */
const heroImg = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
  if(heroImg) heroImg.style.transform = `translateY(${window.scrollY*0.14}px) scale(1.05)`;
}, {passive:true});

/* REVEAL */
window.addEventListener('load', () => {
  if(typeof gsap !== 'undefined'){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el,i) => {
      gsap.fromTo(el,
        {opacity:0, y:40, filter:'blur(8px)'},
        {opacity:1, y:0, filter:'blur(0px)', duration:0.7, ease:'power3.out',
          delay: i*0.03,
          scrollTrigger:{trigger:el, start:'top 90%'}
        }
      );
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});

/* PARTICLES */
(function(){
  const cv = document.getElementById('particles');
  if(!cv) return;
  const cx = cv.getContext('2d');
  function resize(){ cv.width=window.innerWidth; cv.height=window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, {passive:true});
  const pts = Array.from({length:55}, () => ({
    x:Math.random()*cv.width, y:Math.random()*cv.height,
    r:Math.random()*1.8+0.3,
    dx:(Math.random()-0.5)*0.18, dy:(Math.random()-0.5)*0.18
  }));
  function draw(){
    cx.clearRect(0,0,cv.width,cv.height);
    pts.forEach(p => {
      p.x=(p.x+p.dx+cv.width)%cv.width;
      p.y=(p.y+p.dy+cv.height)%cv.height;
      cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2);
      cx.fillStyle='rgba(168,219,188,0.11)'; cx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
