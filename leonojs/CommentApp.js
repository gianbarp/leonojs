var route = new Route('data-page');

/**
 * @class CommentApp
 * @constructor
 */

function CommentApp(setupfn,o)
{

  this.disconnectTest = function(){

    if ($('body').hasClass('not-logged-in')){

      $(".login-box .comment-form").find('.submit').click(function(e){
        
        e.preventDefault();

        $.auto("ajax",$(this).data('href'));

      })

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
        $arr = [];

    $pager.append($ul);
    
    var $ulClass = $("#pager-comments-wrap .pager-content");

    $ulClass.append('<li><a class="button arrow only-left" href="#" rel="prev">«</a></li>');

    for(var i = 1; i <= n; i++ ){

      $arr.push("<li><a class='button important' href='#' id='" + i + "'>" + i + "</a></li>");

    }

    $ulClass.append($arr);
    $ulClass.append('<li><a class="button arrow only-right" href="#" rel="next">»</a></li>');

  }

  this.sort = function(wrap){ //use with Handlebars : sort index

    var $length = $(wrap).find('article').length,
        $cloner = $(wrap).clone(),
        $arr = [],
        $auxClass = 'commentapp-actions',

        $construct = Math.floor($length / 5),
        
        $rest = $length % 5;

        if($length >= 5){

          var $totalRest = ($rest == 0) ? 0 : 1,
              
              $result = $construct + $totalRest; 

          $(wrap).empty();

          for(var i = 1; i <= $result; i++){

            $arr.push('<div id="'+ i +'" class="' + $auxClass + '"></div>');

          }
          
          $(wrap).append($arr);

          for(var j = 0; j < $('.' + $auxClass).length; j++){

            $('.' + $auxClass).eq(j).append($cloner.find('article').slice(0,5));

          }

          $(wrap).find('article').fadeIn();
          $(wrap).fadeIn();

          return $result;

        }

        if(new CommentApp().getType($construct) == 'float'){

          var $result = 1;

          $(wrap).empty()
                 .append('<div id="1" class="' + $auxClass + '"></div>');
          $('.' + $auxClass).append($cloner.find('article').slice(0,5));

          $(wrap).find('article').fadeIn();
          $(wrap).fadeIn();

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

        $(".actions").find('.reply').click(function(e){

          e.preventDefault();

          $(settings.wrapComments).find('.login-box').remove();

          var cloner = $(".login-box").clone();
          $(this).closest('article').append(cloner);
          $(this).closest('article').find('.login-box').attr('class',cssLock);
          $(this).closest('article').find('.login-box .header').removeClass('clearfix');
          $(this).closest('article').find('.login-box .actions').remove();
        
        });

      },

      total: function(){

        var $total = $("#comments");

        return $total.find('.subtitle strong').empty().html($total.find('.comment-content article').length);

      },

      report: function(){

        $.Smartbox('open',function(){

          $(".comment-content").find('.report').open('ajax',{ 
        
            url: $(".comment-content").find('.report').attr('href') 
          
          });

        });

      },

      user: null, 

      keyboard:  function(){

        ko.keyboardControl({ 

          type:'length', 
          selector:'.comment-form', 
          max:300 

        });

      },

      animation: function(controllers,flag,self,paramCount){

          controllers.find('a').removeClass('open')
                               .removeClass('active-pagination');

          var divname = parseInt(self) + paramCount;

          $("#" + flag).hide("slide", { direction: "left" }, 500).removeClass('open');

          $(settings.wrapComments).animate({ height: $("#" + divname).height() },600);

          controllers.find('#' + divname).addClass('open')
                                         .addClass('active-pagination');
          
          $(settings.wrapComments).find("#" + divname).delay(400).show("slide", { direction: "left" }, 500).fadeIn(200).addClass('open').css('visibility','visible');

          return divname;

      },

      pagination: function(){

        var $wrapController = $(settings.wrapController);

        $(settings.wrapComments).find('#' + settings.defultView).fadeIn(200)
                                                                .addClass('open')
                                                                .css('visibility','visible');

        $wrapController.find('#' + settings.defultView).addClass('open');

        var $id = parseInt($wrapController.find('.open').attr('id'));
        $wrapController.find('.open').addClass('active-pagination');

        $wrapController.find('a:not([rel])').click(function(e){

          e.preventDefault();

          $id = parseInt($(settings.wrapController).find('.open').attr('id'));

          if(this.id != $id){

            $id = settings.animation($wrapController,$id,this.id,0);

          }

        });

      },

      arrows: function(pos){

        var $wrapController = $(settings.wrapController);
        var $length = $wrapController.find('a:not([rel])').length;

        $wrapController.find('.arrow').click(function(e){

          e.preventDefault();

          var $id = parseInt($wrapController.find('.open').attr('id'));

          if($(this).hasClass('only-right') && $id < $length){

            $id = settings.animation($wrapController,$id,$id,1);

          }

          if($(this).hasClass('only-left') && $id != 1){
            
            $id = settings.animation($wrapController,$id,$id,-1);

          }
          
        });

      }

  };

  var settings = $.extend({}, options, o);

  settings.setup(setupfn);

}