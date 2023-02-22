
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
        slidesPerView: 3,
      });
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);


// Виджет погода

const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
  weatherBlock.innerHTML = `
    <div class="weather__loading">
      <img src="assets/img/loading.gif" alt="loading...">
    </div> `; 
    
    const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Minsk&appid=39f92d725f68d92be0f20fced6841713'
    const response = await fetch(server, {
      method: 'GET',
    });
    const responseResult = await response.json();

    if(response.ok) {
      getWeater(responseResult);
    }else {
      weatherBlock.innerHTML = responseResult.message;
    };
  };

  function getWeater(data){
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
      <div class="weather__header">
        <div class="weather__main">
          <div class="weather__city">${location}</div>
          <div class="weather__status">${weatherStatus}</div>
        </div>
        <div class="weather__icon">
          <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
      </div>
      <div class="weather__temp">${temp}</div>
      <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

      weatherBlock.innerHTML = template;
    };

  if(weatherBlock) {
    loadWeather();
  };



  // Показать ограниченый блок

  let contactsBtn = document.querySelector('.contacts__btn');
  let contactsText = document.querySelector('.contacts__text');

  contactsBtn.addEventListener('click', function() {
    contactsText.classList.toggle('contacts__text--active');
  });



  // табы при помощи js
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  new ItcTabs('.tabs');


  //Для того чтобы на странице инициализировать несколько вкладок, можно использовать следующий код:
  /*

const tabs = document.querySelectorAll('.tabs');
for (let i = 0, length = tabs.length; i < length; i++) {
  new ItcTabs(tabs[i]);
}

  */



/* Video player Plyr */

const player = new Plyr('#player');





/* Traine addeventlistener */


let btn = document.querySelector('.btn');
/*
function showConcole(event) {
  //Тип собития
    //console.log(event.type);
  //Обьект к которому назанчен обработчик
    //console.log(event.target);
  //Обьект к которому назанчен обработчик
    //console.log(event.currentTarget)
  //Положение курсора по оси Y
    //console.log(event.clientX);
  //Положение курсора по оси Y
    //console.log(event.clientY);

  // Все детали события
    //console.log(event);
}

btn.addEventListener('click', showConcole);
*/

//---------Делегирование событий-----------------

const lesson = document.querySelector('.lesson');
const button = document.querySelectorAll('button');

function showConcole() {
  console.log('wow!!');
}
/*
// этот способ не рекомендуют
button.forEach(buttonItem => {
  buttonItem.addEventListener('click', showConcole);
})
*/
lesson.addEventListener('click', function(event) {
  if(event.target.closest('.button')) {
    showConcole();
  }
})

//---------Выпадающее меню---------
const menuBody = document.querySelector('.menu');

document.addEventListener("click", menu);

function menu(event) {
  if (event.target.closest('.menu__button')) {
    menuBody.classList.toggle('_active');
  }
  if (!event.target.closest('.menu')) {
    menuBody.classList.remove('_active');
  }
};
document.addEventListener('keyup', function(event) {
  if (event.code === 'Escape') {
    menuBody.classList.remove('_active');
  }
});

//---------Отмена дейтивиz браузера по умолчанию---------
const link = document.querySelector('.link');

link.addEventListener("click", function(event) {
  console.log('Наши действия');
  //Отмена дейтивиz браузера по умолчанию(переход по ссылке)
  event.preventDefault();
});


//Основны событий мыши

btn.addEventListener("mousedown", function(event) {
  console.log(`Нажата кнопка ${event.which}`);
});

btn.addEventListener("click", function(event) {
  console.log(`Нажата основная кнопка мыши`);
});

btn.addEventListener("contextmenu", function(event) {
  console.log(`Вызвано контекстное меню (не основаная кнопка мыши)`);
});
/*
event.which = 1 - Нажата основаная кнопка мыши (обычно левая)
event.which = 2 - Нажата средняя кнопка мыши (колесо)
event.which = 1 - Нажата не основаная кнопка мыши (обычно правая)
*/

//-----Координаты: clientX/Y, pageX/Y---------
const blockForMouse = document.querySelector('.block-for-mouse');

/*
blockForMouse.addEventListener("mousemove", function(event) {
  blockForMouse.innerHTML =
    `clientX - ${event.clientX} <br> clientY - ${event.clientY}`;
});
*/
/*
//------Событие mouseover/mouseout, relatedTarget событие не всплывает (переход к дочернему элементу с прыжкоми выход/вход)
blockForMouse.addEventListener("mouseover", function(event) {
  blockForMouse.innerHTML = `Курсор над элементом`;
  //элемент на который пришел
  console.log(event.target);
  //элемент на который ушел
  console.log(event.relatedTarget);
});
blockForMouse.addEventListener("mouseout", function(event) {
  blockForMouse.innerHTML = `Курсор уходит с элемента`;
    //элемент на который пришел
    console.log(event.target);
    //элемент на который ушел
    console.log(event.relatedTarget);
});
*/
//------Событие mouseenter / mouseleave - событие не всплывает (переход к дочернему элементу не будет)

// Клавиатура
//event.code u event.key

/*
document.addEventListener("keydown", function(event) {
  console.log(`Нажата клавиша ${event.code} ${event.key}`);
});
document.addEventListener("keyup", function(event) {
  console.log(`Отжата клавиша ${event.code} ${event.key}`);
});
*/

//Счетчик символов

