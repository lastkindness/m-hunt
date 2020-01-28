(function () {

    "use strict";

    $(document).ready(function () {
        var body = document.querySelector('body'),
            isMobile = false,
            scrollTopPosition,
            browserYou,
            _winWidth = $(window).outerWidth();

        var genFunc = {

            initialized: false,
            initialize: function () {

                if (this.initialized) return;

                this.initialized = true;

                this.build();
            },

            build: function () {
                // browser
                browserYou = this.getBrowser();
                if (browserYou.platform == 'mobile') {
                    isMobile = true;
                    document.documentElement.classList.add('mobile');
                } else {
                    document.documentElement.classList.add('desktop');
                }
                if ((browserYou.browser == 'ie')) {
                    document.documentElement.classList.add('ie');
                }
                if (navigator.userAgent.indexOf("Edge") > -1) {
                    document.documentElement.classList.add('edge');
                }
                if (navigator.userAgent.search(/Macintosh/) > -1) {
                    document.documentElement.classList.add('macintosh');
                }
                if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                    alert('Обновите браузер');
                }
                if (document.querySelector('.yearN') !== null) {
                    this.copyright();
                }
            },
            copyright: function () {
                var yearBlock = document.querySelector('.yearN'),
                    yearNow = new Date().getFullYear().toString();
                if (yearNow.length) {
                    yearBlock.innerText = yearNow;
                }
            },
            getBrowser: function () {
                var ua = navigator.userAgent;
                var bName = function () {
                    if (ua.search(/Edge/) > -1) return "edge";
                    if (ua.search(/MSIE/) > -1) return "ie";
                    if (ua.search(/Trident/) > -1) return "ie11";
                    if (ua.search(/Firefox/) > -1) return "firefox";
                    if (ua.search(/Opera/) > -1) return "opera";
                    if (ua.search(/OPR/) > -1) return "operaWebkit";
                    if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                    if (ua.search(/Chrome/) > -1) return "chrome";
                    if (ua.search(/Safari/) > -1) return "safari";
                    if (ua.search(/maxHhon/) > -1) return "maxHhon";
                }();

                var version;
                switch (bName) {
                    case "edge":
                        version = (ua.split("Edge")[1]).split("/")[1];
                        break;
                    case "ie":
                        version = (ua.split("MSIE ")[1]).split(";")[0];
                        break;
                    case "ie11":
                        bName = "ie";
                        version = (ua.split("; rv:")[1]).split(")")[0];
                        break;
                    case "firefox":
                        version = ua.split("Firefox/")[1];
                        break;
                    case "opera":
                        version = ua.split("Version/")[1];
                        break;
                    case "operaWebkit":
                        bName = "opera";
                        version = ua.split("OPR/")[1];
                        break;
                    case "yabrowser":
                        version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                        break;
                    case "chrome":
                        version = (ua.split("Chrome/")[1]).split(" ")[0];
                        break;
                    case "safari":
                        version = ua.split("Safari/")[1].split("")[0];
                        break;
                    case "maxHhon":
                        version = ua.split("maxHhon/")[1];
                        break;
                }
                var platform = 'desktop';
                if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
                var browsrObj;
                try {
                    browsrObj = {
                        platform: platform,
                        browser: bName,
                        versionFull: version,
                        versionShort: version.split(".")[0]
                    };
                } catch (err) {
                    browsrObj = {
                        platform: platform,
                        browser: 'unknown',
                        versionFull: 'unknown',
                        versionShort: 'unknown'
                    };
                }
                return browsrObj;
            },
        };
        genFunc.initialize();

        /* -------------------------------------------------------------------------
        begin dropdown select
        * ------------------------------------------------------------------------- */

        $('.header__phone .js__dropdown').on('click', function (e) {
            if ($(window).width() > 993) {
                $(this).toggleClass('active').find('.dropdown__dropdown').slideToggle();
                e.stopPropagation();
            }
        });
        //dropdown select end

        /*burger start*/
        if($('.burger').length) {
            $('.burger').click(function () {
                $('.burger').toggleClass('clicked');
                $('.header').toggleClass('mobile-active');
                $('.header__main').slideToggle();
            });
        }
        /*burger end*/

        /*menu dropdown start*/
        $(".header__nav-list-drop").closest(".header__nav-item").addClass("drop");
        if ($(window).width() > 993) {
            $( ".header__nav-item.drop").mouseenter(function() {
                $(this).find(".header__nav-list-drop").slideDown(300);
                $(this).addClass("active");
            });
            $( ".header__nav-item.drop").mouseleave(function() {
                $(".header__nav-list-drop").stop(true).slideUp(300);
                $(this).find(".header__nav-list-drop").slideUp(300);
                $(this).removeClass("active");
            });
        } else {
            $( ".header__nav-item.drop").click(function() {
                $(this).find(".header__nav-list-drop").slideToggle(300);
                $(this).toggleClass("active");
            });
        }
        /*menu dropdown start*/

        //body onclick start
        $('body').on('click', function () {
            $('.dropdown__dropdown').slideUp();
            $('.header__phone-dropdown').slideUp();
            $('.js__dropdown').removeClass("active");
            $('.js__phone-dropdown').removeClass("active");
            $('.search').removeClass("active");
            $('.header__menu-buttons').removeClass("search-active");
        });
        //body onclick end
    });

    //phone mask
    if ($('input[type="tel"]').length) {
        $.jMaskGlobals = {translation: {
                'n': {pattern: /\d/},
            }
        };
        $('input[type="tel"]').mask('+380(nn)-nnn-nnnn', {
            // placeholder: "+380(--)-------"
        });
    }
    //phone mask

    // input on focus start
    $('.input-container input,.input-container textarea').on("change", function () {
        if ($(this).val()!="") {
            $(this).closest(".input-container").addClass("filled");
            $('.input-container input,.input-container textarea').on("blur", function () {
                $(this).closest(".input-container").addClass("active");
            });
        } else {
            $(this).closest(".input-container").removeClass("filled");
            $('.input-container input,.input-container textarea').on("blur", function () {
                $(this).closest(".input-container").removeClass("active");
            });
        }
    });

    $('.input-container input,.input-container textarea').on("keydown", function () {
        $(this).closest(".input-container").addClass("active");
    });

    $('.input-container input,.input-container textarea').on("focus", function () {
        $(this).closest(".input-container").addClass("active");
    });

    $('.input-container input,.input-container textarea').on("blur", function () {
        $(this).closest(".input-container").removeClass("active");
        $(this).closest(".input-container").removeClass("filled");
    });

    // input on focus end

    $(document).ready(function () {
        // slick start
        if ($(".js-main-banner").length) {
            $(".js-main-banner").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                fade: true,
                cssEase: 'linear',
                dots: true,
                focusOnSelect: false,
                arrows: false,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            dots: false
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            dots: true,
                            arrows: false
                        }
                    }
                ]
            });
        }
        // slick end
    });

    if ($(".main-banner-new__big").length) {
        $(".main-banner-new__big").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            focusOnSelect: false,
            arrows: false,
            adaptiveHeight: true,
            autoplay: false,
            fade: true,
            swipe: true,
            infinite: true,
            asNavFor: '.main-banner-new__small',
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
        $('.main-banner-new__small').slick({
            asNavFor: '.main-banner-new__big',
            dots: false,
            swipe: true,
            centerMode: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            focusOnSelect: true,
            autoplay: false,
            arrows: false,
            centerPadding: '0',
            adaptiveHeight: true
        });
    };


    $(document).ready(function () {
        // slick start
        if ($(".js-integration-slider").length) {
            $(".js-integration-slider").slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true,
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        }
        // slick end
    });
    // slick start
    if ($(".testimonials__big").length) {
        $(".testimonials__big").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            focusOnSelect: false,
            arrows: true,
            adaptiveHeight: true,
            autoplay: false,
            fade: true,
            infinite: true,
            asNavFor: '.testimonials__small'
        });
        var sliderNav = $('.testimonials__small');
        var maxItems = Math.round(sliderNav.parent('.testimonials__small-slide').width() / 201);
        if(sliderNav.children('.testimonials__small-slide').length < maxItems) {
            maxItems = sliderNav.children('.testimonials__small-slide').length;
        }
        $('.testimonials__small').slick({
            asNavFor: '.testimonials__big',
            dots: false,
            swipe: true,
            centerMode: false,
            infinite: true,
            slidesToShow: maxItems,
            slidesToScroll: 1,
            focusOnSelect: true,
            arrows: false,
            centerPadding: '0',
            adaptiveHeight: true
        });
        // slick end
    }

    $('.video .icon-play').on("click", function () {
        var link = $(this).siblings(".video-block").attr("href");
        $.fancybox.open({
            src: link
        });
    });
    /* -------------------------------------------------------------------------
    begin Validation
    * ------------------------------------------------------------------------- */
    $(document).ready(function () {

        $(document).on("change", '.js_validate *[required]', function () {
            $(this).each(function () {
                var valid = validate($(document).find($(this)));
                if (valid == false) {
                    console.log("valid not passed");
                    return false;
                } else {
                    console.log("valid passed");
                }
            });

        });


        $('.js_validate .btn[type="submit"]').on("click", function () {
            var valid = validate($(document).find($(this).parents(".js_validate")));
            if (valid == false) {
                console.log("valid not passed");
                return false;
            } else {
                console.log("valid passed");
            }
        });


    });

    function formatValidate(inputFile) {
        function showMsg(massage) {
            $($($($(inputFile)[0]).siblings(".text-error"))[0]).text(massage);
            $(inputFile[0]).closest(".input-container__file").addClass("error");
            return false;
        }

        var format = [".pdf", ".txt", ".doc", ".docx", ".rtf", ".odt"];
        if ((inputFile)[0].files.length!=1) {
            showMsg($($(inputFile)[0]).attr("data-error-existence"));
            return false;
        } else {
            var file = (inputFile)[0].files;
            var fileName = file[0].name;
            if ((file[0].size/1024/1024) < 5) {
                for (var i = 0; i < format.length; i++) {
                    if (-1 !== fileName.indexOf(format[i])) {
                        $($(inputFile)[0]).closest(".input-container__file").removeClass("error");
                        $($(inputFile)[0]).closest(".input-container__file").addClass("pass");
                        $($(inputFile)[0]).siblings(".text-error").text("");
                        return true;
                    } else {
                        showMsg($($(inputFile)[0]).attr("data-error-type"));
                    }
                }
            }
            else {
                showMsg($($(inputFile)[0]).attr("data-error-size"));
            }
        }
    }


    function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item = form.find("[required]");
        var e = 0;
        var reg = undefined;
        var pass = $('.password').val();
        var pass1 = $('.password_1').val();
        var passold = $('.password_old').val();
        var email = false;
        var password = false;
        var password_1 = false;
        var password_old = false;
        var phone = false;
        var undef = false;
        var date = false;
        var number = false;
        var arr = [];

        function mark(object, expression, minSign, maxSign) {
            if (expression) {
                object.parent('div').addClass(error_class).removeClass(norma_class);
                if (email) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 37) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        } else {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_old) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==pass||object.val()==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else if (object.val()!==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_1) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            }  else if (object.val()!==pass) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (phone) {
                    if (object.val().length != 17) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (date) {
                    if (object.val().length != 4) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (number) {
                    if (object.val().length < 4 ||object.val().length > 100) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (undef) {
                    if (object.val().length > 0) {
                        if (object.val().length > minSign && object.val().length < maxSign) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        } else {
                            object.parent('div').find('.text-error').text('Введите колличество символов (2-100)');
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                e++;
            } else {
                if($(object[0]).hasClass("select")) {
                    if($(object[0]).prop("selectedIndex")!=0) {
                        object.parent('div').addClass(norma_class).removeClass(error_class);
                        e = 0;
                    } else {
                        object.parent('div').addClass(error_class).removeClass(norma_class);
                        e = 0;
                    }
                } else {
                    object.parent('div').addClass(norma_class).removeClass(error_class);
                    e = 0;
                }
            }
            arr.push(expression);
        }

        if(form.hasClass('js_validate')) {
            var field = form.find("[required]"),
                select = form.find('.js_valid_select'),
                radio = form.find('.js_valid_radio'),
                file = form.find('.input-container__file'),
                checkbox = form.find('.js_valid_checkbox');
            field.each(function () {
                var dataValidate = $(this).attr("data-validate");
                caseDataValidate(dataValidate, $(this));
            });
            select.each(function () {
                validSelect($(this).find('select option'));
            });
            radio.each(function () {
                validRadio($(this).find('input[type="radio"]'));
            });
            checkbox.each(function () {
                validCheckbox($(this).find('input[type="checkbox"]'));
            });
            file.each(function () {
                validFile($(this).find('input[type="file"]'));
            });
        } else {
            var dataValidate =  form.attr("data-validate"),
                inputContainer = form.closest('.input-container'),
                field = form,
                select = inputContainer.find('select option'),
                radio = inputContainer.find('input[type="radio"]'),
                file = inputContainer.find('input[type="file"]'),
                checkbox = inputContainer.find('input[type="checkbox"]');
            if(inputContainer.hasClass('js_valid_select')) {
                validSelect(select);
            }
            else if(inputContainer.hasClass('js_valid_radio')) {
                validRadio(radio);
            }
            else if(inputContainer.hasClass('js_valid_checkbox')) {
                validCheckbox(checkbox);
            }
            else if(inputContainer.hasClass('input-container__file')) {
                validFile(file);
            }
            else {
                caseDataValidate(dataValidate, field);
            }
        }

        function caseDataValidate(dataValidate, fieldIn) {
            var minSign = fieldIn.attr("data-minsign");
            var maxSign = fieldIn.attr("data-maxsign");
            switch (dataValidate) {
                case "text":
                    reg = new RegExp('^[\/\'"?!,.А-Яа-яёЁЇїІіЄєҐґa-zA-Z_0-9 -]{'+minSign+','+maxSign+'}$');
                    undef = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())), minSign, maxSign);
                    undef = false;
                    break;
                case "date":
                    reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                    date = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    date = false;
                    break;
                case "number":
                    reg = new RegExp('^[0-9]{'+minSign+','+maxSign+'}$');
                    number = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    number = false;
                    break;
                case "email":
                    reg = /^([A-Za-z0-9_\-\.]{1,15})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                    email = true;
                    if($.trim(fieldIn.val()).length>37) {
                        mark(fieldIn, true);
                    } else {
                        mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    }
                    email = false;
                    break;
                case "phone":
                    phone = true;
                    reg = /[0-9-()+]{17}$/;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    phone = false;
                    break;
                case "passold":
                    password_old = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (passold==pass||!reg.test($.trim(fieldIn.val()))||passold==pass1));
                    password_old = false;
                    break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold==pass));
                    password = false;
                    break;
                case "pass1":
                    password_1 = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold == pass1));
                    password_1 = false;
                    break;
                case "file":
                    formatValidate(fieldIn);
                case "select2":
                    if (fieldIn.val()!=null||fieldIn.val()!=undefined||fieldIn.val()!="0") {
                        mark(fieldIn, false);
                        break;
                    } else {
                        mark(fieldIn, true);
                        break;
                    };
                default:
                    reg = new RegExp(fieldIn.attr("data-validate"), "g");
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    break;
            }
        }

