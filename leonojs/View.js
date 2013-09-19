//var istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));

/*!
 *
 * jQuery View
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

var route = new Route('data-page');

/**
 * @class StickyDOM
 * @constructor
 * @extends Prototype
 */

function StickyDOM(){ }

/**
 @method home
 **/

StickyDOM.prototype.home = function()
{

    if(TN.UA.desktop){

        if($("#scrollbar-sticky-action").length != 0){

            $("#scrollbar-sticky-action").stickier({
                top: parseInt($("#menu-sections").height()) + 10,
                bottomLimiter: $(".aside-main").next(), // stop $(document).height() - $("#ranking-ml").offset().top || +(60)
                noContainer: true,
                responsive: true,
                ezequielLimiter: 30,
                onStart: function(){
                    $(".home-flow, .wrapper-sticky").css('height','auto');
                } // by QA ninja
            });

        }

        if($("#300x600x2").length != 0){

            $("#300x600x2").stickier({
                top: 31, // start $("#menu-sections").height() || -(15)
                bottomLimiter: $("#ranking-ml .wrapper"), // stop $(document).height() - $("#ranking-populares").offset().top || +(40)
                noContainer: true,
                responsive: true, // responsive
                ezequielLimiter: 46 // by QA ninja
            });

        } 

  }

}

/**
 @method note
 **/

StickyDOM.prototype.note = function()
{

    //var limitWrapperIn = $(document).height() - $("#stopin").offset().top - ($(".main-content").height() - $("#stickier-wrapper-in").height());

    if(TN.UA.desktop){

        setTimeout(function(){

            $("#last-news").stickier({
                top: parseInt($("#menu-sections").height()) + 10,
                bottomLimiter: $("#stopin"), // stop $(document).height() - $("#ranking-ml").offset().top || +(60)
                noContainer: true,
                responsive: true,
                ezequielLimiter: 38 // by QA ninja
            });

            $("#content-top").stickier({
                top:parseInt($("#menu-sections").height()),
                bottomLimiter: $("#stopin"),
                noContainer: true,
                responsive: true,
                ezequielLimiter: 5 // by QA ninja
            });

            Helpers.nota.stickyBannerHeightEvilFixed();

        },500);

 }

}

/**
 @method customeview
 **/

StickyDOM.prototype.customeview = function(element,top,limit)
{

  if(TN.UA.desktop){

    if($(element).length != 0){

        $(element).stickier({
            top: parseInt($(top).height()) + 10,
            bottomLimiter: $(limit), // stop $(document).height() - $("#ranking-ml").offset().top || +(60)
            noContainer: true,
            responsive: true,
            ezequielLimiter: 45 // by QA ninja
        });

    }
 
   }

}

/**
 @method billboard
 **/

StickyDOM.prototype.billboard = function()
{

//var limitWrapperIn = $(document).height() - $("#stopin").offset().top - ($(".main-content").height() - $("#stickier-wrapper-in").height());

  if(TN.UA.desktop){

    setTimeout(function(){

        $("#last-news").stickier({
            top: 46,
            bottomLimiter: $("#stopin"), // stop $(document).height() - $("#ranking-ml").offset().top || +(60)
            noContainer: true,
            responsive: true,
            ezequielLimiter: 38 // by QA ninja
        });

        $("#billboard-sticky").stickier({
            top:46,
            bottomLimiter: $("#stopin"),
            noContainer: true,
            responsive: true,
            ezequielLimiter: 5 // by QA ninja
        });

    },80);

 }

}

/**
 * @class Nav
 * @constructor
 * @extends Prototype
 */

function Nav(){
    if(!(this instanceof Nav)){
        return new Nav().init();
    }
}

/**
 @method ever
 **/

