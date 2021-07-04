
  /*
  $(document).ready(function(){
    $('a[href^="#"]').on('click',function (e){
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      
      //scroll con hash
      $('html, body').animate({
        'scrollTop': $target.offset().top
      }, 1000, 'swing', function(){
        window.location.hash = target;
      });
      
     /* //scroll sin hash
      $('html, body').animte({
        'scrollTop': $targer.offset().top
        }, 1000, 'swing');
    });
  });*/