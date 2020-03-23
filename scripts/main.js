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
    if ($(this).is('#tailor')) {
        $('.prod-block').addClass('prod-block--tailor');
    }
    else {
        $('.prod-block').removeClass('prod-block--tailor');
    }
});

var $firstNotSelected;
var $notSelected = $('.prod-block__counter');

$notSelected.each(function() {
    var $currentBlockSizes = $(this).find('.js-status-change:not(.prod-block__box--started)');

    $currentBlockSizes.each(function() {
        // console.log($(this).first());
        $(this).first().on('click', function () {
            // console.log($(this));
            $(this).find('.popup').toggleClass('popup--visible');

            // $(this).addClass('prod-block__box--started');
        });

        return false;
    });
});


$('.prod-block__counter .js-status-change').on('click', function(e) {
    console.log($(this).index());
    // console.log('dsadasd');
    // e.stopImmediatePropagation();
    $(this).find('.popup').toggleClass('popup--visible');
    console.log('test');
})

$('.js-status-start').on('click', function() {
    var counter = 0;
    
    $(this).parents('.js-status-change').addClass('prod-block__box--started');

    counter = $(this).parents(".prod-block__counter").find(".prod-block__box--started").length;

    $(this)
        .parents(".prod-block__counter")
        .find(".prod-block__box--started")
        .last()
        .text(counter);


});


// - След това следват кутийки, които представляват броя поръчани бройки от продукта.
// Те се делят на 2 вида:
// - Сини: ИГНОРИРАЙ
// - Зелени: Броя текущо произведени
//- Тъмни: Броя оставаши за производство

// Всяка първа кутийка от сивите и всяка последна от зелените трябва да има функционалност при клик.
// Първата сива кутийка при клик да излиза попъп с бутон "Започни" и да се оцветява в зелено или жълто
// Последната зелена кутийка трябва да съдържа цифра с общия брой зелени кутийки и при клик да има попъп с бутон "Откажи" и съотвентно да става отново сива, а предната зелена кутийка да има брой зелени кутийки.
// ако има 1 зелена кутийка само и при клик "откажи" трябва да останат само първоначалните сиви кутийки