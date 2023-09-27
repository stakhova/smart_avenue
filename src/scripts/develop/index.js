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