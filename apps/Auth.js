/*!
 *
 * jQuery Auth
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
 * @class Login
 * @constructor
 */

 function Auth()
 {

 	var testConnect = function(){

 		if($.cookie('tns01')){
      
      return true;
    }else{ 
      return false;
    }
 	}

 	var render = function(element,callback){

 		var $element = $('.' + element);

 		$.ajax({

        type: "GET",
        url: $element.data('url'),
        dataType: "html",
        async: true,
        cache: true,

        success: function(data){

          if (data == null){
            return false;
          }

          $element.find('.loading').fadeOut('slow');
          $element.html(data);
          
          if (typeof callback == 'function'){
            callback.call(this);
          }            
          
        }/*,

        error: function(jqXHR, textStatus, errorThrown){
          
          

        }*/
          
 		});

 	}

  var connect = function(element){

    $(".log-with").find('li').live('click',function(e){

     store.set('logIn',true); 
     store.set('temporalComment',$("#block-in-Auth .edit-comment").val());

    });

    $('.fbconnect-tn').live('click',function(e){

      e.preventDefault();

      var e = jQuery.Event("keydown");
      e.which = 27;
      $("body").trigger(e);

        FB.login(function(response){

          if (response.authResponse){

            $("#fbconnect-autoconnect-form").submit();   

          }else{

            $("#fbconnect-autoconnect-form").submit();

            //user cancelled login or did not grant authorization
          
          }

        }, {

          scope : 'read_stream,publish_stream,email'

        });

    });

  }

  var publish = function(context){

    var $popAction = $(".pop-action-auth"),
        $pid = ( $(".comment-content article").find('.login-box').data('pid') != undefined ) ? $(".comment-content article").find('.login-box').data('pid') : null;

      $.ajax({

          type: "POST",
          url: '/services/comment.json',
          data: '{ "nid":"' + $('body').data('node') + '", "pid":"' + $pid + '", "subject":"", "comment":"' + store.get('temporalComment') + '", "uid":"' + $popAction.find('.actions li').eq(0).find('a').attr('href').split('/')[2] + '", "name":"' + $popAction.find('.user-profile').text() + '" }',
          accept: "application/json",
          contentType: "application/json",
          success: function(data){

            if(store.get('comments_social')){
              transport.forEachPost(store.get('comments_social'));
            }

            $(".counter").html(0);
            $(".edit-comment").attr('value','');
            store.remove('temporalComment');
            store.set('commentPointer',$("#pager-comments-wrap").find('.important').last().attr('id'));

            window.location = location.href.split('?')[0] + '?' + +new Date();

          }
            
      });

  }

  return{

    constructor: Auth,

    tracking: function(element){

      if(testConnect()){

        if(store.get('commentPointer')){

          setTimeout(function(){

            $("#pager-comments-wrap").find('.important').last().trigger('click');
            store.remove('commentPointer');

          },2000);
        
        }
        
        render(element,function(){

          if(store.get('logIn')){

            var $_blockin = $('.login-box');

            $(".edit-comment").text(store.get('temporalComment'));

            store.remove('logIn');

          }

          $(".comment-box").find('.submit').live('click',function(){

            if($(".edit-comment").val() != ''){

              store.set('temporalComment',$(".edit-comment").val());

              publish(this);

              $(this).attr('disabled','disabled');

            }

          });

        });
      
      }
      
      connect(element);

    }

  }

 }