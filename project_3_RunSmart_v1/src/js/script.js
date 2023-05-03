//$(function() {
/* $(document).ready(function(){ /*отвечает за то, чтобы мы загружали наш сл. тогда, когд. наш док.(HTML) полностью готов*/
  // $/*библиотека*/('.carousel__inner').slick({
  // speed: 1200,
  // slidesToShow: 1, /*кол-во картинок на слайде*/
  // prevArrow: '<button type="button" class="slick-prev"><img src="../img/left_solid.png"></button>',
  // nextArrow: '<button type="button" class="slick-next"><img src="../img/right_solid.png"></button>',
  // });

//  /* /*  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { /*где ul. и not() - подставили свои классы*/
//     $(this) /*ссылается на эл-ент, на который мы только что нажали*/
//       .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
//       .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
//   });  */ */ */



  function toggleSlide(item) {  /*данный скрипт переключает содержимое карточек - подробно - назад*/
    $(item).each/*перебор каждого эл-та*/(function(i)/*i-аргумент*/ {
      $(this)/*ссылаемся на каждый аргумент,который перебирается*/.on('click',/*пользователь будет кликать на эту ссылку*/function(e) {
        /*что будет происходить,когда будут кликать на ссылку (ещё одна функция(e))*/
        e.preventDefault();
        $('.catalog-item__content').eq/*позволяет получать эл-ент по порядку*/(i).toggleClass/*переключение каждого класса*/('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');
  
  //Modal 
  $('[data-modal=consultation]').on('click', function() { /*что будет происх. если ползователь нажмет кнопку*/
  $('.overlay, #consultation').fadeIn('slow'); /*будем показывать overlay пользователям*/
  });

  //крестик
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');

  });

  //"купить" в каталоге пульсометров
  //$('.button_mini').on('click', function () {
    //$('.overlay, #order').fadeIn('slow'); 
  //});

  //чтобы отображались разные названия пульсометров
  $('.button_mini').each(function(i) {
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  //формы валидации, настраиваем плагин
  
  //$('#consultation-form').validate(); 
 //$('#consultation form').validate();
 // $('#order form').validate();
 function validateForms(form){
  $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
  });
};

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');


  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //данный скрипт ниже отвечает за отправку наших заявок/писем на почту

  $('form').submit(function(e) { // submit - когда у нас все условия в инпутах выполнены и будут подтверждаться и форма отправляется. если мы хотим обратиться к опр. form, то обр. через id (#) или через class (.).
    e.preventDefault(); //команда позваляет отменить стандартное поведение браузера ( в нашем случае не будет перезагрузки стр.)

    if(!$(this).valid()) { //если наша форма не прошла валидацию(при помощ. нашего плагина) то в таком    случае мы просто прекратим функцию т.е. мы просто прекратим этот код (ничего делать не будем) -   такким образом мы не сможем отправлять пустые данные из наших форм
      return;
    } 
    $.ajax({
      type: "POST", //будем получать или ОТДАВАТЬ данные (у нас заявки, поэтому отдавать)
      url: "mailer/smart.php", //куда мы будем отправлять данные
      data: $(this).serialize() //данные,которые мы хотим отпр. на сервер
    }).done(function() { //когда выполнили эту операцию, выполняем следующую
      $(this).find("input").val(""); //то что внутри этой формы мы НАХОДИМ,мы также находим input (их val) и оставляем пустую строку ("") - таким образом очистим все input после отправки формы
      $('#consultation, #order').fadeOut(); //эти мод.окна мне не нужны после отправки, поэтому "fadeOut"
      $('.overlay, #thanks').fadeIn(); //
      $('form').trigger('reset'); //запускаем,что все наши формы должны очиститься
    });
    return false;
  }); 

  //добавляем плавный скролл и исчезновение знака smooth scrolling
  $(window).scroll(function(){ //когда мы будем скролить наше окно
    if ($(this).scrollTop() > 1600) { //и скролл будет больше 1600px сверху
      $('.pageup').fadeIn(); //то наш элемент покажется
    } else {
      $('.pageup').fadeOut(); //если предыдущее условие не выполняется, то эл-ент будет скрываться 
    }
  });
  //добавляем плавность
  $("a[href=#up]").click(function(){ //атрибут ссылка (а) будет начинаться (^) с решетки,тк мы задаем локальные ссылки, которые тоже начинаются с решетки
    const _href = $(this).attr("href"); //создаем переменную (const) и получаем в переменную то значение, которое было в атрибуте href
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"}); //анимация, написанная при помощи jQery
    return false;
});

new WOW().init();

// });


$("swiper-slide img").each(function () {
  $(this).css("margin-left", -this.width / 2);
})

const swiper = new Swiper('.mySwiper', {
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  
  loop: true,
 
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // And if we need scrollbar

});

  