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

Modernizr.load([
  {
    test: TN.UA.desktop,
    yep: [TN.BASE_PATH + 'js/libs/Jquery-1-8-3-min.js',
          TN.BASE_PATH + 'js/prod/fat-min.js'],
    
    nope: [TN.BASE_PATH + 'js/libs/Jquery-1-8-3-min.js'],
    
    both: [

          /* Load libs */

          TN.BASE_PATH + 'js/prod/skinny-min.js' //Poder ejecutivo
        ],

    complete: function(){
 
      if(TN.BASE_PATH == undefined) TN.BASE_PATH = $("#origin-path").data('basepath');

      if(/pupload/g.test(document.body.className)){

        Modernizr.load([
          
          {
            load: [
                
                   TN.BASE_PATH + 'js/prod/plupload-min.js'

              ]
          }

        ]);

      }

      if (/ckeditor/g.test(document.body.className)) {

        Modernizr.load([
            
            {
              load: [
                  
                     TN.BASE_PATH + 'ckeditor/ckeditor.js',
                     TN.BASE_PATH + 'js/prod/ckeditor-config-min.js'

                ]
            }

          ]);

      }


    }

  }


]);

window.fbAsyncInit = function() {

  FB.init({

      appId      : '346699902992',
      status     : true,
      cookie     : true,
      xfbml      : true,
      domain     : 'tn.com.ar'
      
    });

};