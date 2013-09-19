/*!
 *
 * jQuery Controller
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
@module Controller
**/

"use stricts";

function Clazz(clazz)
{
    var F = function() {};
    F.prototype = clazz;
    return new F();
};

/**
 * @class KonamiCode
 * @constructor
 */

function KonamiCode(){ }

  /**
  @method define
  @return {Bollean} key
  @param key {Number} e.which
  @param shorthand {String} keyboard  
  **/

KonamiCode.prototype.wizzard = function(key,shorthand){

var isShift = false;

window.onkeydown = function(e){

    //if(e.which == 16) isShift = true;
    if(e.which == key /*&& isShift == true*/){
        (typeof shorthand == 'function') ? shorthand.apply(self,arguments) : false;
         //isShift = false;
         return false;
    }

  }

}

KonamiCode.prototype.keyboardControl = function(o) {

  switch(o.type){

    case 'length':

          o.counter = o.counter || "counter";

          $("#" + $(o.selector.split(' ')[0]).attr('id') + ' textarea').bind('keypress keyup',function(e){

            e.stopPropagation();

            if($(this).val().length > o.max){

              $(this).parent().find('input[type=submit]').attr('disabled','disabled');
              e.preventDefault();

            }else{

              $("#" + $(o.selector.split(' ')[0]).attr('id') + " #" + o.counter).html($(this).val().length);
              $(this).parent().find('input[type=submit]').removeAttr('disabled');

            }

          });

    break;

  }
  

};

KonamiCode.prototype.reset = function(){
  
  $(".counter").html(0);
  $(".edit-comment").attr('value','');

}

/**
 * @class Storage
 * @constructor
 * @extends Prototype
 */

function Storage(key,json,min,callback)
{
  if(!(this instanceof Storage)){
    return new Storage().init(key,json,min,callback);
  }
}

extend(Storage, TN.app);

  /**
  @method init
  @return {Array} list
  @param key {String}
  @param json {String} file
  @param min {Number} minute
  @param callback {Object}
  **/

Storage.prototype.init = function(key,json,min,callback)
{
  
  var Store = new Storage();

  

  if(!store.get(key)){

    

    if(typeof json == 'object'){
      
      Store.dbApp(key,json,min);
      callback(json);
    
    }else{

      this.getJson(json,function(xh){

          Store.dbApp(key,xh,min);
          callback(xh);
      
      });

    }

  }else if(this.dbAppTimestamp(key) == true){
    
    
    
    callback(store.get(key));
  
  }else if(this.dbAppTimestamp(key) == false){

    

    if(typeof json == 'object'){
      
      Store.dbApp(key,json,min);
      callback(json);
    
    }else{

      this.getJson(json,function(xh){

          Store.dbApp(key,xh,min);
          callback(xh);

      });

    }

  }

}

/**
 * @class ConnectionAware
 * @constructor
 */

function ConnectionAware(el,min)
{
  if (!(this instanceof ConnectionAware)){
    return new ConnectionAware().init(el,min);
  }
}

  /**
  @method init
  @return {Object}
  @param el {String} selector
  @param min {Number} Date
  **/

ConnectionAware.prototype.init = function(el,min)
{

  var lengthel = el.length,
      multi = 60*60*1000,
      expirationMIN = min*60*1000
      last = store.get('lastConnection');

  for(var i = 0; i < lengthel; i++){

    var now = Helpers._timestampConvert(el.eq(i).attr('data-timestamp'),'t');

    if(((now - multi) + expirationMIN) > (new Date(last) - multi)){

    el.eq(i).css({
      'background':'yellow'
    });

    }else{

      el.eq(i).css({
        'background':'blue'
      });

    }

  }

}

/**
 * @class Dax
 * @constructor
 */

function Dax()
{
  if (!(this instanceof Dax)){
    return new Dax().init();
  }
}

  /**
  @method init
  @return {Object}
  **/

Dax.prototype.init = function()
{

  var colection = new Colections();

  udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2&c2=6906409&ns_site=tn&name='+ location.pathname.split('/')[1] +'.notas');

}


/**
 * @class Gajax
 * @constructor
 */

function Gajax()
{
  if (!(this instanceof Gajax)){
    return new Gajax().init('_trackPageview');
  }
}

  /**
  @method init
  @return {Object}
  @param type {String} type of tracking
  **/

