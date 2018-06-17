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
  //const left = $(".lrgPhoto").position().left;
  offset = left - photoCatg.position().left;
  $(pseudo).animate({
    left: `+=${offset}`
  }, 1000);
}

//display photo when thumbnail clicked
function display() {
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
    //if at last photo, loop back to first
    if (nextTb.length === 0) {
      nextTb = $(".hover").children(':first').children();
      console.log(nextTb);
    }
  } else {
    nextTb = $(currTb).parent().prev().children(':first');
    //if at first photo, loop back to last
    if (nextTb.length === 0) {
      nextTb = $(".hover").children(':last-child').children()
    }
  }
  nextPhoto = $(nextTb).attr("data-large");
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
  $('.photoCatg').animate({opacity: 0}, 700, 'linear');
  //photoCatgSibs.animate({opacity: 0}, 300);
  $(".pg.photo").css({overflow: "hidden"});

  //$(pseudo).css({opacity: 1});

  /*//remove overlay
  $(photoCatg).children(".photoLink").css({opacity: 0});
  $(photoCatg).children(".photo").css({opacity: 0});*/ //glide transition

  //make pg and content fit window
  $(".content.photo").css({
    overflow: "hidden",
    width: "80%"
  });

  /*$(".galleryWrap").show();
  $(".galleryWrap").css({display: 'flex'}); experimenting*/

  /*//transition pseudo to center
  center(pseudo);*/ //glide transition

  setTimeout(function() {
    //make pseudo transparent and move back to position of photoCatg
    //$(pseudo).css({opacity: 0}); glide transition
    setOverlay();

    //replace photo nav page with gallery
    $(".content.photo").hide();
    $(".galleryWrap").css({display: 'flex'}); //just have it like this from the start!!!!
    $(".galleryWrap").show();
    //$(".galleryWrap").css({opacity: 1});
    $(".galleryWrap").delay(700).animate({opacity: 1}, 700, 'linear');

    //set up for when go back to photo catg page
    /*$(pseudo).css({opacity: 1});
    $(photoCatg).children(".photoLink").css({opacity: 1});
    $(photoCatg).children(".photo").css({opacity: 1});*/  //jk remove bc want to fadein
    $('.photoCatg').css({opacity: 1});

    $('ul.hover').delay(1700).animate({opacity: 1}, 800, 'linear');
    $('ul.hover').delay(1100).animate({opacity: 0}, 700, 'linear');
  }, 1100);
}

//photo gallery back to photoCatg
function transitionBack() {
  $('.galleryWrap').animate({opacity: 0}, 700, 'linear');

  setTimeout(function() {
    $(".content.photo").hide();
    /*$(".content.photo").show();
    $('.photoCatg').animate({opacity: 1}, 700, 'linear');*/
    $('.content.photo').load(document.URL +  ' .content.photo');
    $(".content.photo").show()
  }, 1200);

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

  //back to photoCatg when X clicked
  $('.exit').click(transitionBack);

  //$(".photoLink").click(photoTransition);

  //center photo on window resizes
  /*$(window).on('resize', function() {
    if (!galleryOpen) return;
    else center(currGallery);
  });*/
});