// js_valid_select
        function validSelect(inp) {
            var rezalt = 0;
            for (var i = 1; i < inp.length; i++) {
                if ($(inp[i]).is('selected') === true||$(inp[i]).prop('selected') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_radio
        function validRadio(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_checkbox
        function validCheckbox(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_file
        function validFile(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if (formatValidate(inp) == true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_rating
        form.find('.js-rating').each(function (indx, rating) {
            var i = 0;
            $(rating).find(".star").each(function (indx, star) {
                if($(star).hasClass("active")) {
                    i++;
                } else {
                }
            });
            if (i>0) {
                $(this).addClass(norma_class).removeClass(error_class);
            } else {
                $(rating).addClass(error_class).removeClass(norma_class);
                e = 1;
            }
        });


        if ($.inArray(true, arr) == -1 && e == 0) {
            return true;
        } else {
            form.find("." + error_class + " input:first").focus();
            return false;
        }
    }

    function validateReset() {
        var form = $('.popup-overlay').find("form");
        var error_class = "error";
        var norma_class = "pass";
        form.find("[required]").each(function (indx, element) {
            $(element).val("");
            $(element).parent('.input-container').removeClass(error_class);
            $(element).parent('.input-container').removeClass(norma_class);
        });
    }

    $('.popup-overlay').click(function() {
        validateReset();
    });

    $('.popup .close-btn').click(function() {
        validateReset();
    });

    $('.input-container .delete').click(function() {
        var error_class = "error";
        var inp = $(this).siblings('input');
        var label = $(this).siblings('label');
        inp.val('');
        inp.parent('.input-container').removeClass(error_class);
        inp.parent('.input-container').removeClass("filled");
        if(inp[0].hasAttribute("data-error-existence")) {
            label.text(inp.attr("data-error-existence"));
        } else {
        }
    });

    /* -------------------------------------------------------------------------
     end Validation
     * ------------------------------------------------------------------------- */

    //plus close open
    if($('.faq__content-li').length) {
        $('.faq__content-title').click(function () {
            if($(this).closest('.faq__content-li').hasClass('active')) {
                $(".faq__content-title").not(this).siblings('.faq__content-text').slideUp();
                $(".faq__content-title").not(this).closest('.faq__content-li').removeClass('active');
                $(this).siblings('.faq__content-text').slideUp();
                $(this).closest('.faq__content-li').removeClass('active');
            } else {
                $(".faq__content-title").not(this).siblings('.faq__content-text').slideUp();
                $(".faq__content-title").not(this).closest('.faq__content-li').removeClass('active');
                $(this).siblings('.faq__content-text').slideDown();
                $(this).closest('.faq__content-li').addClass('active');
            }
        });
    }
    //plus close open

    /*Popup start*/
    $(document).on("click", '.btn[data-target="mail"]', function(e) {
        console.log("click");
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(300);
        $('.popup[data-target="popup-mail"]').fadeIn(300);
    });

    $(document).on("click", '.btn[data-target="callback"]', function(e) {
        console.log("click");
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(300);
        $('.popup[data-target="popup-callback"]').fadeIn(300);
    });

    function closePopup() {
        $('.popup').fadeOut(300);
        setTimeout(function () {
            $('.popup-overlay').fadeOut(500);
        }, 300);
    }
    $(document).on("click", ".popup-overlay", function(e) {
        closePopup();
    });

    $(document).on("click", ".popup-header__link a", function(e) {
        closePopup();
    });

    $('.popup .close-btn').click(function(e) {
        closePopup();
    });

    $('.popup').click(function(e) {
        e.stopPropagation();
    });

    /*Popup end*/

    if ($('.main-page').length||$('.service-page').length) {
        $('header').removeClass("static");
    }

    /****************/
    //autoHideHeader start
    /***************/

    var header = $('header');

    var mobileMenuNav = $('header > ul');

    var headerHeight = $(header).height(),
        scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
        var timeoutHeader = setTimeout(function(){
            if ($(window).scrollTop() >= 145)
                $('header').addClass('is-hidden');
                $('.js__dropdown').removeClass('active');
        }, 2000);
    }


    function autoHideHeader() {
        var currentTop = $(window).scrollTop();
        if (previousTop - currentTop > scrollDelta) {
            $(header).removeClass('is-hidden');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            $(header).addClass('is-hidden');
            $('.js__dropdown').removeClass('active');
        }

        mobileMenuNav.removeClass('active');

        previousTop = currentTop;
        scrolling = false;
    }


    $(window).on('scroll', function() {
        if(!$(header).hasClass("mobile-active")) {
            var currentTop = $(window).scrollTop();
            if (currentTop!=0) {
                $(header).addClass('is-move');
            } else {
                $(header).removeClass('is-move');
            }
            if(!header.hasClass("mobile")) {
                if(!header.hasClass("search-mob")) {
                    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
                        clearTimeout( timeoutHeader );
                        timeoutHeader = setTimeout(function(){
                            if ($(window).scrollTop() >= 145)
                                $('header').addClass('is-hidden');
                            $('.js__dropdown').removeClass('active');
                        }, 2000);
                    }
                }
            }

            var scrollTop = $(this).scrollTop();

            if( !scrolling ) {
                if(!header.hasClass("mobile")) {
                    if(!header.hasClass("search-mob")) {
                        scrolling = true;
                        if(!window.requestAnimationFrame) {
                            setTimeout(autoHideHeader, 250);
                        }else{
                            requestAnimationFrame(autoHideHeader);
                        }
                    }
                }
            }
        }
    });

    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
        $('header').hover(
            function (){
                clearTimeout(timeoutHeader);
            }, function() {
                timeoutHeader = setTimeout(function(){
                    if ($(window).scrollTop() >= 145) {
                        $('header').addClass('is-hidden');
                        $('.js__dropdown').removeClass('active');
                    }
                }, 2000);
                $('header ul li a').removeClass('opacity');
            });
    }
    /****************/
    //autoHideHeader end
    /***************/

    /*Function for go to top end*/
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 100) {
            $(".go-to-top").fadeIn();
        } else {
            $(".go-to-top").fadeOut();
        }
    });
    /*Function for go to top*/
    $('.go-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*Function for go to top end*/

    /* map start*/
    function myMap(mapItem) {
        var coords = mapItem.data('coords').split(/\s*,\s*/);
        var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
        var myCenter = new google.maps.LatLng(coords[0], coords[1]);
        if (mapItem.length > 0) {
            var mapOptions = {
                zoom: 19,
                center: myCenter,
                scrollwheel: false,
                disableDefaultUI: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(mapItem[0].id), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: 'images/marker.svg'
            });
        }
    }

    if ($("#map").length) {
        myMap($("#map"));
    }
    if ($("#map-pickup").length) {
        myMap($("#map-pickup"));
    }

    jQuery(document).ready(function( $ ){
        if($(".tabs").length) {
            $("#planning").attr('id', '');
            $("#pricing").attr('id', '');
            $("#apps").attr('id', '');
            $(".student-package .slide-5").attr('id', 'planning');
            $(".student-package .slide-6").attr('id', 'pricing');
            $(".student-package .slide-2").attr('id', 'apps');

            $(document).on("click", "a[href='#students']", function(e) {
                $(".student-package").removeClass("hidden");
                $(".kids-package").addClass("hidden");
                $("#planning").attr('id', '');
                $("#pricing").attr('id', '');
                $("#apps").attr('id', '');
                $(".student-package .slide-5").attr('id', 'planning');
                $(".student-package .slide-6").attr('id', 'pricing');
                $(".student-package .slide-2").attr('id', 'apps');
            });

            $(document).on("click", "a[href='#kids']", function(e) {
                $(".kids-package").removeClass("hidden");
                $(".student-package").addClass("hidden");
                $("#planning").attr('id', '');
                $("#pricing").attr('id', '');
                $("#apps").attr('id', '');
                $(".kids-package .slide-5").attr('id', 'planning');
                $(".kids-package .slide-6").attr('id', 'pricing');
                $(".kids-package .slide-2").attr('id', 'apps');

            });

            $(document).on("click", ".tabs", function(e) {
                console.log($(this).closest(".dark").parent());
                $(".tabs").not(this).closest(".dark").parent().removeClass("hidden");
                $(this).closest(".dark").parent().addClass("hidden");
                $(".tabs").not(this).closest(".dark").siblings(".slide-5").attr('id', 'planning');
                $(".tabs").not(this).closest(".dark").siblings(".slide-6").attr('id', 'pricing');
                $(".tabs").not(this).closest(".dark").siblings(".slide-2").attr('id', 'apps');
                $(".hidden .slide-5").attr('id', '');
                $(".hidden .slide-6").attr('id', '');
                $(".hidden .slide-2").attr('id', '');
            });

            $(document).on("click", ".slide-6 .tabs", function(e) {
                console.log($(this).closest(".slide-6").parent());
                $(".tabs").not(this).closest(".slide-6").parent().removeClass("hidden");
                $(this).closest(".slide-6").parent().addClass("hidden");
                $(".tabs").not(this).closest(".slide-6").siblings(".slide-5").attr('id', 'planning');
                $(".tabs").not(this).closest(".slide-6").siblings(".slide-6").attr('id', 'pricing');
                $(".tabs").not(this).closest(".slide-6").siblings(".slide-2").attr('id', 'apps');
                $(".hidden .slide-5").attr('id', '');
                $(".hidden .slide-6").attr('id', '');
                $(".hidden .slide-2").attr('id', '');
            });
        }
    });

    /* map end*/

    /****************/
    //search start
    /***************/

    if($('.search').length) {
        if ($(window).width() > 993) {
            $('.search').click(function (e) {
                e.stopPropagation();
                $(this).addClass('active');
                $(this).closest(".header__menu-buttons").addClass("search-active");
            });
            $('.icon-search').click(function (e) {
                e.stopPropagation();
                $(this).closest('.search').addClass('active');
                $(this).closest(".header__menu-buttons").addClass("search-active");
            });
        } else {
            $('.header__search-icon').click(function (e) {
                e.stopPropagation();
                $('.search-mobile').slideToggle();
                $(this).toggleClass('active');
                $('.header').toggleClass('search-mob');
            });
        }
    }

    /****************/
    //search end
    /***************/

    if ($("#jsmainbanner").length) {
        var jsmainbannerItem = jsmainbanner.querySelectorAll(".main-banner-new__big-item");

        jsmainbannerItem.forEach(function(item){
            console.log(item);
            const blink1 = item.querySelector(".blink1"),
            blink2 = item.querySelector(".blink2"),
            maxMove = item.offsetWidth / 2,
            blink1CenterX = blink1.offsetLeft + (blink1.offsetWidth / 1.5),
            blink1CenterY = blink1.offsetTop + (blink1.offsetHeight / 1.5),
            blink2CenterX = blink2.offsetLeft + (blink2.offsetWidth / 2),
            blink2CenterY = blink2.offsetTop + (blink2.offsetHeight / 2),
            fluidboxer = window.matchMedia("(min-width: 26px)");

            function getMousePos(xRef, yRef) {
                let panelRect = item.getBoundingClientRect();
                return {
                    x: Math.floor(xRef - panelRect.left) /(panelRect.right-panelRect.left)*item.offsetWidth,
                    y: Math.floor(yRef - panelRect.top) / (panelRect.bottom -panelRect.top) *item.offsetHeight
                };
            }

            document.body.addEventListener("mousemove", function(e) {
                let mousePos = getMousePos(e.clientX, e.clientY),
                    distXblink1 = mousePos.x - blink1CenterX,
                    distYblink1 = mousePos.y - blink1CenterY,
                    distXblink2 = mousePos.x - blink2CenterX,
                    distYblink2 = mousePos.y - blink2CenterY
                blink1.style.backgroundPosition = `calc(50% + ${distXblink1/30}px) calc(50% + ${distYblink1/30}px)`;
                blink2.style.backgroundPosition = `calc(50% + ${distXblink2/90}px) calc(50% + ${distYblink2/90}px)`;
            });
        });
    }

    //img lazy load
    /***************/

    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
    /****************/
    //img lazy load
    /***************/

})();