Gajax.prototype.init = function(type)
{

  var links = $("#scrollbar-sticky article .url, #pager-buttons .button"),
      ajaxActionContainer = $("#storage-content"),
      ajaxLoading = $("<div></div>").attr('id','ajax-loading-content'),
      urlDiff = links.attr('href');

   if(typeof _gaq == 'object'){
    _gaq.push(['_trackPageview', urlDiff]);
   }

  if(!!links.length){

    /*links.parent().find('li:eq(0)').remove();*/

    return new Gajax().actions({
      
      links: links,
      ajaxActionContainer: ajaxActionContainer,
      ajaxLoading: ajaxLoading,
      type: type
    
    });

  }

}

  /**
  @method actions
  @return {Bollean} True or false status
  @param adjust {String} options class
  **/

Gajax.prototype.actions = function(adjust)
{

  adjust.links.live('click',function(tn){

    tn.preventDefault();

      pageUrl = $(this).attr('href');

      if($(this).data('trigger') == true && !$.browser.msie){

        $('body,html').animate({
          scrollTop: $("#header").offset().top
         }, 400);

        adjust.ajaxActionContainer.fadeTo("fast", 0,function(){
          
        adjust.ajaxActionContainer.empty()
                                  .fadeTo("fast", 1)
                                  .html(adjust.ajaxLoading);

         

        $.ajax({

            url:pageUrl,
            success: function(data){
              adjust.ajaxActionContainer.fadeTo("slow", 1, function(){

                var colection = new Colections();

                

                if(typeof _gaq == 'object'){
                  _gaq.push(['_trackPageview', pageUrl]);
                }

                if(typeof udm_ == 'function'){
                  udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2&c2=6906409&ns_site=tn&name=' + colection.getTrackName(colection.cut(location.pathname.split('/'),1,2),'notas'));
                }

                  

                  adjust.ajaxActionContainer.fadeTo("fast", 0)
                                            .empty();

                  adjust.ajaxActionContainer.fadeTo("fast",1,function(){
                      adjust.ajaxActionContainer.html($(data).find('#storage-content').html());
                  });

                });
              },

              complete: function(){

                new Auth().tracking('pop-action-auth');

                var commentAppReload = new CommentApp();

                setTimeout(function(){

                  $('img.lzl').each(function(){
                    $(this).attr('src',$(this).data('original'));
                 });

                  $('#storage-content .dplayer').dplayer();
                  $('#storage-content .dgallery').dgallery();

                  new PollDOM().note();
                  //new StickyDOM().note();
                  
                  Reactions();
                  
                  Helpers.nota.stickyBannerHeightEvilFixed();
                  
                  commentAppReload.pagination(commentAppReload.total());

                    new CommentApp([ 
                                    'reply',
                                    'report', 
                                    'keyboard', 
                                    'pagination', 
                                    'arrows' 
                                   ]);

                    commentAppReload.disconnectTest();


                },4000);

              }
          });

        });

        if(pageUrl != window.location){
          window.history.pushState({path:pageUrl},'',pageUrl);
        }

        return false;

      }else{

        var colection = new Colections();

        

        if(typeof _gaq == 'object'){
          _gaq.push(['_trackPageview', pageUrl]);
        }

        if(typeof udm_ == 'function'){
          udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2&c2=6906409&ns_site=tn&name=' + colection.getTrackName(colection.cut(location.pathname.split('/'),1,2),'notas'));
        }

        

      }

    });

}

/**
 * @class Reactions
 * @constructor
 */

function Reactions(){
  if(!(this instanceof Reactions)){
    return new Reactions().stats();
  }
};

Reactions.prototype.stats = function(){

  function toggle($element){
    if ($element.data('html') == null) {
      $element.data('html', $element.html());
      $element.html('<span class="loading"></span>');
    } else {
      $element.html($element.data('html'));
      $element.data('html', null);      
    }
  }

  $('#votes .button').live('click',function(ev) {

    ev.stopPropagation();

    
    $.post(transport.drop($(this).closest('section').attr('id')));

    if (!$.cookie('tns01')) {     

      var h = $(this).attr('href');

      $.auto("ajax",config.ajax + $(this).data('href') + '.html', function(){

        setTimeout(function(){
          $("#destination").attr('href',$("#destination").attr('href') + location.pathname);
        },400);

      });

      $('#boxContent .link a:eq(0)').attr('href', h + '/facebook');
      $('#boxContent .link a:eq(1)').attr('href', h + '/twitter');
      $('#boxContent .link a:eq(2)').attr('href', h + '/tn');
      
      return false;

    }
    
    var $this = $(this);

    if ($('#main-news .photo').length != 0){

      var $media = new Object();
      $media.type = 'image';
      $media.src = $('#news .photo').attr('src');
      $media.href = window.location.href;

    }
    
    $.ajax($this.attr('href'),{
      async: true,
      cache: true,
      dataType: 'html',
      beforeSend: function(a, b) { toggle($this); },
      complete: function(a, b) { toggle($this); },
      error: function(xhr, ajaxOptions, thrownError){ 
        
        
      
      },
      success: function(data, status, xhr) {

        if(store.get('note-poll_social')){
          transport.forEachPost(store.get('note-poll_social'));
        }

        $('.poll').empty()
                   .html(data);

        toggle($this);

        //transport.forEach($.post(transport.drop()));
        
        if(!$.cookie('reactions')){

          facebookAPI({ message: $this.data('text'),
              attachment:{
              name: $('#main-news .entry-title').html(),
              description: $('#main-news .drop-line').html(),
              href: window.location.href,
              media: ($media)?[$media]:null
              }
            }).publish();
            
          $.cookie('reactions', new Date(), {'expires': 1, 'path': '/', 'secure': false});

        };
        
      }});

    return false;
  
  });

}

