(function($){

  var animation = function(el,speed,easing,q){

    for (var i in el) {
      
      if (el.eq(i).children().length == 1) {

        el.eq(i).children().animate({'width': el.eq(i).children().data('value') + '%'},
            speed,
            easing); 

      }else{

        var els = el.eq(i).children();

        for (var j in els) {

          els.eq(j).animate({'width': els.eq(j).data('value') + '%'},
              speed,
              easing);   

        } 
      }
    }

  }

	$.fn.extend({
    statandpop: function (options, reinit){
    
    if (this.length == 0) return this;
    
    var settings = options || {},
        running = (this.data('statandpop')) ? true : false,
        $window = $(window),
        $document = $(document);

    if (typeof settings == 'object') {
    
    	this.data('statandpop', $.extend({
              speed: 1000,
              easing: 'easeInOutQuad',
              onStart: function () {}
          }, settings));
    }

		return this.each(function(index, item){

			var $this = $(this),
          $item = $(item);

      var $form = $this.find('form'),
          $result = $this.find('.result-container'),
          cook = "" + $item.data('poll'),
          action = $form.attr('action');

          if($item.data('poll') != 'closed'){
  
            if(!$.cookie(cook)){
  
              $item.find('input').click(function(e){
  
                e.preventDefault();
  
                var xhr = $.ajax({
                  type: "POST",
                  url: action,
                  data: $form.serialize(),
                  dataType: "html"
                });
  
                xhr.success(function(data){
  
                  $form.hide();
                  $result.empty();
                  
                  $result.load($form,function(){
                    $result.show()
                           .css('visibility','visible');
                    animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing,0);    
                  });            
  
                  $.cookie(cook,new Date());
  
                  //$item.data('statandpop').onStart.apply(item);
  
                }); 
  
              });
  
            }else{
  
              $form.hide();
              $result.show()
                     .css('visibility','visible');
              animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing,0);    
  
            }
  
          }else{
  
            $result.show()
                   .css('visibility','visible');
            animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing,0);            
  
          }
  
  			});

        }
    });

})(jQuery);