Nav.prototype.init = function()
{

    if (!TN.UA.desktop) {return false;}
  
    $("ul#sections-menu > li[data-name],ul.social-menu > li[data-name]").live('mouseenter',function(e){

        e.preventDefault();

        if(!$("ul#sections-menu, ul.social-menu").hasClass('timerActiv')){

            $.data(this, 'timer', setTimeout(function(self) {

                $(self).find('section').stop(true,true).show().css({ 'z-index':9999999, 'visibility':'visible', 'opacity':1 });

                $("ul#sections-menu, ul.social-menu").addClass('timerActiv');

                $(self).find('.title-item').addClass('shot-title-item');

            }, 2000, this));

        }else{

            $(this).find('section').stop(true,true).show().css({ 'z-index':9999999, 'visibility':'visible', 'opacity':1 });
            $(this).find('.title-item').addClass('shot-title-item');

        }

    }).live('mouseleave',function(){

            clearTimeout($.data(this, 'timer'));
            $(this).find('section').stop(true,true).show().css({ 'z-index':-9999999 });
            $(this).find('.title-item').removeClass('shot-title-item');

        });

    $("#menu-sections, #sections-menu").live('mouseleave',function(){
        $("ul#sections-menu, ul.social-menu").removeClass('timerActiv');
        $(".sub-menu").find("section").hide();
        $(".sub-menu").hide();
        $("ul#sections-menu > li[data-name], ul.social-menu > li[data-name]").find('section').hide().css({ 'visibility':'visible', 'opacity':0 });

    });

}

Nav.prototype.swipe = function()
{
    // the code goes here :)

    $('#container').on('click touchstart', function(e){
      
        if (window.innerWidth > 980) {
          return true;
        }
      
        if (e.originalEvent == undefined) {return false}

        var $self = $(this);
        var oe = e.originalEvent;

        if (e.type == 'touchstart'){

            oe = oe.touches[0] || oe.changedTouches[0];
        }

        if (oe.pageX <= $self.find('.bg').width()) {
            // tab inside bg
            if ($self.data('status') == 'closed'){
                $self.data('status', 'opened').toggleClass('opened closed');
            }else{
                return;
            }

        } else {
            // tab in content
            if ($self.data('status') == 'closed'){
                return;
            }else{
                $self.data('status', 'closed').toggleClass('opened closed');
            }
        }

        e.preventDefault();
        return false;
    });

    $(window).on('resize', function(){
      if (window.innerWidth > 980) {
        $('#container').data('status', 'closed').removeClass('opened').addClass('closed');
      }
    });


    $('#toggle-comments').on('touchstart click', function(e){
        var $self = $(this),
            $section = $self.closest('section');

        if ($section.is(':animated')){
            return false;
        }

        if ($section.data('status') == 'closed'){
            var curHeight = $section.height(),
                autoHeight = $section.css('height', 'auto').height();

            $section.height(curHeight).animate({height: autoHeight}, 1000, function(){
                $self.find('.text').html('Ocultar comentarios');
                $section.data('status', 'opened');
                $section.css('height', 'auto')
            });

        } else {
            $section.animate({height: $self.height()}, 1000, function(){
                $self.find('.text').html('Ver comentarios');
                $section.data('status', 'closed');
            });
        }

    });

}

/**
 * @class ScrollDOM
 * @constructor
 * @extends Prototype
 */

function ScrollDOM(){ }

/**
 @method home
 **/

ScrollDOM.prototype.home = function()
{

    if( ($('.slider-wrap-tnylg, .slider-wrap-tnvideos').length == 1) && (TN.UA.desktop) ){

        $('.slider-wrap-tnylg, .slider-wrap-tnvideos').bxSlider({
            slideWidth: 415,
            minSlides: 2,
            maxSlides: 4,
            slideMargin: 0,
            onSlideAfter: function(){
              $(window).trigger('scroll');
            },
            onSliderLoad: function(){

                $(".menu-news").css('visibility','visible');
                $(".header-carrousels").find('.vcard').css('visibility','visible');

                Helpers.lazyLoad();

            }
        });

    }

    if( ($('.slider-rankings-wrap').length == 1) && (TN.UA.desktop) ){

        $('.slider-rankings-wrap').bxSlider({
            slideWidth: 210,
            infiniteLoop: false,
            minSlides: 2,
            maxSlides: 5,
            slideMargin: 0,
            onSlideAfter: function(){
              $(window).trigger('scroll');
            },
            onSliderLoad: function(){
                $(".slider-rankings-wrap").css('visibility','visible');

                Helpers.lazyLoad();

            }       
        });

    }

}

