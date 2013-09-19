(function($) {
  
  function get_new_id(prefix){
    return prefix + parseInt(Math.random()*11, 10) + new Date().getTime();
  }
  
  function dgl(element, opt){
    
    this.options = {
      controlNavigation: 'none',
      autoScaleSlider: true, 
      autoScaleSliderWidth: 950,     
      autoScaleSliderHeight: 534,      
      loop: true,
      imageScaleMode: 'fill',
      navigateByClick: true,
      numImagesToPreload:2,
      arrowsNav:true,
      arrowsNavAutoHide: true,
      arrowsNavHideOnTouch: true,
      keyboardNavEnabled: true,
      fadeinLoadedSlide: true,
      globalCaption:true,
      slidesSpacing: 0,
      autoPlay: {
        enabled: false,
        pauseOnHover: true,
        delay: 1000
      }  
    }
    
    if (opt != undefined){
      $.extend(this.options, opt);
    }
    
    var self = this;
    this.$element = $(element);    
    
    this.$element.click(function(e){ self.open(e); });
    //$.extend(this.options.player, this.$element.data('player'));
        
  }
  
  dgl.prototype.open = function(e){
    var self = this;
    e.preventDefault();
    
    var id = get_new_id('gl-');
    
    var images = this.$element.data('images');
    
    var options = $.extend(this.$element.data('op')); 
    
    if (options.node == undefined){
      this.$original = this.$element;
    } else {
      this.$original = this.$element.closest(options.node);
    }
    
    this.$gallery = $('<div id="' + id + '" class="rs-tn royalSlider"></div>');
    
    for (var i = 0, len = images.length; i < len; i++) {
      var caption = (i + 1) +  ' de ' + (len) + ' ' + images[i].caption;
      this.$gallery.append('<img src="' + images[i].image + '" title="' + caption + '" alt="' + caption + '" ' + (images[i].fullscreen != undefined ? 'data-rsbigimg="' + images[i].fullscreen + '"' : null)  + ' class="rsImg" />');
    }
        
    if (images[0].fullscreen != undefined){
      var fullscreen = {
          fullscreen: {
            enabled: true,
            nativeFS: true            
          }
      }  
      this.options = $.extend(this.options, fullscreen);
    }
    
    this.$original.after(this.$gallery);
    this.$original.addClass('hidden');    
    
    this.$gallery.royalSlider(this.options);
    
    this.$gallery.append('<div class="ry-close">x</div>');
    this.$gallery.find('.ry-close').click(function(e){ self.close(e); });
    
  };
  
  dgl.prototype.close = function(e){
    
    e.preventDefault();
    
    var is_fullscreen = $('#'+ this.$gallery.attr('id')).hasClass('rsFullscreen');
    
    if (is_fullscreen == true){
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    
    this.$original.removeClass('hidden');
    this.$gallery.remove();
    
    
  };
  
  $.fn.dgallery = function(opt){
    
    return this.each(function() {
      
      new dgl(this, opt);
      /*
      if ($(this).data('op').autostart == true){
        $(this).trigger('click');
      }
      */
      
    });
    
  };  

}(jQuery));  