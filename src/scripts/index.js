$(document).ready(function () {

    // Управление оверлеем
    $('#burger').on('click', function () {
        $('#menu').toggleClass('open');
        $('#nav-overlay').toggleClass('open');
        $('#nav-svg').css('display', 'none');
        $('body').toggleClass('no-scroll');
    });

    $('#menu').find('*').on('click', function () {
        $('#menu').removeClass('open');
        $('#nav-overlay').removeClass('open');
        $('#nav-svg').css('display', 'block');
        $('body').removeClass('no-scroll');
    });

    $('#nav-overlay').on('click', function () {
        $('#menu').removeClass('open');
        $(this).removeClass('open');
        $('body').removeClass('no-scroll');
    });

    $('.close').on('click', function () {
        $('#menu').removeClass('open');
        $('#nav-overlay').removeClass('open');
        $('#nav-svg').css('display', 'block');
        $('body').removeClass('no-scroll');
    });

    let serviceLink = $('#services-link');
    let priceLink = $('#price-link');

    // Плавный скролл
    $(serviceLink).click(function () {
        $('#price')[0].scrollIntoView({behavior: 'smooth'});
    });

    $(serviceLink).click(function () {
        $('#mobile-price')[0].scrollIntoView({behavior: 'smooth'});
    });

    $(priceLink).click(function () {
        $('#price')[0].scrollIntoView({behavior: 'smooth'});
    });

    $(priceLink).click(function () {
        $('#mobile-price')[0].scrollIntoView({behavior: 'smooth'});
    });

    $('#masters-link').click(function () {
        $('#masters')[0].scrollIntoView({behavior: 'smooth'});
    });

    $('#about-link').click(function () {
        $('#about')[0].scrollIntoView({behavior: 'smooth'});
    });

    $('#btn-order').click(function () {
        $('#masters')[0].scrollIntoView({behavior: 'smooth'});
    });

    let extensionTitle = $('#extension-title');

    $('#extension-button').on('click', function () {
        let originalText = $(extensionTitle).html();
        let originalMaxWidth = $(extensionTitle).css('max-width');
        let originalDisplay = $(extensionTitle).css('display');
        let originalJustifyContent = $(extensionTitle).css('justify-content');
        let originalAlignItems = $(extensionTitle).css('align-items');

        // Плавно скрываем кнопку
        $("#extension-button").fadeOut('slow', function () {
            // Когда кнопка скрыта, изменяем текст заголовка и плавно его показываем
            $("#extension-title")
                .html('Просто запишитесь в наш барбершоп и приходите – скидку мы применим после осуществления услуги')
                .css("max-width", "1000px")
                .css("display", "flex")
                .css("justify-content", "center")
                .css("align-items", "center")
                .hide()
                .fadeIn('slow');

            // Возвращаем всё назад через 5 секунд
            setTimeout(function () {
                $("#extension-title").fadeOut('slow', function () {
                    $(this)
                        .html(originalText)
                        .css("max-width", originalMaxWidth)
                        .css("display", originalDisplay)
                        .css("justify-content", originalJustifyContent)
                        .css("align-items", originalAlignItems)
                        .fadeIn('slow');
                });

                $("#extension-button").fadeIn('slow');
            }, 5000);
        });
    });
    // WOW
    new WOW({
        animateClass: 'animate__animated', mobile: true,
    }).init();

    // По умолчанию все вкладки `accordion` закрыты.
    $(function () {

        let accordion = $("#accordion");

        $(accordion).accordion({
            active: true,
            collapsible: false,
            heightStyle: true //Автоматическая высота контента
        });
        // Открываем первый блок аккордеона
        $(accordion).accordion("option", "active", 0);
    });

    // slick
    $(".masters-gallery").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        swipeToSlide: true,
        draggable: true,
        centerPadding: "0",
        dots: true,
        responsive: [
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    let airDatePicker = $('#airdatepicker');

    // airDatePicker
    let date = new Date();
    date.setDate(date.getDate() + 1);

    if ($(airDatePicker).length) {
        new AirDatepicker('#airdatepicker', {
            autoClose: true,
            buttons: ['clear'],
            minDate: date,
        });
    }

    let inputName = $('#input-name');

    // inputMask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Запрещаем ввод цифр в поля `Имя\Фамилия`
    $(inputName).on('input', function () {
        this.value = this.value.replace(/[^A-zА-я\s]/g, '');
    });

    // Обработчик клика для кнопок "Записаться"
    $('.btn-order').on('click', function () {
        // Скрываем блок masters-gallery плавно
        $('#masters-gallery').fadeOut('slow', function () {
            // Показываем блок request плавно после завершения скрытия
            $('#request').fadeIn('slow').css('display', 'flex');
        });
    })


    // Обработчик клика для кнопок "Закрыть блок"
    $('#thanks-close').on('click', function () {
        // Скрываем блоки request и thanks-text плавно
        $('#request').fadeOut('slow', function () {
            // Показываем блок masters-gallery плавно после завершения скрытия
            $('#masters-gallery').fadeIn('slow');
        });
        $('#thanks-text').fadeOut('slow');
    });


    // Валидация
    $('.request-btn').click(function () {
        // Удаление предыдущих сообщений об ошибках и стилей ошибок
        $('.error-message').empty();
        $('.input-error').removeClass('input-error');

        let isValid = true;

        // Проверка на заполненность поля имени
        if ($('#input-name').val().trim() === '') {
            $('#error-name').text('Пожалуйста, введите ваше имя.');
            $('#input-name').addClass('input-error');
            isValid = false;
        }

        // Проверка на заполненность поля телефона
        if ($('#input-phone').val().trim() === '') {
            $('#error-phone').text('Пожалуйста, введите ваш телефон.');
            $('#input-phone').addClass('input-error');
            isValid = false;
        }

        // Проверка на выбор услуги
        if ($('#select-service').val() === null) {
            $('#error-service').text('Пожалуйста, выберите услугу.');
            $('#select-service').addClass('input-error');
            isValid = false;
        }

        // Проверка на выбор мастера
        if ($('#select-masters').val() === null) {
            $('#error-masters').text('Пожалуйста, выберите мастера.');
            $('#select-masters').addClass('input-error');
            isValid = false;
        }

        // Проверка на выбор даты
        if ($('#airdatepicker').val().trim() === '') {
            $('#error-date').text('Пожалуйста, введите дату.');
            $('#airdatepicker').addClass('input-error');
            isValid = false;
        }

        // Проверка на выбор времени
        if ($('#select-time').val() === null) {
            $('#error-time').text('Пожалуйста, выберите время.');
            $('#select-time').addClass('input-error');
            isValid = false;
        }

        // Если все поля заполнены, можно отправить форму
        if (isValid) {
            // Показываем лоадер только если форма корректна
            $('.loader').css('display', 'flex');

            // Выполнение AJAX-запроса
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    name: $('#input-name').val(),
                    phone: $('#input-phone').val(),
                    service: $('#select-service').val(),
                    masters: $('#select-masters').val(),
                    time: $('#select-time').val(),
                    date: $('#airdatepicker').val(),
                }
            })
                .done(function (response) {
                    // Скрываем лоадер после завершения запроса
                    $('.loader').hide();

                    // Обработка успешного ответа
                    console.log('Ответ сервера:', response);
                    if (response.success === 1) {
                        console.log('Заявка успешно оформлена!');
                        // Скрываем блок masters
                        $('#request-title').fadeOut('slow', function () {
                            $('#request-form').fadeOut('slow', function () {
                                // Показываем блок request
                                $('#thanks-text').css({
                                    'display': 'flex',
                                    'flex-direction': 'column',
                                    'align-items': 'center',
                                }).fadeIn('slow');

                                $('#thanks-title').css({
                                    "position": "relative",
                                    "top": "-450px",
                                    "font-size": "25px",
                                    "max-width": "259px",
                                    "font-weight": "400",
                                    "text-align": "center",
                                    "font-family": "'Lora', sans-serif",
                                });

                                $('#thanks-desc').css({
                                    "position": "relative",
                                    "top": "-350px",
                                    "font-size": "18px",
                                    "max-width": "379px",
                                    "font-weight": "400",
                                    "text-align": "center",
                                    "font-family": "'Muller-Regular', sans-serif",
                                }).fadeIn('slow');

                                // Через 10 секунд вернуть все в исходное положение
                                setTimeout(function () {
                                    $('#thanks-text').fadeOut('slow', function () {
                                        $('#thanks-title').css('display', 'none');
                                        $('#thanks-desc').css('display', 'none');
                                        $('#request-title').fadeIn('slow');
                                        $('#request-form').fadeIn('slow');
                                        $('#masters-gallery').fadeIn('slow');
                                    });
                                }, 10000); // 10000 миллисекунд = 10 секунд
                            });
                        });

                    } else {
                        alert('Произошла ошибка при оформлении заявки! Пожалуйста позвоните нам');
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    // Скрываем лоадер при ошибке
                    $('.loader').hide();

                    // Обработка ошибки
                    alert('Ошибка: ' + textStatus + ', ' + errorThrown);
                });
        }
    });

    let loader = $('.loader');

// Текущий год в footer
    $(".footer-year").text((new Date).getFullYear());
})
;