/**
 @method note
 **/

ScrollDOM.prototype.note = function(){ }

ScrollDOM.prototype.tnylg = function()
{
    if(TN.UA.desktop) {
      $('.slider-rankings-wrap').bxSlider({
          slideWidth: 210,
          infiniteLoop: false,
          minSlides: 2,
          maxSlides: 5,
          slideMargin: 0,
          onSlideAfter: function(){
            $(window).trigger('scroll');
          },
          onSliderLoad: function(){
  
            Helpers.lazyLoad();
  
          }
          
      });
    }
}

/**
 * @class PollDOM
 * @constructor
 * @extends Prototype
 */

function PollDOM(){ }

/**
 @method home
 **/

PollDOM.prototype.home = function()
{
  
    $('#home-poll').poll_widget();
    //$('#interactions.poll-widget').poll_widget({response:'json'});
    $('#poll-big-header.poll-widget').poll_widget({response:'json', animation:'none'});
    
    if($("#header-poll").length == 1){

        $("#header-top").append('<div id="flap"> ABRIR </div>');

        $(".header-widgets").click(function(){

            $(this).slideUp(function(){

                $("#flap").slideDown('fast');

            });

        });

        $("#flap").live('click',function(){

            $(this).slideUp();
            $(".header-widgets").slideDown();

        });

    }

}

/**
 @method note
 **/

PollDOM.prototype.note = function()
{
  
  $('#poll-news.multiple').poll_widget({ type:'multiple' });
  $('#poll-news.yes-no').poll_widget();
}

function MamScripts(){
    if(!(this instanceof MamScripts)){
        return new MamScripts().init();
    }
}

MamScripts.prototype.init = function()
{

    //($('#agenda-mam-home').length == 0) ? false : true;

    function show_mam(sport, tournament){
        var $agenda = $('#agenda-mam-home');
        if (tournament == null){
            $agenda.find('.mam-agenda').addClass('hidden');
            $agenda.find('.mam-agenda[data-sport="' + sport + '"]').removeClass('hidden');
        }
        if (sport == null){
            $agenda.find('.mam-agenda').addClass('hidden');
            $agenda.find('.mam-agenda[data-tournament="' + tournament + '"]').removeClass('hidden');
        }
    }

    function goto_click($agenda){
        var i = $agenda.find('.mam-agenda:visible:first').index();
        if (i>0 ){i--;}
        $agenda.find('.goto').data('index', i ).delay(250).click();
    }

    // Click in a fucking sport
    $('#agenda-mam-home .sports li').click(function(){
        if ( $(this).hasClass('selected') ) {
            return false;
        }

        var sport = $(this).data('sport');
        var $agenda = $('#agenda-mam-home');

        if (sport == 'all') {
            //All fucking sports, reset all shit
            $agenda.find('.tournament li').removeClass('hidden selected').eq(0).addClass('first-child');
            $agenda.find('.mam-agenda').removeClass('hidden');
        }else{
            //Only one sport
            $agenda.find('.tournament li').addClass('hidden').removeClass('first-child selected');
            $agenda.find('.tournament li[data-sport="' + sport + '"]').removeClass('hidden').eq(0).addClass('first-child');
            show_mam(sport, null);
        }

        goto_click($agenda);

        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected');

    });

    $('#agenda-mam-home .tournament li').click(function(){
        if ( $(this).hasClass('selected') ) {
            return false;
        }

        show_mam(null, $(this).data('tournament'));
        var $agenda = $('#agenda-mam-home');
        goto_click($agenda);

        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected');
    });

    if (TN.UA.desktop) {
      $('.mam-slider').bxSlider({
        slideWidth: 269,
        minSlides: 2,
        maxSlides: 6,
        slideMargin: 14,
        onSliderLoad: function(){
            
            $(".mams-wrapper").css('visibility','visible');

            Helpers.lazyLoad();

        }
      });      
    }

    if ($('.mam-widget').length == 0) {return false;};
  
      var $mw = $('.mam-widget');

      for(var i = 0, len = $mw.length; i < len; i++ ){
        new MamScripts().refresh($mw.eq(i));
      }

}

