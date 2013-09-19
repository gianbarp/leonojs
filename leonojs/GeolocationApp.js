/**
 * @class CommentApp
 * @constructor
 */

function GeolocationApp()
{

  function cloner(){

    var $el = $(".weather .current"),
        $ell = $("#sections-menu-item .time"),
        $now = $el.find('img').attr('class'),
        $title = $el.find('#now').clone();

        $ell.find('.weather-icons img').removeAttr('class')
                                       .attr('class',$now);
        
        $ell.find('.header #now').empty();  
        $ell.find('.header').append($title);

  }

  var tql = new TQL();

	extend(GeolocationApp, TN);

	this.getCurrentLocation = function(api,callback){

		new GeolocationApp().getJson(api, function(xh){ 
      
      callback(xh.location['city']);

    });

	}

  this.getWeather = function(point){

    $(".weather .weather-now").empty();

    tql.storage(config.templates + 'weather', '.weather .weather-now', point, '/services/pronostico_ciudad/' + point, false, Helpers.handleHelpers.weather);
    tql.storage(config.templates + 'weathersticky', '#time .menu-alerts-content', point, '/services/pronostico_ciudad/' + point, false, Helpers.handleHelpers.weather);

    setTimeout(function(){
      cloner();
    },1000);

  }

  this.changeLocation = function(){

    new GeolocationApp().getJson('/mobile/clima/ciudades/', function(xh){ 
      
      store.set('ciudades',xh);

    });

  }

  this.autocomplete = function(){

    $("#select-location").focus();

    $("#select-location").autocomplete({
      source: $.map( store.get('ciudades'), function(item) {
          return {
            label: item.title,
            value: item.title
          }
        }),
      minLength: 1,
      select: function(event,ui) {

        $("#weather-pop-action .button").data('location',ui.item.value);

      }

    });

  }

  this.changeAction = function(){

    $("#weather-pop-action .button").live('click',function(){

      if($("#weather-pop-action .button").data('location') == undefined){

        return;

      }else{

        $('.weather .weather-now, #time .menu-alerts-content').empty();
        $(".boxclose, #boxclose").trigger('click');
        $("#weather-pop").empty()
                         .html('Ahora en ' + $("#weather-pop-action .button").data('location') + ' ' + '<span class="row"></span>');

        $("#time .menu-alerts h3").remove();
        $("#time .menu-alerts .menu-alerts-content").before('<h3>' + $("#weather-pop-action .button").data('location') + ' ' + '<a href="#" class="other-location">¿No es tu ciudad?</a>' + '</h3>'); 

        tql.storage(config.templates + 'weather', '.weather .weather-now', $("#weather-pop-action .button").data('location'), '/services/pronostico_ciudad/' + $("#weather-pop-action .button").data('location'), false, Helpers.handleHelpers.weather);
        tql.storage(config.templates + 'weathersticky', '#time .menu-alerts-content', $("#weather-pop-action .button").data('location'), '/services/pronostico_ciudad/' + $("#weather-pop-action .button").data('location'), false, Helpers.handleHelpers.weather);

        setTimeout(function(){
          cloner();
        },1000);

      }

    });

  }

}