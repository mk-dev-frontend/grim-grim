// burger menu
const mobileNavButton = document.querySelector('.nav__btn');
const mobileNavIcon = document.querySelector('.nav__btn-icon');
const mobileNav = document.querySelector('.mobile__inner');
const mobileNavLinks = document.querySelectorAll('.mobile__nav-link');


mobileNavButton.addEventListener('click', function () {
    mobileNavIcon.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
})

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileNavIcon.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// contact form 
const form = document.querySelector('.contact__form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !message) {
        alert('Заповніть усі поля');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Введіть коректний email');
        return;
    }


    const params = new URLSearchParams({ name, email, message });


    fetch(form.action + '?' + params.toString(), {
        method: 'GET'
    })
        .then(() => {
            alert('Форма успішно відправлена!');
            form.reset();
        })
        .catch(() => {
            alert('Сталася помилка при відправці форми');
        });
});

document.addEventListener('focusin', (e) => {
    console.log(e.target);
});

// splide
document.addEventListener('DOMContentLoaded', function () {
    const splide = new Splide('.members-splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '20px',
        arrows: false,
        pagination: false,
        breakpoints: {
            1074: { perPage: 3, gap: '30px' },
            960: { perPage: 2, gap: '20px' },
            660: { perPage: 1, gap: '10px' },
        }
    }).mount();


    const prevBtn = document.querySelector('.members__arrow-prev');
    const nextBtn = document.querySelector('.members__arrow-next')

    prevBtn.addEventListener('click', () => splide.go('<'));
    nextBtn.addEventListener('click', () => splide.go('>'));
});

// glightbox
const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
});

// ticket popup
const ticketBtns = document.querySelectorAll('.events__btn');
const popup = document.querySelector('.ticket-popup');
const popupClose = document.querySelector('.ticket-popup__close');
const popupEventName = document.querySelector('.popup-event-name');
const quantityInput = document.querySelector('#ticket-quantity');
const priceEl = document.querySelector('#ticket-price');
const buyBtn = document.querySelector('#buy-ticket');

ticketBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const eventRow = btn.closest('tr');
        const eventName = eventRow.querySelector('td').textContent;
        const price = parseInt(eventRow.children[1].textContent);

        popupEventName.textContent = eventName;
        quantityInput.value = 1;
        priceEl.textContent = price;
        popup.dataset.price = price;
        popup.classList.add('active');
    });
});

popupClose.addEventListener('click', () => {
    popup.classList.remove('active');
});

quantityInput.addEventListener('input', () => {
    let qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1) qty = 0;
    const price = parseInt(popup.dataset.price) || 0;
    priceEl.textContent = price * qty;
});

buyBtn.addEventListener('click', () => {
    alert(`Куплено ${quantityInput.value || 0} квитків на ${popupEventName.textContent}`);
    popup.classList.remove('active');
});


// map

const mapPreview = document.querySelector('.map-preview');

mapPreview.addEventListener('click', () => {
    mapPreview.classList.add('map-open');

    mapPreview.innerHTML = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1069.2517715294675!2d30.532131689028986!3d50.40153354347924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf00386ab139%3A0xed66fc77f7658154!2z0JrRltC80L3QsNGC0LAgODIzICjQkNC00LzRltC90ZbRgdGC0YDQsNGG0ZbRjyk!5e0!3m2!1sde!2sua!4v1758693463204!5m2!1sde!2sua"
            width="600"
            height="450"
            style="border:0;"
            loading="lazy">
        </iframe>
    `;
});