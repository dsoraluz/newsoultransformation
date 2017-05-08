$(document).ready(()=>{

  $('select').material_select();
  
  $(".button-collapse").sideNav();

  $('#login-modal').modal();
  $('#signup-modal').modal();

  $('.create-account').click(function() {
    $('#login-modal').modal('close');
  });

  $('#invite-button').click(()=>{
    $('#invite-friends-modal').modal('close');
  });

  $('#userMessage').val('(Add a custom message...)');
  $('#userMessage').trigger('autoresize');


//need to debug focus in to no erase content if user has entered something.
  $('#userMessage').focusin(()=>{
    let value = $('#userMessage').val();

    if ($('#userMessage').val() === ''){
      $('#userMessage').val(`${value}`);
    } else {
      $('#userMessage').val('');

    }

  });

  $('#userMessage').focusout(()=>{
    let value = $('#userMessage').val();
    if ($('#userMessage').val() === '' ){
      $('#userMessage').val('(Add a custom message...)');
    } else {
      $('#userMessage').val(`${value}`);
    }
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
