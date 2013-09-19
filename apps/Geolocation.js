/*!
 *
 * jQuery Geolocation
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
 * @class CommentApp
 * @constructor
 */

GLOBALWEATHER = true;

function GeolocationApp()
{

  function cloner(){

    var $el = $(".weather-now .current"),
        $ell = $(".social-menu #time-item"),

        $now = $el.find('img').attr('class'),
        $title = $el.find('.content #now').text();

        $ell.find('.weather-icons-small img').removeAttr('class');
        $ell.find('.weather-icons-small img').attr('class',$now);

        $ell.find('.title-item .wheather-content').empty()  
                                                  .append($title);

  }

  var local = new Local();

	extend(GeolocationApp, TN.app);

	this.getCurrentLocation = function(api,callback){

    if(!store.get('geolocation')){

  		new GeolocationApp().getJson(api, function(xh){ 
  		  
  		  if (xh.location == undefined){
  		    xh.location= new Array();
  		  }
        
  		  xh.location['timevalidator'] = +new Date() + (1440*60*1000);
        store.set('geolocation',xh);

        callback(xh.location['city']);

      });

    }else if(+new Date() > store.get('geolocation').location['timevalidator']){

      setTimeout(function(){
        store.remove('geolocation');
      },50);

    }else{

      callback(store.get('geolocation').location['city']); 

    }

	}

  this.weatherpage = function(){

    $("#weather-search").autocomplete({
       source: $.map( store.get('ciudades'), function(item) {
           return {
             label: item.title,
             value: item.title
           }
         }),
       appendTo: $("#weather-header footer"),
       minLength: 1,
       select: function(event,ui) {

         var idCiudad = ui.item.value;
         window.location = "/clima/" + idCiudad.replace(/ /g,'-');

       }

     });

  }

  this.getWeather = function(point){

    $(".weather .weather-now").empty();

    /* Store weather content */

    local.storage({

      wrap:       '.weather .weather-now', 
      tpl:        config.templates + 'weather',
      id:         'clima', 
      api:        '/services/pronostico_ciudad/' + point + '.json', 
      timestamp:  false,
      helpers:    Helpers.handleHelpers.weather,

      after: function(){

        store.set('weather-fallback',$(".weather-now .current").html());

        setTimeout(function(){ 

          if(GLOBALWEATHER){

            
            cloner();

          }

        },1500);

      }

    });

    local.storage({

      wrap:       '#time-item .menu-alerts-content',
      tpl:        config.templates + 'weathersticky',
      id:         'clima',
      api:        '/services/pronostico_ciudad/' + point + '.json',
      timestamp:  false,
      helpers:    Helpers.handleHelpers.weather,

      after: function(){

        setTimeout(function(){
          $(".menu-alerts .weather-icons-medium").next().eq(0).find('p').addClass('sizeup');
        },1000);
        
        if (TN.UA.desktop) {
          $('#time-item .menu-alerts-content').bxSlider({
            slideWidth: 200,
            minSlides: 1,
            maxSlides: 3,
            infiniteLoop: false
          });
  
          $('.slider-transito-wrap').bxSlider({
              slideWidth: 254,
              minSlides: 1,
              maxSlides: 3
          });          
        }
      }

    });

    /* End */

  }

  this.changeLocation = function(callback){

    if(!store.get('ciudades')){

      new GeolocationApp().getJson('/services/clima/ciudades.json', function(xh){ 
        
        store.set('ciudades',xh);

        if(callback != undefined && typeof callback == 'function'){
          callback.call(this);
        }

      });

    }else{

      if(callback != undefined && typeof callback == 'function'){
        callback.call(this);
      }
      
    }

  }

  this.autocomplete = function(){

    $("#select-location").focus();
    
    if(store.get('ciudades')) {
      
      $("#select-location").autocomplete({
        source: $.map( store.get('ciudades'), function(item) {
            return {
              label: item.title,
              value: item.title
            }
          }),
        appendTo: $("#weather-pop-action"),
        minLength: 1,
        select: function(event,ui) {
  
          $("#weather-pop-action .button").data('location',ui.item.value);
  
        }
  
      });
    }
  }

  this.changeAction = function(){

    $("#weather-pop-action .button").live('click',function(){
      if($("#weather-pop-action .button").data('location') == undefined){

        return;

      }else{

        $('.weather .weather-now, #time-item .menu-alerts-content').empty();
        $(".boxclose, #boxclose").trigger('click');
        $("#weather-pop").empty()
                         .html('Ahora en ' + $("#weather-pop-action .button").data('location') + ' ' + '<span class="row"></span>');

        $(".menu-alerts h3").empty()
                            .html($("#weather-pop-action .button").data('location')); 

        //Store change weather content

        local.storage({

          wrap:       '.weather .weather-now',
          tpl:        config.templates + 'weather',
          id:         $("#weather-pop-action .button").data('location'),
          api:        '/services/pronostico_ciudad/' + $("#weather-pop-action .button").data('location') + '.json',
          timestamp:  false,
          helpers:    Helpers.handleHelpers.weather,

          after: function(data){

            if(data.Ahora.Temperatura == undefined || data.Ahora.Temperatura == null){

              $(".weather-now .current").html(store.get('weather-fallback'));
              GLOBALWEATHER = false;

            }else{

              store.set('weather-fallback',$(".weather-now .current").html());
              GLOBALWEATHER = true;

            }

          }

        });

        local.storage({

          wrap:       '#time-item .menu-alerts-content',
          tpl:        config.templates + 'weathersticky',
          id:         $("#weather-pop-action .button").data('location'),
          api:        '/services/pronostico_ciudad/' + $("#weather-pop-action .button").data('location') + '.json',
          timestamp:  false,
          helpers:    Helpers.handleHelpers.weather,
          after: function(){

            setTimeout(function(){$(".menu-alerts .weather-icons-medium").next().eq(0).find('p').addClass('sizeup');},1000);

          }

        });

        // End

          setTimeout(function(){

            if(GLOBALWEATHER){

              

              
              cloner();

            }

          },3000);

      }

    });
    
  }

}
