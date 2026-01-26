// =========================
// Бургер меню и overlay
// =========================
const burger = document.getElementById("burgerBtn");
const menu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

// =========================
// Плавная прокрутка по ссылкам и закрытие меню
// =========================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({behavior: "smooth"});
        }
        if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            menu.classList.remove("active");
            overlay.classList.remove("active");
        }
    });
});

// =========================
// Форма заявки
// =========================
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbz0YibnEhifXUu0_FeTF_6va0ve2RtwO2QAMsE5rrPQ7JkbAH3CYg675Ht8wEikZj--Eg/exec", {
        method: "POST",
        body: formData
    })
    .then(() => {
        status.innerText = "Заявка успешно отправлена!";
        this.reset();
    })
    .catch(() => {
        status.innerText = "Ошибка отправки, попробуйте позже.";
    });
});

// =========================
// Карусель дипломов
// =========================
const track = document.querySelector(".carousel-track");
if(track){ // проверяем, есть ли карусель на странице
    const items = Array.from(track.children);
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let index = 0;
    const itemWidth = items[0].getBoundingClientRect().width + 14; // ширина + margin

    // Установка позиции элементов
    items.forEach((item, i) => {
        item.style.left = `${i * itemWidth}px`;
    });

    // Функция движения
    function moveTo(idx) {
        track.style.transform = `translateX(-${idx * itemWidth}px)`;
        index = idx;
    }

    // Кнопки
    prevBtn.addEventListener("click", () => {
        moveTo(index === 0 ? items.length - 1 : index - 1);
        resetAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
        moveTo((index + 1) % items.length);
        resetAutoSlide();
    });

    // Автопрокрутка каждые 6 секунд
    let autoSlide = setInterval(() => {
        moveTo((index + 1) % items.length);
    }, 6000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            moveTo((index + 1) % items.length);
        }, 6000);
    }
}
