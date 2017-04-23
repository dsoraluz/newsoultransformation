$(document).ready(()=>{
  $(".button-collapse").sideNav();

  $('#login-modal').modal();
  $('#signup-modal').modal();

  $('.create-account').click(function() {
    $('#login-modal').modal('close');
  });

  // $('.login-existing').click(function() {
  //   $('#signup-modal').modal('close');
  // });

  $('.parallax').parallax();

  $('.carousel.carousel-slider').carousel({fullWidth: true});

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
        }
      });
    });

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // $('a[href=#modal]').click(()=>{
  //   $('.modal1').modal('open');
  // });

//   $('.datepicker').pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 15 // Creates a dropdown of 15 years to control year
// });


});
