function setOverlay() {
  //set overlay width to same as img width
  var travWidth = $("img.travel").width();
  $(".overlay.travel").css({width: travWidth+"px"});
  var conWidth = $("img.concert").width();
  $(".overlay.concert").css({width: conWidth+"px"});
  var pplWidth = $("img.people").width();
  $(".overlay.people").css({width: pplWidth+"px"});

  //align overlay with img
  var travPos = $("img.travel").position().left;
  $(".overlay.travel").css({left: travPos+"px"});
  $(".pseudo.travel").css({left: travPos+"px"});
  var conPos = $("img.concert").position().left;
  $(".pseudo.travel").css({left: conPos+"px"});
  var pplPos = $("img.people").position().left;
  $(".pseudo.people").css({left: pplPos+"px"});
}

//center element (from stackoverflow's tony l.)
function center(pseudo) {
  photoCatg = $(pseudo).parent();
  const left = Math.max(0, ($(".photo.content").innerWidth() - photoCatg.width()) / 2);
  offset = left - photoCatg.position().left;
  $(pseudo).animate({
    left: `+=${offset}`
  }, 900);
}

//display photo when thumbnail clicked
function display(key) {
  const newPhoto = $(this).attr("data-large");
  $("img.lrgPhoto").css({"opacity": "0"});
  $("img.lrgPhoto").attr({"src": newPhoto});
  $("img.lrgPhoto").css({"opacity": "1"});
  //animate({opacity: 1});
}

function keyDisplay(key) {
  var photo = $('img.lrgPhoto').attr('src');
  photo = photo.replace('assets/', '');
  currTb = $(`img[src="thumbnails/${photo}"]`);
  var nextTb;
  var nextPhoto;
  if (key == 39) {
    nextTb = $(currTb).parent().next().children(':first');
    nextPhoto = $(nextTb).attr("data-large");
  } else {
    nextTb = $(currTb).parent().prev().children(':first');
    nextPhoto = $(nextTb).attr("data-large");
  }
  $("img.lrgPhoto").css({"opacity": "0"});
  $("img.lrgPhoto").attr({"src": nextPhoto});
  $("img.lrgPhoto").css({"opacity": "1"});
}

//transition between photo pages
function photoTransition(photoLink) {
  const photoCatg = $(photoLink).parent();
  const photoCatgSibs = $(photoCatg).siblings();
  const pseudo = $(photoLink).siblings(".pseudo");

  //isolate chosen category
  photoCatgSibs.animate({opacity: 0}, 300);
  $(".pg.photo").css({overflow: "hidden"});

  $(pseudo).css({opacity: 1});

  //remove overlay
  $(photoCatg).children(".photoLink").css({opacity: 0});
  $(photoCatg).children(".photo").css({opacity: 0});

  //make pg and content fit window
  $(".content.photo").css({
    overflow: "hidden",
    width: "80%"
  });

  //transition pseudo to center
  center(pseudo);

  setTimeout(function() {
    //make pseudo transparent and move back to position of photoCatg
    $(pseudo).css({opacity: 0});
    setOverlay();

    //replace photo nav page with gallery
    $(".content.photo").hide();
    $(".galleryWrap").css({display: 'flex'});
    $(".galleryWrap").show();

    //set up for when go back to photo catg page
    $(pseudo).css({opacity: 1});
    $(photoCatg).children(".photoLink").css({opacity: 1});
    $(photoCatg).children(".photo").css({opacity: 1});
  }, 1000);
}

$(document).ready(function() {
  //align overlay on load
  setOverlay();
  //align and resize overlay when window resizes
  $(window).on('resize', setOverlay);

  //scroll to section
  $(".sectionNav").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(section).offset().top
      });
  });

  //photo category link transition
  var galleryOpen = false;
  var currGallery;
  $(".photoLink").click(function() {
    galleryOpen = true;
    let photoCatg = $(this).parent();
    currGallery = $(photoCatg);
    //photoTransition(photoCatg);
    photoTransition(this);
  });

  //display photo when thumbnail clicked
  $("img.tb").click(display);

  //display photo with arrow keypresses
  $(window).keyup(function(e) {
    const key = e.which || e.keyCode;
    if (!(key == 37 ^ key == 39)) {
      return;
    }
    keyDisplay(key);
  });

  //$(".photoLink").click(photoTransition);

  //center photo on window resizes
  /*$(window).on('resize', function() {
    if (!galleryOpen) return;
    else center(currGallery);
  });*/
});
