/*!
 *
 * jQuery Comment
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

var route = new Route('data-page');

/**
 * @class CommentApp
 * @constructor
 */

function CommentApp(setupfn,o)
{

  this.disconnectTest = function(slr){

    var $slr = (slr == null) ? '' : slr;

    if (!$.cookie('tns01')){

      $($slr + '.pop-action-auth #login-intro').live('click',function(e){

        e.preventDefault();

        $.auto("ajax", config.ajax + $(this).data('href') + '.html', function(){

          setTimeout(function(){
            $("#destination").attr('href',$("#destination").attr('href') + location.pathname);
          },400);

        });
      
      });

      $($slr + ".pop-action-auth .comment-form").find('.submit').live('click',function(e){
        
        e.preventDefault();

        if($(".edit-comment").val() != ''){

          $.auto("ajax", config.ajax + $(this).data('href') + '.html', function(){

            setTimeout(function(){
              $("#destination").attr('href',$("#destination").attr('href') + location.pathname);
            },400);

          });

        }

      })

    }else{

      $($slr + ".pop-action-auth .comment-form").find('.submit').live('click',function(e){ e.preventDefault() })

    }

  }

  this.getType = function(input){

    var m = (/[\d]+(\.[\d]+)?/).exec(input);

    if (m) {

       if (m[1]) { 

          return 'float'; 
        
        }else{ 

          return 'int';

        }         

    }

    return 'string';

  }

  this.pagination = function(n){
    
    var $pager = $("#pager-comments-wrap"),
        $ul = '<ul class="pager-content"></ul>',
        $arr = [],
        $pointer = 0;

    $pager.append($ul);
    
    var $ulClass = $("#pager-comments-wrap .pager-content");

    $ulClass.append('<li><a class="button arrow only-left" href="#" rel="prev">«</a></li>');

    for(var i = 1; i <= n; i++ ){

      $arr.push("<li><a class='button important' href='#' id='" + $pointer + "'>" + i + "</a></li>");
      $pointer += 5;

    }

    $ulClass.append($arr);
    $ulClass.append('<li><a class="button arrow only-right" href="#" rel="next">»</a></li>');

  }

  this.total = function(){

    $commentLength = parseInt($("#total-comments-count").html());

    var $construct = Math.floor(($commentLength / 5)*100)/100,
        $rest = $commentLength % 5;

    if($commentLength >= 5){

      var $totalRest = ($rest == 0) ? 0 : 1,
          
          $result = $construct + $totalRest; 

      return $result;

    }

    if(new CommentApp().getType($construct) == "float" || $construct == 0){

      var $result = 1;

      return $result;

    }

  }

  var ko = new KonamiCode(),

      options = { 

      wrapComments:   '.comment-content',
      wrapController: '.pager-content',
      defultView: 1,

      setup: function(arrfn){

        for(var i in arrfn){

          settings[arrfn[i]].call(this,arguments);

        }

      },

      reply: function(){

        var cssLock = 'login-box comment reply-comment clearfix';
        $selector = null;

          $(".actions").find('.reply').live('click',function(e){

            e.preventDefault();

            $("#block-in-Auth").find('.submit').attr('disabled','disabled');

            $selector = $(this).closest('article').attr('id');

            $(settings.wrapComments).find('.login-box').remove();

            var cloner = $(".login-box").clone();
            $(this).closest('article').append(cloner);
            $(this).closest('article').find('.login-box').attr('id', $(this).closest('article').attr('id'));
            $(this).closest('article').find('.login-box').attr('class',cssLock);
            $(this).closest('article').find('.login-box .header').removeClass('clearfix');
            $(this).closest('article').find('.login-box').addClass('pop-action-auth');
            $(this).closest('article').find('.login-box').attr('data-pid',$(this).closest('article').attr('id')); 
            $(this).closest('article').find('.login-box').attr('id','payback-action');
            $(this).closest('article').find('.login-box .actions').remove();

            $(".login-box .comment-form").find('.submit').click(function(e){ e.preventDefault() })

            ko.reset();
            ko.keyboardControl({ 

              type:'length', 
              selector:'#' + $(this).closest('article').find('.login-box').attr('id') + ' .comment-form', 
              max:300 

            });

            new CommentApp().disconnectTest($selector);

            $("#block-in-Auth").append('<div class="disabledPost"></div>');
            
            setTimeout(function(self){
                  $(self).addClass('payback');
                  $(self).removeClass('reply');
            },50,this); 

          });

        $(".actions").find('.payback').live('click',function(e){

          e.preventDefault();

          $("#payback-action").remove();
          $(".disabledPost").remove();
          $(".payback").removeClass('payback');
          $(".actions a").addClass('reply');

        });

      },

      report: function(){

        $(".comment-content").find('.report').live('click',function(e){

            e.preventDefault();

            $.auto("ajax", config.ajax + $(".comment-content").find('.report').attr('href') + '.html');

            var idComment = $(this).closest('article').attr('id');

            $('#form-report').die().live('submit',function(e){
                e.preventDefault();

                $('#boxContent').prepend('<div id="msgBox" class="pop-action"></div>');

                $.ajax({
                    url:$(this).attr('action') + '/'+$('body').data('node') + '/' + idComment,
                    complete:function(){
                        $('#report').fadeOut(500,function(){
                            $('#msgBox').text('El comentario fue reportado.').fadeIn();
                        });
                    }
                });
            });

        });                           

      },

      user: null, 

      keyboard: function(){

        ko.keyboardControl({ 

          type:'length', 
          selector:'.pop-action-auth .comment-form', 
          max:300 

        });

      },

      sort: function(n){

        var $wrap = '#comments .comment-content';

        $(settings.wrapController).find('a').removeClass('open')
                                            .removeClass('active-pagination');

        $(settings.wrapController).find('#' + n).addClass('open')
                                                .addClass('active-pagination');

        new Local().storage({

          wrap:       $wrap,
          tpl:        config.templates + 'comments',
          id:         $("body").data('node'),
          api:        '/services/node/' + $("body").data('node') + '/comments_image.json?count=5&offset=' + n,
          timestamp:  false,
          helpers:    Helpers.handleHelpers.footer,

          after:      function(){

            $('body,html').animate({
              scrollTop: $("#comments").offset().top - 100
             },2000);
          
          }

        });

      },

      pagination: function(){

        var $wrapController = $(settings.wrapController),
            $id = parseInt($wrapController.find('.open').attr('id'));

        $wrapController.find('#0').addClass('open');
        $wrapController.find('.open').addClass('active-pagination');

        $wrapController.find('a:not([rel])').click(function(e){

          e.preventDefault();

          $id = parseInt($(settings.wrapController).find('.open').attr('id'));

          if(this.id != $id){

            $id = settings.sort(this.id);

          }

        });

      },

      arrows: function(){

        var $wrapController = $(settings.wrapController);
        var $length = $wrapController.find('a:not([rel])').length;

        $wrapController.find('.arrow').click(function(e){

          e.preventDefault();

          var $id = parseInt($wrapController.find('.open').attr('id'));

          if($(this).hasClass('only-right') && $id + 5 < $commentLength){

            $id = settings.sort($id + 5);

          }

          if($(this).hasClass('only-left') && $id != 0){
            
            $id = settings.sort($id - 5);

          }
          
        });

      }

  };

  var settings = $.extend({}, options, o);

  settings.setup(setupfn);

}