/**
 @method getElapsedTime
 **/

MamScripts.prototype.getElapsedTime = function(timestamp)
{

    /* @TODO evil */

    var gmt1 = ( -3 * 60 * 60 * 1000),
        timestamp = timestamp.split(','),       
        d = new Date(),
        date1 = new Date(timestamp[0], timestamp[1], timestamp[2], timestamp[3], timestamp[4], timestamp[5]),
        d1 = date1.getTime(),
        date2 = new Date(),
        gmt2 = -date2.getTimezoneOffset() * 60 * 1000,
        d2 = date2.getTime(),
        dif = (d2-(d1+(gmt2 - gmt1))),
        h = parseInt(dif/1000/60/60),
        m = parseInt((dif/1000/60)-(h*60)),
        s = parseInt((dif/1000)-(h*60*60)-(m*60));

    return (h>0)?'--:--':((m>9?m:'0'+m) +':'+ (s>9?s:'0'+s)); 
};

 /**
 @method refresh
 **/

MamScripts.prototype.refresh = function($mam)
{

    $.ajax({type: "GET",
        url: $mam.data('url'),
        dataType: "html",
        async: true,
        cache: true,
        complete: function(data){
            $mam.empty().html(data.responseText);

            if($mam.find('.status').data('timestamp') != undefined){
                setInterval(function(){
                    
                    $mam.find('.clock .timer').html(new MamScripts().getElapsedTime($mam.find('.status').data('timestamp')));
                },1000);
            }

            setTimeout(function(){new MamScripts().refresh($mam)},60000);
        }

      });

};

/**
 * @class Ever
 * @constructor
 * @extends Prototype
 */

function EverScripts(){
    if(!(this instanceof EverScripts)){
        return new EverScripts().init();
    }
}

/**
 @method home
 **/

