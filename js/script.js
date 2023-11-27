$(document).ready(function(){
    $('.carousel_inner').slick({

        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',     
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            }
        ]
        
    });
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
      $(this)
        .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
        .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });
    $('.catalog-item_link').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
        $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      })
    });

    $('.catalog-item_back').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
        $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      })
    });
    
  


    // Modal
      
    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
    });
      $('.modal_close').on('click', function(){
          $('.overlay, #consultation, #thanks, #order').fadeOut();
      });
      $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn();
      });
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal_descr').text($('.catalog-item_subtitel').eq(i).text);
          $('.overlay, #order').fadeIn();
        });
      });
    
  
  function validateForms(form){
      $(form).validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true 
          }
        },
        messages: {
          name: 'Пожалуйста, введите ваше имя',
          phone: 'Пожалуйста, введите ваш номер телефона',
          email: {
            required: 'Пожалуйста, введите ваш адрес электронной почты',
            email: 'Пожалуйста, введите корректный адрес электронной почты'
          }
        }
      });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-9999");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});


// //page up

// $(window).scroll(function (event) {
//   var top = $(window).scrollTop();
//    if(top >= 1600){
//    $('pageUp').fadeIn();
//    } else {
//     $('pageUp').fadeOut();
//    }
// });

new WOW().init();


});