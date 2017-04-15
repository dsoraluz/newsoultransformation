$(document).ready(()=>{
  $(".button-collapse").sideNav();

  $('#login-modal').modal();
  $('#signup-modal').modal();

  $('.create-account').click(function() {
    $('#login-modal').modal('close');
  });
});
