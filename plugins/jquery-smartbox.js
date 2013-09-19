/*!
 *
 * jQuery Smartbox
 * Version: 1.0.4
 * Original author: Giancarlo Barrientos
 * Support && crowsource: @gianbarp
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

// namespace

var SMARTBOX = SMARTBOX || {};

// bull configure

!(function(){_ = $ || _;SMARTBOX = _.SMARTBOX}()); // Underline pattern "_" underscore.js inspired :P

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.

;(function ( $, window, document, undefined ) {

	// options
	var defaults = {

		/* plugin version*/
		version: '1.0.4',

    	  url : null,
    	  timer: 1000,
    	  scrolling: "no",
    	  iframeID: "iframeID",
    	  loader: "../../images/preloader.svg",
    	  overlay: '#overlay',
    	  seamless: true,
    	  auto: false,
    	  content: null,
    	  wrapper: '.box',
    	  swf: {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},
    	  text: '',
    	  aligner: '#box',
		  close:  '.boxclose, .close',
    	  content: '#boxContent',
    	  corpo: 'body',
		  divGen: "<div id='overlay' class='overlay'></div><div class='box' id='box'><a class='boxclose' id='boxclose'>x</a><div id='boxContent'></div></div>"
	    }

    // The actual plugin constructor
	function Plugin( element, options, type, img ) {
	    this.element = element;

	    this.options = $.extend( {}, defaults, options);
	    
	    this._defaults = defaults;
	    this._name = 'SMARTBOX';

	    // Place initialization logic here
	    this.init( type, img );

	    return this; 
	}

	// Prototypes

	Plugin.prototype.init = function( type, img ) {
		
		if(type != '' || img != false){ this.appendHTML(); }
		this.ESC();

		switch( type ){
			case 'ajax':
			this.runAJAX( type, this.close() );
			break;

			case 'html':
			this.runHTML( type, this.close() );
			break;

			case 'iframe':
			this.runIFRAME( type, this.close() );
			break;

			case 'swf':
			this.runSWF( type, this.close() );
		}
	}

	Plugin.prototype.appendHTML = function(){
		$(this.options.corpo).append(this.options.divGen);
        $(this.options.overlay).fadeIn(250);
	}

	Plugin.prototype.runAJAX = function(url, type, callback){
		
		var URL = (this.options.url == null)? url : this.options.url;

		$(this.options.content).append("<img class='box-loader' src='"+this.options.loader+"'/>").delay(10000);
		$(this.options.content).load(URL,function(){
			$(this).fadeIn(250);
		});
        $(this.options.wrapper).fadeIn(250);

     	if(typeof callback == "function"){ callback.call(this); }

     	this.align();
	}
	
	Plugin.prototype.runHTML = function( type, callback){
		$(this.options.content).append(this.options.text);
        $(this.options.wrapper).fadeIn(250);
        this.align();  
     	if(typeof callback == "function"){ callback.call(this); }
	}
	
	//Createelement is better way for create an element
	//http://stackoverflow.com/questions/268490/jquery-document-createelement-equivalent
	
	Plugin.prototype.runIFRAME = function( type, callback ){
		iframe = document.createElement('iframe');
		iframe.id = this.options.iframeID;
		iframe.src = this.options.url;
		iframe.scrolling = this.options.scrolling;
		iframe.width = 100 + "%";
		iframe.height = 100 + "%";
		
		if(this.options.seamless == true){
		 $("#"+this.options.iframeID).attr('seamless','seamless');
		}
		
		$(this.options.content).append(iframe);
		$(this.options.wrapper).fadeIn(250);
		this.align();
	}

	Plugin.prototype.runSWF = function(url, type, callback){

		var URL = (this.options.url == null)? url : this.options.url;

		var content, embed;

		content = '<object id="smartbox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + URL + '"></param>';
		
		embed   = '';

		$.each(this.options.swf, function(name, val) {
			content += '<param name="' + name + '" value="' + val + '"></param>';
			embed   += ' ' + name + '="' + val + '"';
		});

		content += '<embed src="' + URL + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';

		$(this.options.content).append(content);
		$(this.options.wrapper).fadeIn(250);
		this.align();

	}

	//automatic shorthand

	$.auto = function(type, url,callback){

		var inst = new Plugin(this,null,'',false);
		this.options = $.extend( {}, defaults);	
		
		switch( type ){

		/* AJAX CASE */	
		  
		  case 'ajax':
			inst.appendHTML();
			inst.close();
		  	inst.runAJAX(url);

		  	if(typeof callback == 'function' && callback != undefined){
		  		callback();
		  	}

		  break;
		 
		 /* SWF CASE */

		  case 'swf':
			inst.appendHTML();
			inst.close();
		  	inst.runSWF(url);
		  break;

		  /* HTML CASE */

      case 'html':
        inst.appendHTML();
        inst.close();
        inst.runHTML(type,url);
      break;

		/* DEFAULT CASE */

		  default:
		  	inst.appendHTML();
		  	inst.close();

		  	if(typeof type == 'string'){
	  			$(this.options.content).append(type);
	  			$(this.options.wrapper).fadeIn(250);

				if(typeof url == 'function'){
					url.call(this);
				}

	  		}else if(typeof type == 'function'){

	  			type.call(this);

	  		}
		}

	}
	
	//Public method for trigger runIMG event
	$.runIMG = function( id ){

		var inst = new Plugin(this,null,'',false);
		inst.ESC();
		
		$("#"+id).click(function(){
			inst.appendHTML();
			inst.close();
			
			img = document.createElement('img');
			img.src = $("#"+id).data("bigger");

			$.runIMG.addIMG(inst, img);
	 
		});
	}
	
	$.runIMG.addIMG = function(inst, img){
		this.options = $.extend( {}, defaults);	
		$(this.options.content).append(img);
		inst.align();
		$(this.options.wrapper).fadeIn(250);
	}
	
	Plugin.prototype.ESC = function(){
		$(document).bind('keydown',function(e){
			if(e.which == 27){
			  $(".box").fadeOut(250);
			  $("#overlay").fadeOut(250,function(){                    
				 $("#overlay, #box").remove();
			  });
			}
		});
	}

	// BAD ALIGN
	Plugin.prototype.align = function(){
	    var w = $(window).width();
	    var h = $(window).height();

	    var wP = $(this.options.aligner).width();
	    var hP = $(this.options.aligner).height();

	    w = (w/2*100)/w+"%";
	    h = (h/2*100)/h+"%";

	    $(this.options.aligner).css({
	    	"left": w,
	    	"top": h
	    });
	}

	Plugin.prototype.close = function(){
		$(this.options.close+","+this.options.overlay).live('click',function(){
		   $(".box").fadeOut(250);
		   $("#overlay").fadeOut(250,function(){                    
			 $("#overlay, #box").remove();
		   });
		});
	}

	Plugin.prototype.destroy = function(){
		return this.each(function(){
         $(window).unbind('.F15');
        });
	}

	// management

  $.Smartbox = function( name, callback ){
		
	name = (name == undefined) ? 'F15' : name;
    
    $.fn[name] = function ( type, options, callback ) {
        return this.each(function(){
        		$(this).live('click',function(e){
        			e.preventDefault();
					$.data(this, name, new Plugin( this, options, type));

					setTimeout(function(){
						callback.call(this)
					},1000);

        		});
        });
      };
      
     // Callback function
     if(typeof callback == "function"){
		  	callback.call(this);
		  }

 	};
 	
})( jQuery, window, document );