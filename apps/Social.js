/*!/*!
 *
 * jQuery Social
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

var route = new Route('data-page');

/**
 * @class Social
 * @constructor
 */

function Social(){

  this.publish = function(){

    transport = new TN.app();
    var $arr = [],
        $arrr = [],
        $arrrr = [],
        $url = '';

    $(".publish-to").find('li input').live('click',function(){

      var selfy = $(this),
          $section = selfy.closest('section'),
          $red = getRed(selfy);

        switch($section.attr('id')){

          case 'note-poll':

          

          $url = '/user/social_share/' + 'reacciones/' + $('body').data('node') + '/' + $red;

          if($(this).is(':checked')){

            $arr.push({red:$red, url:$url});
            store.set($section.attr('id') + '_social',$arr);

          }else{

            var $kill = Helpers.kill(store.get($section.attr('id') + '_social'), $red, $section.attr('id') + '_social');
            $arr = $kill;
          
          }

          break;

          case 'comments':

          

          $url = '/user/social_share/' + 'comentarios/' + $('body').data('node') + '/' + $red;

          if($(this).is(':checked')){

            $arrr.push({red:$red, url:$url});
            store.set($section.attr('id') + '_social',$arrr);

          }else{

            var $kill = Helpers.kill(store.get($section.attr('id') + '_social'), $red, $section.attr('id') + '_social');
            $arrr = $kill;

          }

          break;

          case 'interactions':

          

          $url = '/user/social_share/' + 'enrevistatv/' + $red + '/' + $section.find('.content h1').text();

          if($(this).is(':checked')){

            $arrrr.push({red:$red, url:$url});
            store.set($section.attr('id') + '_social',$arrrr);

          }else{

            var $kill = Helpers.kill(store.get($section.attr('id') + '_social'), $red, $section.attr('id') + '_social');
            $arrrr = $kill;

          }

          break;

        }

        
        

    });

  }

  function getRed(context){

    var $datared = '';

    if(context.attr('id') == 'news-facebook' || context.attr('id') == 'header-facebook' || context.attr('id') == 'comment-facebook'){

        $datared = context.attr('id').split('-')[1];
        
        return $datared;

      }

      if(context.attr('id') == 'news-twitter'|| context.attr('id') == 'header-twitter' || context.attr('id') == 'comment-twitter'){

        $datared = context.attr('id').split('-')[1]
        
        return $datared;

      }

  }

}