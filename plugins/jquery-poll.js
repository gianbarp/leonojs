/*!
 *
 * jQuery Poll
 * Version: 1.0.1
 * Original author: Giancarlo Barrientos
 * Fork Author: Juan Farias
 * Support && crowsource: @gianbarp
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

// namespace
/*
var POLL = POLL || {};

// bull configure

!(function(){_ = $ || _;POLL = _.POLL}()); // Underline pattern "_" underscore.js inspired :P

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly. 

;(function($){

  var animation = function($el,speed,easing){

    if ($el.length == 1) {
      
      for (var i = 0, len = $el.children().length; i < len; i++) {
        $el.children().eq(i).animate({'width': $el.children().eq(i).data('value') + '%'},
            speed,
            easing);        
      }
      
    } else {

      for (var i = 0, len = $el.length; i < len; i++) {
        $el.eq(i).children().animate({'width': $el.eq(i).children().data('value') + '%'},
            speed,
            easing);
      }
      
    }
    
  }

	$.fn.extend({
    poll: function (options, reinit){
    
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

          if($item.data('status') != 'closed'){
  
            if(!$.cookie(cook)){

              $item.find('input[type="submit"]').click(function(e){
                  e.preventDefault();

                  var delta = null;
                  var elements = $form.find('input[type="radio"]');

                  if(elements.length > 0){
                      elements.each(function(){
                          if($(this).attr('checked') == 'checked'){
                            delta = $(this).data('delta');
                          }
                      });
                  } else{
                    delta = $(this).data('delta');
                  }

                

                var xhr = $.ajax({
                  type: "POST",
                  url: "http://next.tn.com.ar/services/poll_tv/vote.json",
                  data: '{ "nid":"' + $(this).closest('.poll-widget').data('poll') + '", "delta":"' + delta + '" }',
                  accept: "application/json",
                  contentType: "application/json"
                });
  
                xhr.success(function(data){
  
                  

                  $form.hide();
                  $result.empty();
                  
                  

                  $result.load( config.ajax + action,function(){
                    $result.show()
                           .css('visibility','visible');
                    animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing);    
                  });            
  
                  $.cookie(cook,new Date());
  
                  //$item.data('statandpop').onStart.apply(item);
  
                }); 
  
              });
  
            }else{
    
              $(".header-widgets").slideUp(function(){
                $("#flap").slideDown();
              });

              $form.hide();
              $result.show()
                     .css('visibility','visible');
              animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing);    
  
            }
  
          }else{
  
            $result.show()
                   .css('visibility','visible');
            animation($result.find('.stats'), $item.data('statandpop').speed, $this.data('statandpop').easing);            
  
          }
  
  			});

        }
    });

})(jQuery);
*/

(function($) {
  
  function animation($el, type){
    switch (type){
      case 'multiple':
        for (var i = 0, len = $el.length; i < len; i++) {
          $el.eq(i).children().animate({'width': $el.eq(i).children().data('value') + '%'},
              500);
        }        
        break;
      case 'binary':
        for (var i = 0, len = $el.children().length; i < len; i++) {
          $el.children().eq(i).animate({'width': $el.children().eq(i).data('value') + '%'},
              500);        
        }        
        break;
    }    
  }
  
  function show_result(self, $poll){
    
    switch (self.options.animation){
      
      case 'fixing-place':
        self.$content.animate({height: $poll.find('.result-container').height() },
            500,
            function(){
               self.$content.css('height','auto');
            })
            .find('.loading').fadeOut(500, function(){ animation(self.$content.find('.stats'), self.options.type); });
        break;
      case 'none':
          self.$content.find('.loading').fadeOut(500, function(){ animation(self.$content.find('.stats'), self.options.type); });
        break;
    }
  }
  
  function poll(element, opt){
    //$('#container .poll-widget')
    
    var $poll = $(element),
        cook = JSON.parse($.cookie('tn_poll')),
        self = this;
    
    this.options = opt;
    self.$content = $poll.find('.poll-content').length == 1 ? $poll.find('.poll-content') : $poll;
    
    if ( (cook == null) || (cook[$poll.data('poll')] == undefined) ){
      //show form
      //
      
      $poll.find("input[type='submit']").on('click', function(e){

        e.preventDefault();

        switch (self.options.type){
          case 'multiple':
            if ( $(this).closest('form').find(':checked').length != 1 ){
              return false;
            };
            break;
          case 'binary':
            break;
        }

        $poll.find('.loading').css('display','block');
        
        self.$content.css('height', self.$content.height());  
        $poll.removeClass('poll-open').addClass('poll-closed');
        
        switch (self.options.response){
          case 'html':
            
            var serialized = $(this).serialize(),
                serialized = ( (serialized != '') ? serialized + '&' : '') + "choice=" + $(this).attr("name");
            
            var jqxhr = $.ajax({type: "POST",
                                url: $(this).closest('form').attr('action'),
                                data: serialized,
                                dataType: "html",
                                async: false,
                                cache: false
            });
            
            jqxhr.done(function(data){
              
              self.$content.find('.result-container').remove();           
                          
              self.$content.append(data)
                           .find('form').remove();
              
              show_result(self, $poll);

              if(self.options.after != undefined && typeof self.options.after == 'function'){

                self.options.after();

              }

            });
            
            break;
          
          case 'json':

            var jqxhr = $.ajax({type: "POST",
                                url: $(this).closest('form').attr('action'),
                                data: '{ "nid":"' + $poll.data('poll') + '", "vote":"' + $(this).data('value') + '" }',
                                accept: "application/json",
                                contentType: "application/json"
            }); 
            
            jqxhr.done(function(data){

              self.$content.find('.stat-yes').data('value', data.field_choices[0].percent);
              self.$content.find('.stat-no').data('value', data.field_choices[1].percent);
              
              self.$content.find('.result-a .value').html(data.field_choices[0].percent);
              self.$content.find('.result-b .value').html(data.field_choices[1].percent);
              
              show_result(self, $poll); 

              if(self.options.after != undefined && typeof self.options.after == 'function'){

                self.options.after();

              }            
              
            })
            break;
        }        
        
        jqxhr.fail(function(){ 
          
          self.$content.find('form').remove();
          
          show_result(self, $poll);
          
        });
        
        return false;
      });
      
    } else {
      //show result
      //
      self.$content.css('height', self.$content.height());
      $poll.removeClass('poll-open').addClass('poll-closed').find('form').remove();
      
      show_result(self, $poll);  
    }
    
    $poll.find('.loading').fadeOut(1000);    
    
  }
  
  
  $.fn.poll_widget = function(opt,callback){    

    return this.each(function(){

      opt = $.extend({
            response:'html',
            type:'binary',
            animation: 'fixing-place',
            after: function(){ }
          },
          opt);

      if ($(this).data('status') == '1') {
        new poll(this, opt);
      } else {
        animation($(this).find('.stats'), opt.type);
      }      

    });
    
  };  

}(jQuery));   