EverScripts.prototype.init = function()
{

    $('.block-link .more').on('click', function(){
        var $this = $(this);
        var $wrapper = $this.closest('.block-link');
        var $ul = $wrapper.find('ul');

        /* if animated fuck off of here motherfucker */

        if ($ul.is(':animated')) {return false; }

        if ($this.data('status') == 'closed'){
            $ul.css({
                height:$ul.height(),
                overflow: 'hidden'})
                .find('li').removeClass('hidden');

            var h = 0;
            $ul.find('li').each(function(i){
                h += $(this).outerHeight(true);
            });

            $ul.animate({height: h}, 1000, function(){
                $this.data('status', 'opened').html('Menos').addClass('more-up');
                $ul.css({height: 'auto'});
            })
        }

        if ($this.data('status') == 'opened'){

            var h = 0;
            $ul.find('li:lt(' + ($this.data('q') +1 ) + ')').each(function(i){
                h += $(this).outerHeight(true);
            });

            $ul.animate({height: h}, 1000, function(){
                $this.data('status', 'closed').html('Más').removeClass('more-up');
                $ul.find('li:gt(' + $this.data('q') + ')').addClass('hidden');
                $ul.css({height: 'auto'});
            })
        }
    });


    /* TWITTER */

    !function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs');

    /* DPLAYER para la nota*/
    //@todo: corregir luego


    $('.dplayer').dplayer();
    $('.dgallery').dgallery();

    /* MODERNIZR */

    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();

        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });

    }

    /* Share Icons */
    $('.shares .share a').click(function(){
        window.open($(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });

    /* Share Icons Alerts*/
    $('.publish-to .link a').click(function(){
        window.open($(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });

    Helpers.lazyLoad();
    
}


EverScripts.prototype.login = function()
{

    var $_box = $('#login-box'),
        $_inputs = $_box.find('input[type=text]'),
        $_error_box = $('<div id="error" class="error"></div>'),
        $_loading = $('<div class="loading"></div>');

    if($.cookie('tns01')){

       var template = Handlebars.getTemplate(config.templates + 'user-login');
       $_box.empty().html(template({user:($.parseJSON($.cookie('tns01')))}));

       $('#user-item .small-avatar').removeAttr('data-original')
                                    .attr('src',$.parseJSON($.cookie('tns01')).image);

       return;
    }

    $('#user-login-form').submit(function(e) {

        e.preventDefault();

        $.ajax({
            type: "POST",
            url: '/services/user/login.json',
            data: '{"username":"' + $('#edit-name-box').val()+'", "password":"' + $('#edit-pass-box').val()+'"}',
            accept: "application/json",
            contentType: "application/json",
            statusCode:{
              //user already loggued in
              406:function(msj){
                var txt = jQuery.parseJSON(msj.responseText);
                $_loading.remove();
                $_box.prepend($_error_box.text(txt[0]));

                setTimeout(function(){
                    $_error_box.remove();
                },3000);
              },
              //User or pass not found
              401:function(msj){
                var txt = jQuery.parseJSON(msj.responseText);
                $_loading.remove();
                $_box.prepend($_error_box.text(txt[0]));
                $_inputs.addClass('input-error');

                setTimeout(function(){
                    $_error_box.remove();
                    $_inputs.removeClass('input-error');
                },3000);
              }
            },
            beforeSend:function(){
                $_box.prepend($_loading.css({width:$_box.width() + 'px', height:$_box.height() + 'px'}));
            },
            //User logued successful
            success: function(data, textStatus, XMLHttpRequest){

                var template = Handlebars.getTemplate(config.templates + 'user-login');
                var info = {user:($.parseJSON($.cookie('tns01')))};
                $_box.empty().html(template(info));
                $('#user-item .small-avatar').attr('src',$.parseJSON($.cookie('tns01')).image);

                $.cookie(data.session_name,data.sessid, {'expires': 1, 'path': '/', 'secure': false});
            }
        });

    });

}

EverScripts.prototype.newsletter =  function()
{

    $('#newsletter-form').submit(function(e){
        e.preventDefault();

        var $_box = $('.newsletter'),
            $_inputs = $_box.find('input'),
            $_loading = $('<div class="loading"></div>'),
            $_msg_box = $('<div class="msg-box"></div>');

        $.ajax({
            type:'POST',
            url:'/services/newsletter/subscribe.json',
            data: '{ "email" : "' + $('.input-mail').val() + '", "fname" : " ", "lname" : " ", "list" : "TodoNoticias" } ',
            accept: "application/json",
            contentType: "application/json",
            statusCode: {
                401:function(msj){
                    //Revisar con la gente de sistemas para unificar el mensaje de error en el responseText
                    
                }
            },
            beforeSend:function(){
                $_box.prepend($_loading.css({width:$_box.width() + 'px', height:$_box.height() + 'px'}));
            },
            success: function(msj){
                $_loading.remove();
                $_box.find('form').prepend($_msg_box.text(msj[0]).hide());
                $_inputs.fadeOut(500,function(){
                    $_msg_box.fadeIn(function(){
                        setTimeout(function(){
                            $_msg_box.fadeOut(500,function(){
                                $_inputs.fadeIn();
                                $_msg_box.remove();
                            });
                        },3000);
                    });

                });
            }
        });
    });

}

EverScripts.prototype.lostPassword =  function()
{
    var template = Handlebars.getTemplate(config.templates + 'lost-password');
    $('.forgot-password').click(function(e){
        e.preventDefault();

        var $_box = $('#login-box'),
            $_elements = $('.form-group'),
            $_loading = $('<div class="loading"></div>'),
            $_msg_box = $('<div class="msg-box"></div>'),
            $_error_box = $('<div id="error" class="error"></div>');

        $_box.append(template);

        var $_lost_form = $('#lost-password-form');

        $_elements.fadeOut(500,function(){
            $_lost_form.fadeIn();
        });

        $_lost_form.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'POST',
                url:'/services/user/password.json',
                data: '{ "mail" : "' + $('#lost-password-mail').val() + '" }',
                accept: "application/json",
                contentType: "application/json",
                statusCode: {
                    401:function(msj){
                        var txt = jQuery.parseJSON(msj.responseText);
                        $_loading.remove();
                        $_box.prepend($_error_box.text(txt[0]));

                        setTimeout(function(){
                            $_error_box.remove();
                        },3000);
                    }
                },
                beforeSend:function(){
                    $_box.prepend($_loading.css({width:$_box.width() + 'px', height:$_box.height() + 'px'}));
                },
                success: function(msj){
                    $_loading.remove();

                    $_lost_form.find('fieldset').css({width:'100%'}).html($_msg_box.text(msj[0]));

                    setTimeout(function(){
                        $_lost_form.fadeOut(500,function(){
                            $_elements.fadeIn();
                            $_msg_box.remove();
                            $_lost_form.remove();
                        });
                    },3000);


                }
            });

        });
    });

}

