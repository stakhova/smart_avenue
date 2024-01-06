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



const preference = new Swiper('.preference__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: ".preference__next",
        prevEl: ".preference__prev"
    },

});
const plan = new Swiper('.plan__slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: false,
    loop: true,
    navigation: {
        nextEl: ".plan__next",
        prevEl: ".plan__prev"
    }
});
const building = new Swiper('.building__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
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


function startTimerAnimation() {

    $(".preference__nav > *").click(function() {
        $(".countdown circle").css("animation", "countdown 4s linear forwards");
        console.log(22222)

        setTimeout(function() {
            // Code to execute when the timer completes (4 seconds in this case)
            console.log("Timer animation completed!");
        }, 4000);
    });
}



const apartments = {
    number: [1, 2, 3, 4, 5],
    section: [1, 2, 3],
    type: 'S (Smart)',
    square: [22, 27, 28, 31],
    price: [389000, 440000, 559000, 790000],
    images: {
        plan22: 'src/images/plan22.png',
        plan27: 'src/images/plan27.png',
        plan28: 'src/images/plan28.png',
        plan31: 'src/images/plan31.png',
    },
};

function getRandomFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
}

function createApartmentsList() {
    let apartmentsList = []
    for (let i = 1; i <= 15; i++) {
        const squarePriceImageIndex = getRandomFromArray(apartments.square);
        const newApartment = {
            name: null,
            number: getRandomFromArray(apartments.number),
            section: getRandomFromArray(apartments.section),
            type: apartments.type,
            square: apartments.square[squarePriceImageIndex],
            price: apartments.price[squarePriceImageIndex],
            image:
                apartments.images[`plan${apartments.square[squarePriceImageIndex]}`],
        };

        newApartment.name = `${newApartment.number}C${newApartment.square}K`;
        console.log('newApartment.name', newApartment.name  )
        console.log('newApartment', newApartment )
        apartmentsList.push(newApartment);
        console.log('apartmentsList', apartmentsList )
    }
}





function mobChange(){
    if(window.innerWidth < 666){
        $('.banner').append($('.banner__pdf-wrap'))
        $('.header__menu-mob').append($('.header__info'))
        $('.header__menu-mob').append($('.banner__social'))
        let firstItem = $(".header__info-item:first");
        let secondItem = $(".header__info-item:eq(1)");
        firstItem.before(secondItem);
    }

}


function updateCounter(currentSlide, totalSlides) {
    $('.counter').text( currentSlide + '/' + totalSlides);
}



function initModalSlider(){
    const modalSlider = new Swiper('.modal__project-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        loop: true,
        navigation: {
            nextEl: ".modal__project__next",
            prevEl: ".modal__project__prev"
        }
    });
}

function changeHeader(){
    let scrolled = $(window).scrollTop();
    if (scrolled > 0){
        $('.header').addClass('header__fixed')
    } else {
        $('.header').removeClass('header__fixed')
    }
}

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



// let countdownNumberEl = $('.countdown-number');
// let countdown = 4;
//
// countdownNumberEl.text(countdown);
//
// setInterval(function() {
//     countdown = --countdown <= 0 ? 10 : countdown;
//
//     countdownNumberEl.textContent = countdown;
// }, 1000);

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


function toggleModal(btn, modal) {
    btn.click(function () {
        initModalSlider()
        modal.show();
        $('body').css('overflow', 'hidden');
        return false;
    });
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            $('body').css('overflow', 'visible');
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
        }
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


function chooseFilter(){
    $(document).on('click','.plan__filter-block button', function (){
        $(this).toggleClass('active')
        $(this).nextAll('button').removeClass('active')
        $(this).prevAll('button').removeClass('active')
    })
}



function counterForSlider(){
    $('.preference__slide').each(function (){
        let count = $(this).attr('aria-label')
        $(this).find('.countdown__number').text(count)
    })
}

$(document).ready(function(){
    $('#header__select').select2()
    updateCounter(1, preference.slides.length);
    changeHeader()
    mobChange();
    chooseFilter()
    // initSlider()
    $('.contact__phone input').inputmask('+380 (99) 999 99 99');
    $(document).on('click', '.header__burger', openMenu)


    let contactForm = $('.contact__form');
    validateForm(contactForm, function () {
        sendForm(contactForm, '/wp-admin/admin-ajax.php');
    });
    createApartmentsList()
    counterForSlider()
    startTimerAnimation()
    toggleModal($('.plan__floor button'), $('.modal__project'))


});

$(window).load(function(){

});

$(window).resize(function(){

});

$(window).scroll(function () {
    changeHeader()
});