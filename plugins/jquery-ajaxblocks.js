$.fn.ajaxBlocks = function(options, callback) {
  /*
  if ( ($('body').hasClass('logged-in') == false)){
    return false;
  }
  */
  if(!$.cookie('tns01')){ return false; }  
  
  var $element = $(this);
  
  //$element.html('').addClass('processing');
  
  $.ajax({type: "GET",
          url: $element.data('url'),
          dataType: "html",
          async: true,
          cache: true,

          success: function(data) {
            if (data == null){
              return false;
            }
            $element.find('.loading').fadeOut('slow');
            $element.html(data);
            
            if (typeof callback == 'function' && callback != undefined) { // make sure the callback is a function
              callback.call(arguments,this); // brings the scope to the callback
            }            
            
          },

          error: function(jqXHR, textStatus, errorThrown) {
            //
          }
 });

};