EverScripts.prototype.menuStatic = function()
{
    //if (!TN.UA.desktop) {return false;}

    var local = new Local();

    $("#sections-menu li[data-name]").on('touchstart mouseenter click',function(){

        setTimeout(function(){
            Helpers.viewport.carousel()
        },500);

        if(!$(this).hasClass('append-off')){

            // @TODO NON OPTIMIZED*** 

            if($(this).data().name != null){

              $(this).find('.bx-wrapper').remove();
              $(this).find('.menu-content').append('<div class="slider-wrap menu-news menu-append-content"></div>')
              $(this).find('.menu-append-content').hide();
              var api = 'ahora';
              if ($(this).data('name') == 'tnylagente'){
                api = 'lodestacado';
              }

              local.storage({

                    type:       'ranking',

                    wrap:       "#" + $(this).attr('id'),
                    tpl:        config.templates + 'menu',
                    id:         $(this).data('name') + "_menu",
                    api:        '/services/flujo/' + api + '.json?section=' + $(this).data('name') + '&cantidad=12',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.sidebar,
                    extra:      'menu-append-content',
                    jqueryCall: this   

                });

            }
  
            $(this).addClass('append-off');

        }

        //return false;

    });

}

EverScripts.prototype.carousel = function(self)
{
    if (TN.UA.desktop) {
      $("#sections-menu").find('li[data-name=' + $(self).data('name') + '] .slider-wrap').bxSlider({
          slideWidth: 215,
          minSlides: 2,
          maxSlides: 4,
          slideMargin: 18,
          onSlideAfter: function(){
            $(window).trigger('scroll');
          }
      });
    }
    
    $(self).find('.menu-append-content').show();
    
    setTimeout(function(){
        $(".bx-wrapper").css('visibility','visible');
    },500);

}

EverScripts.prototype.eplanning = function()
{

  if (TN.ads == undefined) {return false}
  
  eplArgs = { iIF:1,
              sV:"http://ads.e-planning.net/",
              vV:"4",
              sI:"11515",
              sec:TN.ads.sec,
              eIs:TN.ads.eIs
             };

  if (TN.ads.ss != undefined){eplArgs.ss = TN.ads.ss;}
    
  TN.ads.jqe = TN.eplanning({ eplDoc: document,
                              eplLL: false,
                              eS1: 'us.img.e-planning.net',
                              eplArgs: eplArgs
                             }); 

  var l = TN.ads.eIs.length;
  for (var i = 0; i < l; i++){
    TN.ads.jqe.add(TN.ads.eIs[i]);
  }

}

EverScripts.prototype.flyout = function()
{

    var $flow = $('#flyout');

    if ($flow.length > 0 ) {
        var is_show = false;

        var $myflow = $('<div class="body-flow-popup"></div>');
        $myflow.html($flow.html()).appendTo('body');

        $(window).bind('scroll', function(){

            //If is ie6, exit
            if ($.browser.msie) {
                if (parseInt($.browser.version)== 6) {  return false; }
            }

            var top = $(window).scrollTop(); //me consigue el top
            var bottom = $(window).height() + top;

            if ($flow.offset().top <= top || $flow.offset().top <= bottom) {
                if (is_show == false){
                    is_show = true;
                    $myflow.animate({'right': '0'}, 'normal', 'swing',function(){
                        $myflow.find('.close').unbind().click(function(){
                            $myflow.animate({'right': '-' + $myflow.outerWidth(true) }, 'normal', 'swing', function(){
                                $myflow.remove();
                                $flow.remove();
                            });
                        });
                    });
                }

            } else {
                if (is_show == true){
                    is_show = false;
                    $myflow.animate({'right': '-' + $myflow.outerWidth(true) }, 'normal', 'swing');
                }
            }

        });





        setTimeout('$(window).scroll()', 250);
    }


}

