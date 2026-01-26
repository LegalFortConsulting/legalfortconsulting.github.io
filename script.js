const burger = document.querySelector('.burger');         
const menu = document.querySelector('nav.menu');           
const overlay = document.getElementById('menuOverlay');

burger.addEventListener('click', () => {
    const active = burger.classList.toggle('active');
    menu.classList.toggle('active', active);
    overlay.classList.toggle('active', active);
});

overlay.addEventListener('click', () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const formData = new FormData(this);
    const btn = this.querySelector('button');
    btn.disabled = true;
    status.style.color = 'green';
    status.innerText = '';

    fetch("https://script.google.com/macros/s/AKfycbz0YibnEhifXUu0_FeTF_6va0ve2RtwO2QAMsE5rrPQ7JkbAH3CYg675Ht8wEikZj--Eg/exec", {
        method: "POST",
        body: formData
    })
    .then(() => { status.innerText = "Заявка успешно отправлена!"; this.reset(); })
    .catch(() => { status.style.color = 'red'; status.innerText = "Ошибка отправки, попробуйте позже."; })
    .finally(() => btn.disabled = false);
});
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;
let cardWidth = cards[0].getBoundingClientRect().width + 18;

function updateCarousel() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Кнопки вручную
prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : cards.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    index = (index < cards.length - 1) ? index + 1 : 0;
    updateCarousel();
});

// Автопрокрутка
setInterval(() => {
    index = (index < cards.length - 1) ? index + 1 : 0;
    updateCarousel();
}, 3000); // каждые 3 секунды

// Обновляем ширину карточки при ресайзе
window.addEventListener('resize', () => {
    cardWidth = cards[0].getBoundingClientRect().width + 18;
    updateCarousel();
});
