/*!
 *
 * jQuery Helpers
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

var index = 0;

/**
@module Helpers
**/

"use stricts";

Date.prototype.getTimeNow = function() {
	var one = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - one) / 86400000);
}

/*var _st = window.setTimeout;
 
window.setTimeout = function(fRef, mDelay) { 
    if(typeof fRef == "function") {  
        var argu = Array.prototype.slice.call(arguments,2); 
        var f = (function(){ fRef.apply(null, argu); }); 
        return _st(f, mDelay); 
    } 
    return _st(fRef,mDelay);
}*/

/**
@class Helpers
@constructor
**/

var Helpers = {

  /**
  @method _timestampConvert
  @return {Number} timestamp
  @param data {Number} Date now
  @param valueSplit {String} cuts
  **/

	_timestampConvert: function(data,valueSplit){

		var custome = data.split(valueSplit),
        first = custome[0].split(/[- :]/),
        second = custome[1].split(/[- :]/);

		var timestamp = new Date(first[0], first[1]-1, first[2], second[0], second[1], second[2]);
		
    return timestamp;
	},

  _wizard: function(obj,arr){

    for(var i in arr){
      obj[arr[i]](this);
    }

  },
  
  lazyLoad: function(){
    if(TN.UA.desktop) {
      $('img.lzl').lazyload(); 
    } else {
      $('img').each(function(){
          $(this).attr('src',$(this).data('original'));
       });
    }    
  },

  validation: function(obj,identifier,id,url){

    if(store.get(id)){

      if(Helpers.existItem(identifier,obj)){

        return false;

      }

    }else{

      store.set(id,[{red:identifier, url:url}]);

    }

  },

  existItem: function(identifier,obj){

    for(var i in obj){

        if(identifier == obj[i].red){

          return true;

        }

      }

  },

  kill: function(obj,identifier,id){

    for(var i in obj){

      if(obj[i].red == identifier){

        

        obj.splice(i,1);

        

      }

    }

    store.remove(id);
    store.set(id,obj);

    return obj;

  },

  /**
  @class getURL
  @constructor
  **/

  getUrl: {

    api: function(host,location){

      return host + location + '.json';

    },

    ajax: function(host,location){

      return host + location;

    }

  },

  /**
  @class Home
  @constructor
  **/

  home: {

    stickyHeightEvilFixed: function(){

      $(".home-flow").css('height','2900px');

    },

    /**
    @method sidebar
    @type Boolean
    @param $bool {Boolean}
    **/

    sidebar: function($first,n){

      if(TN.UA.desktop){

        var $ln = $('#last-news'),
             h = $(window).height() - ( $('#menu-sections').outerHeight(true) + parseFloat( $('#last-news').css('paddingTop')) + $ln.find('h2.title').outerHeight(true) + $ln.find('.banner-350x90').outerHeight(true)); 
        
        $('#scrollbar-sticky').height(h-10);
        
        if ($first === true){
          $('#scrollbar-sticky').perfectScrollbar({
            wheelPropagation: true,
            wheelSpeed: 30
          });

          return; 
        
        }
        
        $('#scrollbar-sticky').scrollTop(0).perfectScrollbar('update');
        return;      
      
      }

    }

  },

  nota:{

    stickyBannerHeightEvilFixed: function(){

      if($("#300x600,#well-1_").length != 0){

          $("#300x600,#well-1_").stickier({
              top: parseInt($("#menu-sections").height()) + 10, // start $("#menu-sections").height() || -(15)
              bottomLimiter: $("#footer"), // stop $(document).height() - $("#ranking-populares").offset().top || +(40)
              noContainer: true,
              responsive: true, // responsive
              ezequielLimiter: 32 // by QA ninja
          });

      }

    }

  },
  
  twitter:{
    /**
    @method scroll
    @type Boolean
    @param $bool {Boolean}
    **/

    scroll: function($first){

      if(TN.UA.desktop){
      
        var $bh = $('#big-header .big-header-related');
        var h = $bh.height() - $bh.find('article.medium').height();
        
        $('#scrollbar-big-header').height(h)
        
        if ($first === true){
          $('#scrollbar-big-header').perfectScrollbar({
            wheelPropagation: true
          });
          return
        }
        
        $('#scrollbar-big-header').scrollTop(0).perfectScrollbar('update');
        return 
    
      }
 
    }

  },
  
  videos:{
    /**
    @method scroll
    @type Boolean
    @param $bool {Boolean}
    **/

    scroll: function($first){

      if(TN.UA.desktop){
      
        $('#scrollbar-video').height($('#tn-video .main-content').height());
        
        if ($first === true){
          $('#scrollbar-video').perfectScrollbar({
            wheelPropagation: true
          });
          return
        }
        
        $('#scrollbar-video').scrollTop(0).perfectScrollbar('update');
        return 
     
     }

    }

  },  

  /**
  @class Storage
  @constructor
  **/

  storage: {

    /**
    @method _existItem
    @type Boolean
    @return {Boolean}
    @param eldata {String}
    @param storekey {String}
    **/

    _existItem: function(eldata,storekey){

      for(var i in storekey){

        if(eldata == storekey[i].nid){

          return true;

        }

      }

    },

    /**
    @method _lastConnection
    @return {Array}
    @param now {Number}
    **/

    _lastConnection: function(now){
     
      return window.localStorage.setItem('lastConnection',now);
    
    }

  },

  viewport: {

    carousel: function(){

      $(".bx-viewport").css('height','auto');
      $(".bx-viewport").find('article').css('width','215px');

    }

  },

  /**
  @class Rules
  @constructor
  **/

  rules: {

    generateDataImage: function(){

      var $rivernews = $(".river-news .play-gallery");

      $rivernews.each(function(){

        var $img = $(this).data('fall').split(','),
            $fall = [];

          for(var i in $img){
            $fall.push({caption:i,image:$img[i]});
          }

          $(this).attr('data-images',JSON.stringify($fall))
                 .removeAttr('data-fall');

         $fall = [];        

      })

    },

    /**
    @method sidebarDOM
    @return {Number} status current views 
    @param interactionLinks {Object}
    **/

    sidebarDOM: function(interactionLinks){

      var storeGet = store.get('sidebarDOM');

          //interactionLinks();

          var navlist = $("#scrollbar-sticky article .url");

          if(storeGet){

            
            

            for(var k = 0; k < navlist.length; k++){

              if(Helpers.storage._existItem(navlist.eq(k).data('nid'),store.get('sidebarDOM')) == true){

                
                

                var cloner = navlist.eq(k).closest('article').clone();
                navlist.eq(k).closest('article').remove();
                cloner.appendTo(".scroll-content");
                cloner.addClass('mark-all-as-read');
              
              }

            }

          }

          $("#scrollbar-sticky article").click(function(){

            var nid = $(this).find('h1 .url').data('nid');
            
            if(!store.get('sidebarDOM')){

              var note = [];
              note.push({nid:nid});
              store.set('sidebarDOM',note);
            
            }else{

              if(Helpers.storage._existItem($(this).find('h1 .url').data('nid'),store.get('sidebarDOM')) != true){

                var reserve = store.get('sidebarDOM'),
                    generate = reserve.concat({nid:nid});

                store.set('sidebarDOM',generate);

              }

            }
          
          });
      }

  },

  handleHelpers: {

    since: function(datetime){

      var tTime=new Date(datetime);
      var cTime=new Date();
      var sinceMin=Math.round((cTime-tTime)/60000);
      if(sinceMin==0)
      {
          var sinceSec=Math.round((cTime-tTime)/1000);
          if(sinceSec<10)
            var since="10' ATRÁS";
          else if(sinceSec<20)
            var since="20' ATRÁS";
          else
            var since="1' ATRÁS";
      }
      else if(sinceMin==1)
      {
          var sinceSec=Math.round((cTime-tTime)/1000);
          if(sinceSec==30)
            var since="1' ATRÁS";
          else if(sinceSec<60)
            var since='AHORA';
          else
            var since="1' ATRÁS";
      }
      else if(sinceMin<45)
          var since= sinceMin + "' ATRÁS";
      else if(sinceMin>44 && sinceMin<60)
          var since="60' ATRÁS";
      else if(sinceMin<1440){
          var sinceHr=Math.round(sinceMin/60);
      if(sinceHr==1)
        var since="60' ATRÁS";
      else
        var since=sinceHr + "HS ATRÁS";
      }
      else if(sinceMin>1439 && sinceMin<2880)
          var since="1 DÍA ATRÁS";
      else
      {
          var sinceDay=Math.round(sinceMin/1440);
          var since= sinceDay + " DÍAS ATRÁS";
      }
      return since;

    },

    sidebar: function(){

      Handlebars.registerHelper('isImage', function(options){

        if(this.media != null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('getImageThumb',function(){

        if(this.media != null){

          if(this.media.image_thumb != null){
          
            if(/next.tn|tn.com/.test(this.media.image_thumb)){

              var temp = this.media.image_thumb.split('/'),
                  gen  =  temp[3] + "/" + temp[4] + "/" + temp[5] + "/" + temp[6] + "/" + temp[7] + "/" + temp[8] + "/" + temp[9] + "/" + temp[10] + "/" + temp[11];

              return new Handlebars.SafeString("http://tn.com.ar/" + gen);
            
            }else{
            
              return new Handlebars.SafeString(this.media.image_thumb);
            
            }
   
          }

        }

      });

      Handlebars.registerHelper('getCounter', function(){

        if(this.count_total != null){
          return new Handlebars.SafeString(this.count_total);
        }

      });

      Handlebars.registerHelper('getTime', function(){

        if(this.created != undefined && this.created != null){

          var $timer = new Date(
                                this.created.split(' - ')[0].split('/')[2],
                                this.created.split(' - ')[0].split('/')[1] - 1,
                                this.created.split(' - ')[0].split('/')[0],
                                this.created.split(' - ')[1].split(':')[0],
                                this.created.split(' - ')[1].split(':')[1]);

          var n = Helpers.handleHelpers.since($timer);
          
          return new Handlebars.SafeString(n);

        }

      });

      Handlebars.registerHelper('isMedia', function(options){

        if(this.media_home != undefined){

          if(this.media_home.type != 'image'){
            return options(this);
          }else{
            return options.inverse(this);
          }

        }

      });

      Handlebars.registerHelper('isSocialNetwork', function(options){

        if(this.media_home != null || this.media_home != undefined){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('isLiveClass', function(xclass){

        if(this.type != undefined && this.type == 'vivo'){
          return new Handlebars.SafeString(xclass);
        }

      });

      Handlebars.registerHelper('vivoAction', function(options){

        if(this.type != undefined && this.type == 'vivo'){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });      

      Handlebars.registerHelper('isVideo', function(options){

        if(this.media != undefined){

          if(this.media.video != undefined){
            return options(this);
          }

        }

      });

      Handlebars.registerHelper('className', function(key, xclass){

        if(index == key){
          return new Handlebars.SafeString(xclass);
        }

      });

      Handlebars.registerHelper('denied', function(options){

        if(this.denied != true || this.denied == undefined || this.denied == null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('indexSys', function(key,options){

        index++;

        if(index == key){
          return options(this);
        }else{
          return options.inverse(this);
        }

      }); 

    },

    hComments: function(){

      Handlebars.registerHelper('className', function(key, xclass){

        if(index == key){
          return new Handlebars.SafeString(xclass);
        }

      });

      Handlebars.registerHelper('denied', function(options){

        if(this.denied != true || this.denied == undefined || this.denied == null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

    },

    weather: function(){

      Handlebars.registerHelper('iconly', function(){

        if(this.Ahora.Franja_horaria == 'Matutino' || this.Ahora.Franja_horaria == 'Tarde'){
          return new Handlebars.SafeString('weather-icon-' + this.Ahora.IdClima);
        }

      });

      Handlebars.registerHelper('weatherNow', function(options){

       if(this.Ahora.Temperatura != undefined){
        
        return options(this);
       
       }

      });

      Handlebars.registerHelper('extendido', function(o){

       return new Handlebars.SafeString(this.Extendidos[0][o]);

      });

    },

    footer: function(){

      var count = 1;

      Handlebars.registerHelper('getIndex', function(){

        return new Handlebars.SafeString(count++);

      });

      Handlebars.registerHelper('setIndex', function(){
        var count = 1;
        return; 
      });
      
      Handlebars.registerHelper('getCountDown', function(){

        var timer = new Date().getMinutes() * 60 + new Date().getSeconds() - new Date(this.field_duration_date[0].value2 * 1000).getMinutes()*60 + new Date(this.field_duration_date[0].value2 * 1000).getSeconds();

        return new Handlebars.SafeString(Math.abs(timer));

      });

      Handlebars.registerHelper('getImageThumb',function(){

        if(this.media != null){

          if(this.media.image_thumb != null){
          
            if(/next.tn|tn.com/.test(this.media.image_thumb)){

              var temp = this.media.image_thumb.split('/'),
                  gen  =  temp[3] + "/" + temp[4] + "/" + temp[5] + "/" + temp[6] + "/" + temp[7] + "/" + temp[8] + "/" + temp[9] + "/" + temp[10] + "/" + temp[11];

              return new Handlebars.SafeString("http://tn.com.ar/" + gen);
            
            }else{
            
              return new Handlebars.SafeString(this.media.image_thumb);
            
            }
   
          }

        }

      });

      Handlebars.registerHelper('reply',function(options){

        if(this.replies != undefined){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('isImage', function(options){

        if(this.media != null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('isVideo', function(options){

          if(this.media != undefined && this.media.type == 'video'){
            
            return options(this);
          
          }

      });

      Handlebars.registerHelper('isGallery', function(options){

          if(this.media != undefined && this.media.type == 'gallery'){

            return options(this);
          
          }

      });

      Handlebars.registerHelper('gallery', function(){

          return new Handlebars.SafeString(this.media.image);

      });

      Handlebars.registerHelper('index', function(from,to,options){

        index++;
        
        if(from < index){
          this.indice = (index - from);

          if(to > index){
            return options(this);
          }else{
            return options.inverse(this);
          }

        }

      });

      Handlebars.registerHelper('denied', function(options){

        if(this.denied != true || this.denied == undefined || this.denied == null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('date', function(){

        return new Handlebars.SafeString(this.created.split(" - ")[0]);

      });

      Handlebars.registerHelper('time', function(){

        return new Handlebars.SafeString(this.created.split(" - ")[1]);

      });

      Handlebars.registerHelper('className', function(key, xclass){

        if(index == key){
          return new Handlebars.SafeString(xclass);
        }

      });

      Handlebars.registerHelper('isAvatar', function(options){

        if(this.avatar != null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('isMedia', function(options){

        if(this.media != undefined && this.media.type != 'image'){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

    }

  }

}