/**
 * @class Local
 * @constructor
 * @extends Prototype
 */

function Local(){ }

/**
 @method storage
 **/

Local.prototype.storage = function(o)
{

    var template = Handlebars.getTemplate(o.tpl);

    Storage(o.id,o.api,o.timestamp,function(data){

        
        

        o.helpers(this)

        

        if(o.type == 'ranking'){

          $(o.wrap).find('.' + o.extra).html(template(data));

          var callback = $.Callbacks(),
              ever = new EverScripts();

          callback.add(ever.carousel);
          callback.fire(o.jqueryCall);

        }else{

          $(o.wrap).html(template(data));
        
        }

        if(typeof o.after == 'function' && o.after != undefined) setTimeout(function(){ o.after(data); },50);


    });

}

/**
 @method store
 **/

Local.prototype.socialcore = function()
{

    var ref = new Ref(),
        local = new Local();

    /* Store Comments module */

    /*local.storage({*/

        /*  wrap box set which will include content
         tpl template set which will get content
         id is an identifier of store
         api [services]
         timestamp since
         helpers handlebars
         */

        /*wrap:       '#comments .comment-content',
        tpl:        config.templates + 'comments',
        id:         $("body").data('node'),
        api:        '/services/node/' + $("body").data('node') + '/comments_image.json?count=5',
        timestamp:  false,
        helpers:    Helpers.handleHelpers.footer

    });*/


    /* End */

    ref.urlQuery('t.co OR facebook OR bit.ly OR tn',function(data){

        if(data == 'tn'){

            
            

            ref.pathQuery('show OR musica OR deportes OR politica OR internacional ELSE tn',function(data,path){

                
                

                /* Store tn content */

                local.storage({

                    wrap:       '#scrollbar-sticky .scroll-content',
                    tpl:        config.templates + 'tnsidebar',
                    id:         data,
                    api:        '/services/mas_populares/mas_populares.json?preset=564x383',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.sidebar

                });

                local.storage({

                    wrap:       '#river-news-content',
                    tpl:        config.templates + 'socialfooter',
                    id:         data + "_masvisitadas",
                    api:        '/services/mas_populares/mas_visitadas.json?section=tn&day=100&preset=564x383',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.footer,
                    after: function(){

                        setTimeout(function(){

                            if($(".river-news .play-gallery").length != 0){
                              Helpers.rules.generateDataImage();
                            }

                            $('.river-news .dplayer').dplayer();
                            $('.river-news .dgallery').dgallery();

                            new EverScripts().eplanning();

                        },1000);

                    }

                });

                /* End */

            });

        }else if(data == 'facebook' || data == 't.co' || data == 'bit.ly'){

            
            

            var fusionFile = new TN.app().getFusionFiles('/services/gran_titular/' + route.getPath() + ".json?alt=true&preset=564x383", '/services/mas_populares/mas_populares.json?preset=564x383',function(){

                local.storage({

                    wrap:       '#scrollbar-sticky .scroll-content',
                    tpl:        config.templates + 'socialsidebar',
                    id:         data,
                    api:        store.get('a').concat(store.get('b')),
                    timestamp:  false,
                    helpers:    Helpers.handleHelpers.sidebar,

                    after:      function(){

                      store.remove('a');
                      store.remove('b');

                      setTimeout(function(){
                        //alert($('.dplayer'));
                        $('.dplayer').dplayer();
                      },1000);
                    
                    }

                });

            });
                
            if(data == 'facebook'){

                
                

                /* Store facebok content footer */

                local.storage({

                    wrap:       '#river-news-content',
                    tpl:        config.templates + 'socialfooter',
                    id:         data + "_mascompartidas",
                    api:        '/services/mas_populares/mas_compartidas.json?section=' + route.getPath() + '&limit=15&preset=564x383',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.footer,
                    after: function(){

                        setTimeout(function(){
                            
                            if($(".river-news .play-gallery").length != 0){
                              Helpers.rules.generateDataImage();
                            }

                            $('.river-news .dplayer').dplayer();
                            $('.river-news .dgallery').dgallery();

                            new EverScripts().eplanning();

                        },1000);

                    }

                });

                /* End */

            }else if(data == 't.co' || data == 'bit.ly'){

                

                /* Store twitter content footer */

                local.storage({

                    wrap:       '#river-news-content',
                    tpl:        config.templates + 'socialfooter',
                    id:         data + "_mastwiteadas",
                    api:        '/services/mas_populares/mas_twiteadas.json?section=' + route.getPath() + '&limit=15&preset=564x383',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.footer,
                    after: function(){

                        setTimeout(function(){
                            
                            if($(".river-news .play-gallery").length != 0){
                              Helpers.rules.generateDataImage();
                            }

                            $('.river-news .dplayer').dplayer();
                            $('.river-news .dgallery').dgallery();

                            new EverScripts().eplanning();

                        },1000);

                    }

                });

                /* End */

            }

        }

    });

}

