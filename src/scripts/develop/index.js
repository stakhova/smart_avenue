const banner = new Swiper('.banner__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,


    loop: true,
    navigation: {
        nextEl: ".banner__next",
        prevEl: ".banner__prev"
    }

});

let preference = new Swiper('.preference__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    navigation: {
        nextEl: ".preference__next",
        prevEl: ".preference__prev"
    },
    on: {
        slideChange: function() {
            // updateCounter(this.realIndex + 1, swiper.slides.length);
            startTimer();
        },
    },

});


function mobChange(){
    $('.banner').append($('.banner__pdf-wrap'))
}


function updateCounter(currentSlide, totalSlides) {
    $('.counter').text( currentSlide + '/' + totalSlides);
}


var timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    let seconds = 4; // Set the timer duration (in seconds)
    let timerElement = $('.timer');

    let updateTimer = function() {
        if (seconds === 0) {
            preference.slideNext();
            seconds = 4;
        }
        timerElement.text(seconds);
        seconds--;
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    let timer= document.getElementsByClassName('timer');
    let time= 3;
    setInterval(function(){
        timer.innerHTML = time;
        time--;
        if(time<=0) time = 4;
    },1000)
}


function changeHeader(){
    let scrolled = $(window).scrollTop();
    if(scrolled>0){
        $('.header').addClass('header__fixed')
    }else{
        $('.header').removeClass('header__fixed')
    }
}

const building = new Swiper('.building__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    navigation: {
        nextEl: ".building__next",
        prevEl: ".building__prev"
    }

});



const gallery = new Swiper('.gallery__slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".gallery__next",
        prevEl: ".gallery__prev"
    }
});



const validateForm = (form, func) => {
    form.on("submit", function (e) {
        e.preventDefault();
    });

    $.validator.addMethod("goodName", function (value, element) {
        return this.optional(element) || /^[\sаА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,30}$/i.test(value);
    }, "Поле заповнено неправильно");

    $.validator.addMethod("goodPhone", function (value, element) {
        // return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/i.test(value);
        return this.optional(element) || /^[+()0-9\s]+$/g.test(value);
    }, "Введіть номер у форматі +380 (XX) XXX XX XX");

    form.validate({
        rules: {
            name: {
                required: true,
                goodName: true
                // minlength:2,
                // maxLength: 25
            },
            phone: {
                required: true,
                goodPhone: true
            },
        },
        messages: {
            name: {
                required: "Це поле є обов’язкове",
                minlength: "Ім'я не може бути коротше за 2 букви",
                maxLength: "Ім'я не може бути довше за 25 букви"
            },
            phone: {
                required: "Це поле є обов’язкове",
                phone: "Введіть номер у форматі +380 (XX) XXX XX XX"
            },
        },
        submitHandler: function () {
            func();
            form[0].reset();
        }
    });
};


function ajaxSend(date, url, func,funcError) {
    $.ajax({
        url: url,
        data: date,
        method: 'POST',
        success: function (data) {
            func(data);
        },
        error: function (error) {
            funcError(error)

        },
        complete: function () {}
    });

}

// send form
function sendForm(form, url, func,funcError) {
    form = form.serialize();
    ajaxSend(form, url, func,funcError);
}

function openMenu () {
    $('.header__burger').toggleClass("header__burger-open");
    $('.header__menu-mob').toggleClass('header__menu-show');
    $('body').toggleClass('hidden');
};


$(document).ready(function(){
    $('#header__select').select2()
    updateCounter(1, preference.slides.length);
    startTimer();
    changeHeader();
    mobChange()
    $(document).on('click', '.header__burger', openMenu)
    let contactForm = $('.contact__form');
    validateForm(contactForm, function () {
        sendForm(contactForm, '/wp-admin/admin-ajax.php');
    });
    $('.contact__phone input').inputmask('+380 (99) 999 99 99');

});

$(window).load(function(){

});

$(window).resize(function(){

});

$(window).scroll(function () {
    changeHeader()
});