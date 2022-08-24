
// Смена активной кнопки по клику

let navLinks = document.querySelectorAll('.header__link');

navLinks.forEach((elem) => {
  elem.addEventListener('click', function() {
    navLinks.forEach((item) => {
      item.classList.remove('header__link--active'); 
    });    
    elem.classList.add('header__link--active');
  });
});


// открытие/закрытие бургер меню 

let btnMenu = document.querySelector('.header__btn-menu');
let navBox = document.querySelector('.header__nav');

btnMenu.addEventListener('click', function() {
  btnMenu.classList.toggle('header__btn-menu--active');
  navBox.classList.toggle('header__nav--active');
});

navLinks.forEach((elem) => {
  elem.addEventListener('click', function() {
    btnMenu.classList.remove('header__btn-menu--active');
    navBox.classList.remove('header__nav--active');
  });
});


// Плавный переход по якорям

let anchors = document.querySelectorAll('a[href*="#"]');

for(let anchor of anchors) {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    let blockID = anchor.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      block: "start",
      behavior: "smooth",
    })
  })
}



// Появление кнопки Go-top в зависимости от скролла

const goTop = document.querySelector('.go_top');
window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    goTop.style.display = 'block'
  } else {
      goTop.style.display = 'none'
  }
});


// Модальное окно

let openModalBtn = document.getElementById('modalOpen');
let modal = document.querySelector('.modal');
let closeModalBtn = document.querySelector('.close-btn');

openModalBtn.addEventListener('click', function() {
  modal.style.display = 'flex'
})

closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none'
})

window.addEventListener('click', function(event)  {
  if(event.target === modal) {    
    modal.style.display = 'none'
  }
})



// Самописаный слайдер

let offset = 0;

const sliderLine = document.querySelector('.slider-line');
const sliderNext = document.querySelector('.slider-next');
const sliderPrev = document.querySelector('.slider-prev');

sliderNext.addEventListener('click', function() {
  offset = offset + 256;
  if(offset > 768) {
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px'
});

sliderPrev.addEventListener('click', function() {
  offset = offset - 256;
  if (offset < 0) {
    offset = 768;
  }
  sliderLine.style.left = -offset + 'px'
});



// Иницилизируем Swiper

var init = false;

function swiperCard() {
  if (window.innerWidth <= 768) {
    if (!init) {
      init = true;
      swiper = new Swiper('.image-slider' , {

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },      
        scrollbar: {
          el: '.swiper-scrollbar',
        }, 
        slidesPerView: 5,     
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        } 
      });
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);