const txtItem = document.querySelector('.textarea__item');
const txtItemLimit = txtItem.getAttribute('maxlength');
const txtCounter = document.querySelector('.textarea__couter span');
txtCounter.innerHTML = txtItemLimit;

txtItem.addEventListener("keyup", txtSetCounter);
txtItem.addEventListener("keydown", function(event) {
  if (event.repeat) txtSetCounter();
});
function txtSetCounter() {
  const txtCounterResult = txtItemLimit - txtItem.value.length;
  txtCounter.innerHTML = txtCounterResult;
}

/*
Создания маски ввода осушествляется в js коде с помощью следующих знаков:

Цифра 9 – соответствует цифре от 0 до 9.
Символ a – представляет собой любой английский символ (A-Z, a-z).
Знак * - представляет собой любой алфавитно-цифровой символ (A-Z, a-z, 0-9).
*/
//Код jQuery, установливающий маску для ввода телефона элементу input
$(function() {
  //задание заполнителя с помощью параметра placeholder
  $("#date").mask("99.99.9999", {placeholder: "дд.мм.гггг" });
  //задание заполнителя с помощью параметра placeholder
  $("#index").mask("999999", {placeholder: " " });
  //Использование параметра completed
  $("#phone1").mask("8(999) 999-99-99", {
    //completed: function(){ alert("Вы ввели номер: " + this.val()); }
  });
  /*
  знак '?'. Этот знак является специальным символом, 
  после которого необходимо разместить часть маски 
  необязательной для заполнения.
  */
  //создания своего специального символа для маски
  $("#number").mask("0.9?9");

  $(function() {
    function maskPhone() {
      var country = $('#country option:selected').val();
      switch (country) {
        case "ru":
          $("#phone").mask("+7(999) 999-99-99");
          break;
        case "ua":
          $("#phone").mask("+380(99) 999-99-99");
          break;
        case "by":
          $("#phone").mask("+375(99) 999-99-99");
          break;          
      }    
    }
    maskPhone();
    $('#country').change(function() {
      maskPhone();
    });
  });
});



//----------------BOM----------------------

//Navigator
/*
обьект Navigator дает информацию о самом 
браузере и операционой системе
*/

//Браузер
console.log(navigator.userAgent);

if (navigator.userAgent.includes("Chrome")) {
  console.log('Браузер Хром');
}else if (navigator.userAgent.includes("Firefox")) {
  console.log('Браузер Firefox');
}
//Платформа
console.log(navigator.platform);


//Location
/*
обьект Location дает текущий URL или меняет на новую страницу
*/
//Получаем URL
console.log(location.href);
//Меняем URL
//location.href = "https://www.youtube.com/"


//History
/*
обьект History позволяет управлять историей браузера,
передвигаться по посещённым страницам
*/
//history.back();
//history.forward();



//DOM
//Навигация по документу

//Получаем обьект body
const bodyElement = document.body;

// Соседние и родительские узлы
const previousSiblingNode = bodyElement.previousElementSibling;
const nextSiblingNode = bodyElement.nextElementSibling;
const parentNode = bodyElement.parentNode;

//closset ищет ближайшего предка - возращает либо предка или null.
  //когда метод parentElement - возращает родителя.
/*  const elem = document.querySelector('.contacts__item');
  const parentList = elem.closest('.contacts');
  elem.parentElement
  console.log(parentList); */
// метод matches - проверяет true или false 
/*  const elems = document.querySelectorAll('.contacts__item')
  for (let elem of elems) {
    if (elem.matches('[class$="contacts__item--active"]')) {
      console.log('есть актив');
    } else {
      console.log('no актив');
    }
  }*/

// Изменение документа
//Содержимое элемента innerHTML
/*
const textElement = document.querySelector('.text-test');
// получаю содержимое обьекта
const textTestContent = textElement.innerHTML;
// дописываю содержимое обьекта
textTest.innerHTML = 
`<div>${textTestContent}</div>
<div class="subtitle">
Эта строка добавлена с помощью js.
</div>
`;
//Создание нового элемента(тега)
const newElement = document.createElement('div');
//Наполняем новый элемент
newElement.innerHTML = 
`
<span>новый элемент</span>
`;
*/
//Вставляем новый элемент
//...перед обьектом
//textElement.after(newElement);
//внутрь и в начало обьекта
//textElement.prepend(newElement);
//...внутрь и в конце обьекта
//textElement.append(newElement);

//Вставляем текст, HTML, элемент
/* textElement.insertAdjacentHTML(
  'beforeend',
  `
  <span>new элемент </span>
  `
); */
/*
'afterend' - вставить html непосредственно после textElement 
'beforebegin' - вставить html непосредственно перед textElement
'afterend' - вставить html в начало содержимого textElement
'beforeend' - вставить html в конец содержимого textElement
*/

//Перенос элемента
/* const textElement_1 = document.querySelector('.text-test-1'); 
 const subtitle = document.querySelector('.subtitle-test');

 console.log(textElement_1);
 textElement_1.append(subtitle);*/
// Вставить копию обьекта
/*const textElement = document.querySelector('.text-test');
//клонирование без дочерних элементов
//const cloneTextElement = textElement.cloneNode();
//Глубокое клонирование вместе с содержимым
const cloneTextElement = textElement.cloneNode(true);

const block = document.querySelector('.home');

block.append(cloneTextElement);*/
//удалить обьект
/*const textElement = document.querySelector('.text-test');
textElement.remove();
*/