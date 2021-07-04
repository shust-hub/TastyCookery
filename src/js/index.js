import '../scss/index.scss'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

$(function() {
  // Owl Carousel
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    margin: 5,
    loop: true,
    items: 1,
    responsive: {
      0 : {
        items: 1
      },
      600: {
        items: 2
      }
    }
  });

    var testimonial = $(".testimonial-carousel");
    testimonial.owlCarousel({
      margin: 5,
      loop: true,
      items: 2,
      responsive: {
        0 : {
          items: 1
        },
        768 : {
          items: 2
        }
      }
    });
  });

$(document).ready(function() {
//Плавный скроллинг
$('.scrolltoForm').on('click', function() {
  let href = $(this).attr('href');
  $('html, body').animate({
      scrollTop: $(href).offset().top
  }, {
      duration: 370,   
      easing: "linear"  
  });

  return false;
});

//Форма отправки
$("#contactUs").submit(function(){ 
  let form = $(this); 
  let error = false; 
  form.find('input, textarea').each( function(){ 
    let email = $(".form__input").val();
    if (email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1) {
      form.find('.form__err').html("Указан некорректный адрес") 
      error = true;
    }
  });
  if (!error) {
    let data = form.serialize(); 
    $.ajax({
       type: 'POST', 
       url: 'gogogo.php', 
       dataType: 'json', 
       data: data, 
         beforeSend: function(data) { 
              form.find('input[type="submit"]').attr('disabled', 'disabled'); 
            },
         success: function(data){ 
             if (data['error']) { 
              form.find('.form__err').html(data['error']); 
             } else { 
               $('.form__result').html("<p>Спасибо! <br> Мы отправили вам письмо!</p>") 
             }
           },
         error: function (xhr, ajaxOptions, thrownError) { 
          form.find('.form__err').html(xhr.status + ":" + thrownError); 
           },
         complete: function(data) { 
              form.find('input[type="submit"]').prop('disabled', false); 
           }  
         });
  }
  return false; 
});
});
