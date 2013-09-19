var appRoute = new Route('data-page');

/*!
 *
 * Interaction Process
 * Version: 1.0.4
 * Original author: TN devs
 * Support && crowsource: @tndevs
 * Extend: View Pattern
 *
 */

$(function(){

  var  index       = 0;

  /* Configuration Process */


  /*--------------------------------*/

   var now         = new Date()
      ,local       = new Local()
      ,social      = new Social()
      ,auth        = new Auth()
      ,konami      = new KonamiCode()
      ,commentApp  = new CommentApp()
      ,geolocation = new GeolocationApp()
      ,header      = new HeaderApp()
      ,sticky      = new StickyDOM()
      ,scroll      = new ScrollDOM()
      ,poll        = new PollDOM()
      ,ref         = new Ref()
      ,nav         = new Nav()
      ,everScripts = new EverScripts()

      ,all = { 
              tn:'tn', 
              tp:'tp',
              tnm:'tnm', 
              tnf:'tnf', 
              tnl:'tnl', 
              cl:'clima'
            };

  /*--------------------------------*/


  /* Conditional Process */

	appRoute.action(appRoute.get(), function(pos){

     /*****************************************************/
	   appRoute.condition('ever',function(){
    /*****************************************************/

        EverScripts();
        
        Helpers._wizard(everScripts,[ 'eplanning', 'login', 'newsletter', 'lostPassword', 'menuStatic' ]);

        header.process();

        social.publish();

        Nav();
        nav.swipe();

        if ( $('html').hasClass('touch') ){
          $('.shares').on('touchstart', function(){
            $(this).find('.share').fadeToggle();
          });        
        }

        new TN.app().syncscript('facebook-jssdk',true,'//connect.facebook.net/es_LA/all.js',function(){

          auth.tracking('pop-action-auth');

        });

        geolocation.getCurrentLocation('/services/geolocalization.json',function(o){

          if(o == 'Buenos Aires') $("#traffic-item").show().css('visibility','visible');
          geolocation.getWeather(o);

        });

        Helpers._wizard(geolocation,[ 'changeAction' ]);

        $.Smartbox('open');

        $("#weather-pop, .other-location").open('ajax',{ 
          url: config.ajax + 'weather-pop' + '.html'
        },function(){

          geolocation.changeLocation(function(){

            geolocation.autocomplete();

          });
        
        });

     });

     /*****************************************************/
     appRoute.condition({ tnylg: 'user-tnylg' },function(){
    /*****************************************************/

        Helpers.storage._lastConnection(now);

        $(".bubble-info").tipTip({ maxWidth: "auto", edgeOffset: 10 });

        local.ranking('ranking-populares');

        sticky.note();
        scroll.home();

        Helpers.home.sidebar(true,120);

     });

     /*****************************************************/
     appRoute.condition({ tn:'tn', tp:'tp' },function(){ 
    /*****************************************************/

          MamScripts();
     
     });
     
     /*****************************************************/
     appRoute.condition({ tn:'tn' }, function(){ 
    /*****************************************************/  
       
       if($('#scrollbar-big-header').length == 1){
         Helpers.twitter.scroll(true);
         $(window).on('resize', function(){Helpers.twitter.scroll()});
       }

       Helpers.videos.scroll(true);
       $(window).on('resize', function(){Helpers.videos.scroll()});              

       if(store.get('ciudades')){

         geolocation.weatherpage();
         
        }else{

          $("#weather-search").click(function(){
            
            geolocation.changeLocation(function(){

              geolocation.weatherpage();

            });

          });

        }


        $('.weather .weather-now').click(function(){
            if(window.innerWidth <= 768){
                window.location.href = 'http://www.tn.com.ar/clima'
            }
        });

     });

     /*****************************************************/
     appRoute.condition({ extraview:'extraview-tn' }, function(){ 
    /*****************************************************/  
       
       sticky.customeview("#last-news","#menu-sections","#footer");
       Helpers.home.sidebar(true,120);

     });

     /*****************************************************/
     appRoute.condition({ extraview:'video-tn' }, function(){ 
    /*****************************************************/  
       
       sticky.customeview(".wrapper-sticky","#menu-sections","#footer");
       Helpers.home.sidebar(true,120);

     });
     
     /*****************************************************/
     appRoute.condition(all,function(){
    /*****************************************************/

        if(TN.UA.desktop){
          Helpers.home.stickyHeightEvilFixed();
        }
        
        sticky.home();
        
        if ($('#last-news').length == 1){

          Helpers.home.sidebar(true);
          
          $(window).on('resize', function(){
            setTimeout(Helpers.home.sidebar, 100);
          });

        }
        
        if ($('#poll-big-header').length == 1) {
          $('#poll-big-header').poll_widget({animation:'none'});
        }        
        
        scroll.home();
        poll.home();

        new Local().ranking('ranking-ml');
        new Local().ranking('ranking-populares');

     });

     /*****************************************************/
     appRoute.when('billboard-tn',{
    /*****************************************************/

       /*-----------------------*/
       onRoute: function(){
      /*-----------------------*/

          sticky.customeview("#last-news","#menu-sections","#footer");
          Helpers.home.sidebar(true,120);

           setTimeout(function(){

               commentApp.pagination(commentApp.total());

               new CommentApp([
                               'reply',
                               'report',
                               'keyboard',
                               'pagination',
                               'arrows'
                           ]);

               commentApp.disconnectTest();

           },50);

       },

       /*-----------------------*/
       onComplete: function(){
      /*-----------------------*/

        $(".home-flow, .wrapper-sticky").css('height','auto');

       }
       
     });
     
     /*****************************************************/
  	 appRoute.when('news-tn',{
    /*****************************************************/

      /*-----------------------*/
			onRoute: function(){
     /*-----------------------*/
      
        poll.note();
        everScripts.flyout();

        Helpers.storage._lastConnection(now);
        //Helpers.rules.sidebarDOM();

        Reactions();
        local.socialcore();

        Gajax();

        setTimeout(function(){

          commentApp.pagination(commentApp.total());

          new CommentApp([ 
                          'reply',
                          'report', 
                          'keyboard', 
                          'pagination', 
                          'arrows' 
                         ]);

          commentApp.disconnectTest();

        },50);

			},

      /*-----------------------*/
      onComplete: function(e){
     /*-----------------------*/

        setTimeout(function(){

          sticky.note();
          scroll.note();
          Helpers.home.sidebar(true,120);

        },4000);

      },

      /*-----------------------*/
      onError: function(e){
     /*-----------------------*/

        

      }

  	 });

     /*****************************************************/
     appRoute.when('news-tn-complete',{
    /*****************************************************/

      onRoute: function(){

        setTimeout(function(){

          new CommentApp([ 
                          'reply',
                          'report', 
                          'keyboard'
                         ]);

          commentApp.disconnectTest();

        },50);

      }

     });

	});

});
