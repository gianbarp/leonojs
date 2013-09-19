/*
function isNode(){
  if ( (TN.NODEJS == undefined) || (TN.NODEJS == null) ) {
    return false;
  } else {
    return true;
  }
}
*/

TN.UA = {}
TN.UA.navigator = window.navigator.userAgent;

TN.UA.android = TN.UA.navigator.match(/android/gi) ? true : false;
TN.UA.androidPhone = (TN.UA.android && !TN.UA.navigator.match(/tablet/gi)) ? true : false;
TN.UA.androidTablet = (TN.UA.android && TN.UA.navigator.match(/tablet/gi)) ? true : false;

TN.UA.blackberry = TN.UA.navigator.match(/blackberry/gi) ? true : false;
TN.UA.blackberryPhone = (TN.UA.blackberry && !TN.UA.navigator.match(/tablet/gi)) ? true : false;
TN.UA.blackberryTablet = (TN.UA.blackberry && TN.UA.navigator.match(/tablet/gi)) ? true : false;

TN.UA.ipad = TN.UA.navigator.match(/ipad/gi) ? true : false;
TN.UA.iphone = TN.UA.navigator.match(/iphone/gi) ? true : false;
TN.UA.ipod = TN.UA.navigator.match(/ipod/gi) ? true : false;

TN.UA.windowsPhone = TN.UA.navigator.match(/windows phone/gi) ? true : false;

TN.UA.mobile = (TN.UA.navigator.match(/mobi/gi) || TN.UA.androidPhone || TN.UA.iphone || TN.UA.ipod || TN.UA.windowsPhone || TN.UA.blackberryPhone) ? true : false;
TN.UA.tablet = (TN.UA.ipad || TN.UA.navigator.match('xoom|sch-i800|playbook|tablet|kindle/gi')) ? true : false;
TN.UA.tv = TN.UA.navigator.match(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/gi) ? true : false;
TN.UA.desktop = !(TN.UA.mobile || TN.UA.tablet || TN.UA.tv) ? true : false;

window.fbAsyncInit = function() {

  FB.init({

      appId      : '346699902992',
      status     : true,
      cookie     : true,
      xfbml      : true,
      domain     : 'tn.com.ar'
      
    });

};

Modernizr.load([
  {
    test: TN.UA.desktop,
    yep: [TN.BASE_PATH + 'js/libs/Jquery-1-8-3-min.js',
          TN.BASE_PATH + 'js/libs/Sticky.js',
          TN.BASE_PATH + 'js/plugins/jquery-bxslider.js',
          TN.BASE_PATH + 'js/plugins/jquery-lazyload.js'],
    
    nope: [TN.BASE_PATH + 'js/libs/Jquery-1-8-3-min.js'],
    
    both: [

          /* Load libs */
          TN.BASE_PATH + 'js/apps/iCase.js',
          TN.BASE_PATH + 'js/libs/UX-min.js',
          TN.BASE_PATH + 'js/libs/Facebook.js',
          TN.BASE_PATH + 'js/libs/Jwplayer-min.js',
          TN.BASE_PATH + 'js/libs/Handlebars.js',
          TN.BASE_PATH + 'js/libs/Cookie.js',
          TN.BASE_PATH + 'js/libs/Easing.js',
          TN.BASE_PATH + 'js/libs/Refquery.js',
          TN.BASE_PATH + 'js/libs/Json.js',
          TN.BASE_PATH + 'js/libs/Storage.js',
          
          /*
           * Tooth fairy, she bring the food, money, and bitches in the middle of the night :), don't mess with her please
           */
          TN.BASE_PATH + 'js/libs/eplanning.js',

          /* Load plugins */
          
          TN.BASE_PATH + 'js/plugins/jquery-poll.js',
          TN.BASE_PATH + 'js/plugins/jquery-smartbox.js',
          TN.BASE_PATH + 'js/plugins/jquery-royalslider-custom.js',
          TN.BASE_PATH + 'js/plugins/jquery-dgallery.js',
          TN.BASE_PATH + 'js/plugins/jquery-mousewheel.js',
          TN.BASE_PATH + 'js/plugins/perfect-scrollbar.js',
          TN.BASE_PATH + 'js/plugins/jquery-countdown.js',
          TN.BASE_PATH + 'js/plugins/jquery-dplayer.js',
          TN.BASE_PATH + 'js/plugins/jquery-tipTip-minified.js',
          TN.BASE_PATH + 'js/plugins/jquery-ajaxblocks.js',

          /* Load core LEONO */
          TN.BASE_PATH + 'js/leonojs/Config.js',
          TN.BASE_PATH + 'js/leonojs/Route.js', // Embajador
          TN.BASE_PATH + 'js/leonojs/Helpers.js', //Desarrollo de ministerio social
          TN.BASE_PATH + 'js/leonojs/Model.js', //Ministerio de comercio exterior
          TN.BASE_PATH + 'js/leonojs/Controller.js', //Ministerio de comercio interior
          TN.BASE_PATH + 'js/leonojs/View.js', // Gabinete de ministros
          
          TN.BASE_PATH + 'js/apps/Login.js',
          TN.BASE_PATH + 'js/apps/Auth.js',
          TN.BASE_PATH + 'js/apps/Social.js',
          TN.BASE_PATH + 'js/apps/Geolocation.js', //Servicio meteorologico nacional
          TN.BASE_PATH + 'js/apps/Header.js',
          TN.BASE_PATH + 'js/apps/Comment.js', //Secretaria electoral

          /* Load interaction::init script */
          TN.BASE_PATH + 'js/Interaction.js' //Poder ejecutivo
        ],

    complete: function(){
 
      if(TN.BASE_PATH == undefined) TN.BASE_PATH = $("#origin-path").data('basepath');

      if(/pupload/g.test(document.body.className)){

        Modernizr.load([
          
          {
            load: [
                
                TN.BASE_PATH + 'js/plugins/drupal.js',
                TN.BASE_PATH + 'js/plugins/jquery-form-min.js',
                TN.BASE_PATH + 'js/libs/plupload.js',
                TN.BASE_PATH + 'js/libs/plupload-html5.js',
                TN.BASE_PATH + 'js/libs/plupload-flash.js',
                TN.BASE_PATH + 'js/plugins/jquery-plupload-queue-min.js',
                TN.BASE_PATH + 'js/libs/plupload-config.js'

              ]
          }

        ]);

      }

      if (/ckeditor/g.test(document.body.className)) {

        Modernizr.load([
            
            {
              load: [
                  
                  TN.BASE_PATH + 'ckeditor/ckeditor.js',
                  TN.BASE_PATH + 'js/libs/ckeditor-config.js'

                ]
            }

          ]);

      }

    }

  }


]);