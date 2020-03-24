// $('.datepicker').pickadate();

// $('.js-status-change').on('click', function(e) {
//     e.stopImmediatePropagation();
//     $(this).find('.popup').toggleClass('popup--visible');
//     // console.log('test');
// })
// function popUpOpen(e) { e.find('.popup').toggleClass('popup--visible'); }

// $('.js-search-toggler').on('click', function() {

// });

// Смяна от крояч на шивач и обратно
$('input[name="filter-role"]').on('change', function() {
    var parent = $(this).parents('.orders');
    if ($(this).is('#tailor')) {
        parent.find('.prod-block').addClass('prod-block--tailor');
        parent.find('.js-start .js-check').text('Ушито');
    }
    else {
        parent.find('.prod-block').removeClass('prod-block--tailor');
        parent.find('.js-start .js-check').text('Започни кроене');
    }
});

var currEl;

$('.js-check').on('click', function(e) {
    if (!currEl.hasClass('prod-block__box--checked') && currEl.attr("data-first") === "true") {
        currEl.addClass('prod-block__box--checked');
        currEl.attr('data-first', false);
        currEl.next().attr('data-first', true);
        currEl.attr('data-last', true);
        currEl.prev().attr('data-last', false);
    }

    else if (currEl.hasClass('prod-block__box--checked') && currEl.attr('data-last') === "true") {
        console.log('Green');
        currEl.removeClass('prod-block__box--checked');
        currEl.attr('data-first', true);
        currEl.attr('data-last', false);
        currEl.next().attr('data-first', false);
        currEl.prev().attr('data-last', true);
    }

    currEl = undefined;
    closePopup();
});


$('.js-status-change').on('click', function() {
    currEl = $(this);
    if (!$(this).hasClass('prod-block__box--checked') && $(this).attr("data-first") === "true") {
        openPopup($(this), 'start');
    }

    else if ($(this).hasClass('prod-block__box--checked') && $(this).attr('data-last') === "true") {
        openPopup($(this), 'end');
    }

    // Ако елемента няма клас чекд и ако атрибута му е тру 

    // console.log($(this).next());
    // debugger;
    // console.log(typeof $(this).attr("data-first"));
    // Ако не е чекнато и ако е първото сиво поленце
    // if (!$(this).hasClass('prod-block__box--checked') && $(this).attr("data-first") === "true") {
    //     //Ще има проверка ако бутона в попъп-а е натиснат
    //         openPopup($(this));
    //         $(this).addClass('prod-block__box--checked');
    //         $(this).attr('data-first', false);
    //         $(this).next().attr('data-first', true);
    //         $(this).attr('data-last', true);
    //         $(this).prev().attr('data-last', false);
    // }

    // else if ($(this).hasClass('prod-block__box--checked') && $(this).attr('data-last') === "true") {
    //     console.log('Green');

    //     openPopup($(this));

    //     //Покажи попъпа за отказване и ако е натиснат изпълни тези команди
    //     $(this).removeClass('prod-block__box--checked');
    //     $(this).attr('data-first', true);
    //     $(this).attr('data-last', false);
    //     $(this).next().attr('data-first', false);
    //     $(this).prev().attr('data-last', true);

    //     // console.log('Yesss');
    // }
});

//То до
// function checkFull(currProd) {
//     $('.prod-block .js-status-change').length === currProd.find('.block__box--checked').length);
// }

checkFull();

function openPopup(el, status = "start") {
    var popupParent = el.parents('.prod-block__sizes');
    var popup = status === 'start' ? popupParent.find('.js-start') : popupParent.find('.js-end');

    var elTopPos = $(el).position().top - popup.outerHeight();
    var elLeftPos = $(el).position().left - $(el).outerWidth() - 15;

    popup.addClass('popup--visible').css({
        'top' : elTopPos,
        'left' : elLeftPos
    });
}

function closePopup() {
    var popup = $('.js-start, .js-end');
    popup.removeClass('popup--visible').css({
        'top': 0,
        'left': 0
    });
}


// - След това следват кутийки, които представляват броя поръчани бройки от продукта.
// Те се делят на 2 вида:
// - Сини: ИГНОРИРАЙ
// - Зелени: Броя текущо произведени
//- Тъмни: Броя оставаши за производство

// Всяка първа кутийка от сивите и всяка последна от зелените трябва да има функционалност при клик.
// Първата сива кутийка при клик да излиза попъп с бутон "Започни" и да се оцветява в зелено или жълто
// Последната зелена кутийка трябва да съдържа цифра с общия брой зелени кутийки и при клик да има попъп с бутон "Откажи" и съотвентно да става отново сива, а предната зелена кутийка да има брой зелени кутийки.
// ако има 1 зелена кутийка само и при клик "откажи" трябва да останат само първоначалните сиви кутийки