Local.prototype.ranking = function(wrapID)
{

    var local = new Local(),
        $textly = '',
        socialtype = '';
        cruiser = new TN.app();

    $(".home-ranking .slider-rankings-wrap, .home-ranking .bx-wrapper").css('visibility','visible');

    $("#" + wrapID + " .more-sections").find('a').on('touchstart click',function(e){

        e.preventDefault();
        $('#slider-rankings-wrap').hide();

        var captureAttr = "clearfix slider-rankings-wrap",
            clone = $('<ol></ol>').attr('class',captureAttr + ' ' + $(this).data('css')),
            $linkTo = $(this).attr('href').split('?');

            $("#" + wrapID).find('.bx-wrapper').remove();
            $("#" + wrapID).find('.wrapper').append(clone);

            if($linkTo[0] == 'mas_compartidas') $textly = 'Recomendadas en facebook' 
            if($linkTo[0] == 'mas_visitadas') $textly = 'Las mas leídas'
            if($linkTo[0] == 'mas_twiteadas') $textly = 'Las mas twiteadas';

            $("#" + wrapID + " .title").find('h2').html('Ranking: ' + $textly);

            if($linkTo[1] == undefined){
                $linkTo[1] = '';
            }

                local.storage({

                    type:       'ranking',

                    wrap:       "#" + wrapID,
                    tpl:        config.templates + 'recommend',
                    id:         $(this).attr('href') + "_ranking",
                    api:        '/services/mas_populares/' + $linkTo[0] + ".json?" + $linkTo[1] + '&limit=14&preset=564x383',
                    timestamp:  config.expire,
                    helpers:    Helpers.handleHelpers.sidebar,
                    extra:      'slider-rankings-wrap',

                    after:      function(data){

                      if (TN.UA.desktop) {
                        $("#" + wrapID).find('.slider-rankings-wrap').bxSlider({
                            slideWidth: 210,
                            infiniteLoop: false,
                            minSlides: 2,
                            maxSlides: 5,
                            slideMargin: 0
                        });
                      }
                      switch($linkTo[0]){
                        case 'mas_compartidas': socialtype = 'count_facebook'; break;
                        case 'mas_twiteadas': socialtype = 'count_twitter'; break;
                        case 'mas_visitadas': socialtype = 'counter'; break;
                      }

                      for(var i in data){ $("#" + wrapID + " .counter-refresh").eq(i).html(data[i][socialtype]); }

                      $(".home-ranking .slider-rankings-wrap, .home-ranking .bx-wrapper").css('visibility','visible');
                    
                    }

                });

    });

}

Handlebars.getTemplate = function(name,callback)
{

    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {

        $.ajax({
            url : name + '.html',
            beforeSend: function(xhr){

              if (xhr.overrideMimeType){

                xhr.overrideMimeType("text/html");
              
              }

            },
            dataType: 'html',

            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);

                if(typeof callback == 'function' && callback != undefined){
                    callback.call(arguments,this);
                }

            },
            async : false

        });

    }

    return Handlebars.templates[name];

};