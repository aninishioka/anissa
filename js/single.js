$(document).ready(function() {
  $(".sectionNav").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(section).offset().top
      });
  });

  /*function fadeRight() {

  }

  $('.photoLink').click(function() {
    const content = $(".photoCatgs");
    $(content).
  }) ;*/
  /*$(".photoLink").click(function() {
    $(".photoCatgs").animate(
      {
        opacity: 0,
      },
      400,
      function() {
        $(".photoCatgs").css("display", "none");
      }
    );
  });
  $(".travelLink").click(function() {
    $(".travelPhotos").animate(800, function() {
      $(".travelPhotos").css("display", "flex")
    });
  });
  /*$("#Photos").click(function() {
    $(".hiddenPhotos").css("display", "none");
    $(".photoCatgs").css("display", "flex");
  });*/

});
