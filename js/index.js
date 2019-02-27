//display photo when thumbnail clicked
function display() {
  const newPhoto = $(this).attr("data-large");
  $("img.lrgPhoto").css({"opacity": "0"});
  $("img.lrgPhoto").attr({"src": newPhoto});
  $("img.lrgPhoto").css({"opacity": "1"});
}

function seqDisplay(dir, gallery) {
  var photo = $(`img.lrgPhoto[data-catg='${gallery}']`).attr('src');
  photo = photo.replace('assets/', '');
  currTb = $(`img.tb[src="thumbnails/${photo}"]`);
  var nextTb;
  var nextPhoto;
  if (dir == 39 || $(dir).attr('data-dir') == 'next') {
    nextTb = $(currTb).parent().next().children(':first');
    //if at last photo, loop back to first
    if (nextTb.length === 0) {
      nextTb = $(`.hover[data-catg='${gallery}']`).children(':first').children();
    }
  } else {
    nextTb = $(currTb).parent().prev().children(':first');
    //if at first photo, loop back to last
    if (nextTb.length === 0) {
      nextTb = $(`.hover[data-catg='${gallery}']`).children(':last-child').children()
    }
  }
  nextPhoto = $(nextTb).attr("data-large");
  $(`img.lrgPhoto[data-catg='${gallery}']`).css({"opacity": "0"});
  $(`img.lrgPhoto[data-catg='${gallery}']`).attr({"src": nextPhoto});
  $(`img.lrgPhoto[data-catg='${gallery}']`).css({"opacity": "1"});
}

//transition between photo pages
function photoTransition(photoLink) {
  const photoCatg = $(photoLink).parent();
  const catgName = $(photoCatg).attr('data-catg');
  const currGallery = $(`.galleryWrap[data-catg='${catgName}']`);
  const currPhoto = $(`.hover[data-catg='${catgName}']`).children(':first').children().attr('data-large');

  //isolate chosen category
  $('.photoCatg').animate({opacity: 0}, 700, 'linear');

  setTimeout(function() {
    //replace photo nav page with gallery
    $("#photoContent").hide();
    $(`img.lrgPhoto[data-catg='${catgName}']`).attr({"src": currPhoto});
    $(currGallery).css({display: 'flex'});
    $(currGallery).show();
    $(currGallery).delay(700).animate({opacity: 1}, 700, 'linear');
  }, 1100);
}

//photo gallery back to photoCatg
function transitionBack() {
  $('.galleryWrap').animate({opacity: 0}, 700, 'linear');

  setTimeout(function() {
    $(".galleryWrap").hide();
    $("#photoContent").show();
    $('.photoCatg').animate({opacity: 1}, 700, 'linear');
    $("#photoContent").show();
  }, 1200);

}

//make thumbnail nav appear
var navVisible;
function tbNavOn() {
  $('.hover').css({
    opacity: '1',
    'z-index': '20'
  });
  $('.hoverToggle.button').css({opacity: 0});
  navVisible = true;
}

function tbNavOff() {
  $('.hover').css({
    opacity: 0,
    'z-index': '5'
  });
  $('.hoverToggle.button').css({opacity: 1});
  navVisible = false;
}

//clear form
function resetform($form) {
  $('input, textarea').css({opacity: 0});
  $form.find('input:text, textarea').val('');

  $('.thanks').css({opacity: 1});

  setTimeout(function() {
    $('.thanks').animate({opacity: 0}, 300, 'linear');
    $('input, textarea').animate({opacity: 1}, 700, 'linear');
  }, 1000);
}


$(document).ready(function() {

  //scroll to section
  $(".sectionNav").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(section).offset().top
      });
  });

  //photo category link transition
  var currGallery;
  $(".photoLink").click(function() {
    galleryOpen = true;
    let photoCatg = $(this).parent();
    currGallery = $(photoCatg).attr('data-catg');
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
    seqDisplay(key, currGallery);
  });

  //display photo with next/prev buttons
  $('.clickNav').click(function() {
    seqDisplay(this, currGallery);
  });

  //back to photoCatg when X clicked
  $('.exit').click(transitionBack);

  //toggle thumbnail nav
  $('.hoverToggle.button').click(tbNavOn);
  $('.tbNavWrap').mouseleave(function() {
    console.log(navVisible);
    if (!navVisible) {
      return;
    }
    tbNavOff();
  });

  //send message form to firebase
  const fs = firebase.firestore();

  const settings = {timestampsInSnapshots: true};
  fs.settings(settings);

  $form = $('form[name=contact]');

  $form.submit(function(e) {
    e.preventDefault();
    var n = $('input[name=name]').val();
    var em = $('input[name=email]').val();
    var m = $('textarea[name=message]').val();

    fs.collection("messages").add({
      name: `${n}`,
      email: `${em}`,
      msg: `${m}`
    })
    .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    fs.collection("messages").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
    });

    resetform($form);
  });



});