/**
 * @class Sliding
 * @constructor
 */

function Sliding()
{
  if (!(this instanceof Sliding)){
    return new Sliding().init();
  }
};

  /**
  @method init
  @return {Object} Object with json notation (arguments)
  **/

Sliding.prototype.init = function()
{

  return new this.swiping({
      
      slidingNav: $(".action-sliding-nav"),
      slidingNavContainer: $("#sliding-nav"),
      slidingNavContent: $("#sliding-fx-content"),
      navBarFixedTop: $(".nav-bar-fixed-top"),
      slidingSidebarNews: $("#sticky-sidebar"),
      SlidingActionQUO: $("#sliding-fx-content")
    
    }); 

}

  /**
  @method swiping
  @return {Object}
  @param adjust {String} options
  **/

Sliding.prototype.swiping = function(adjust)
{

  adjust.slidingNav.toggle(function(tn){

    tn.preventDefault();

    $("body").css('padding',0);

    adjust.slidingNavContainer.animate({ 'marginLeft':0 });
    adjust.slidingNavContent.animate({ 'marginLeft':'210px' });

    if(!adjust.navBarFixedTop.hasClass('noFixedClass') && !adjust.slidingSidebarNews.hasClass('noFixedClass')){
      adjust.navBarFixedTop.addClass('noFixedClass');
      adjust.slidingSidebarNews.addClass('noFixedClass');
    }

    adjust.SlidingActionQUO.addClass('quo-status-active-swipeleft');

    $(this).removeClass()
           .addClass('slidingOpen');

  },function(){

      return new Sliding().toBack({

        slidingNav: adjust.slidingNav,
        navBarFixedTop: adjust.navBarFixedTop,
        slidingSidebarNews: adjust.slidingSidebarNews,
        slidingNavContainer: adjust.slidingNavContainer,
        slidingNavContent: adjust.slidingNavContent

      });

  });

}

  /**
  @method toBack
  @return {Number} position
  @param o {String} options
  **/

Sliding.prototype.toBack = function(o)
{

  o.slidingNav.removeClass()
                   .addClass('action-sliding-nav');

  if(o.navBarFixedTop.hasClass('noFixedClass') && o.slidingSidebarNews.hasClass('noFixedClass')){

    setTimeout(function(){
      o.navBarFixedTop.removeClass('noFixedClass');
      $("body").css('paddingTop','60px');
    },400);

    o.slidingSidebarNews.removeClass('noFixedClass');   
  }

  o.slidingNavContainer.animate({ 'marginLeft':'-210px' });
  o.slidingNavContent.animate({ 'marginLeft':0 });

}

/**
 * @class Gesture
 * @constructor
 */

function Gesture()
{
  if (!(this instanceof Gesture)){
    return new Gesture().init();
  }
}

  /**
  @method init
  @return {Object} hand gesture
  **/

Gesture.prototype.init = function()
{

  $$('.quo-status-active-swipeleft').swiping(function(){

    $("#sliding-fx-content").removeClass('quo-status-active-swipeleft');

      return new Sliding().toBack({

        slidingNav: $(".action-sliding-nav"),
        navBarFixedTop: $(".nav-bar-fixed-top"),
        slidingSidebarNews: $("#sticky-sidebar"),
        slidingNavContainer: $("#sliding-nav"),
        slidingNavContent: $("#sliding-fx-content")

      });
  
  });

}

function Colections(){ };

Colections.prototype.cut = function(arr,start,end){
    var aux = [];
    for(var i = start; i<arr.length;i++){
      if(i < arr.length - end){
        aux.push(arr[i]);
      }
    }
      return aux;
};

Colections.prototype.getTrackName = function(arr,type){
    var aux = '';
    for(var i = 0; i<arr.length;i++){
        aux += arr[i] + '.' 
    }
      return aux + type;
};