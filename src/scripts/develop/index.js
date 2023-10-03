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

var swiper = new Swiper('.preference__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    // autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    // },


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



function updateCounter(currentSlide, totalSlides) {
    $('.counter').text( currentSlide + '/' + totalSlides);
}

var timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    var seconds = 4; // Set the timer duration (in seconds)
    var timerElement = $('.timer');

    var updateTimer = function() {
        if (seconds === 0) {
            swiper.slideNext();
            seconds = 5;
        }
        timerElement.text(seconds);
        seconds--;
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
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

$(document).ready(function(){
    $('#header__select').select2()

    updateCounter(1, swiper.slides.length);
    startTimer();
});

$(window).load(function(){

});

$(window).resize(function(){

});

$(window).scroll(function () {

    let scrolled = $(window).scrollTop();
    if(scrolled>0){
        $('.header').addClass('header__fixed')
    }else{
        $('.header').removeClass('header__fixed')
    }

});