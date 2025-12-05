// === Actualiza el año en el footer automáticamente ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Formulario mock ===
const form = document.getElementById('intake-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Thank you! Your request has been received (mock).";
  status.style.color = "green";
  form.reset();
});

// === Reveal animations using IntersectionObserver ===
function initReveal(){
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature-list li, .testimonials blockquote, .hero-copy, .hero-media, .faq .qa h3').forEach(function(el){
    el.classList.add('reveal');
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', function(){ initReveal(); });
