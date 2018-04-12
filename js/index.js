$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    items: 3,
    loop: true,
    nav: true
  });
  var showAsScroll = $(".photo")
  var showAsScrollPos = showAsScroll.position();
  $(window).scroll(function () {
    var windowPos = $(window).scrollTop();
    if (windowPos >= pos.top - 100) {
      div.addClass("AfterScroll");
    } else {
      s.removeClass("AfterScroll");
    }
  });
});
