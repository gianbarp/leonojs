Sticky = {};

Sticky.exe = {

	position: function(el){

	    var _x = 0;
	    var _y = 0;

	    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {

	        _x += el.offsetLeft - el.scrollLeft;
	        _y += el.offsetTop - el.scrollTop;
	        el = el.offsetParent;
	    }

	    return { top: _y, left: _x };

  	},

	hasClass: function(el, name){

		return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);

	},

	addClass: function(el, name){

		if (!Sticky.exe.hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }

	},

	removeClass: function(el, name){

   if (Sticky.exe.hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }

	},

	delegate: function(obj, type, fn){

	    if ( obj.attachEvent ) {

	      obj['e'+type+fn] = fn;

	      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}

	      obj.attachEvent( 'on'+type, obj[type+fn] );

	    }else{

	      obj.addEventListener( type, fn, false );

	   }

  	},

	css: function(selector,prop){

    for(var i in prop){

      selector.style[i] = prop[i];

    }

    return selector;

	},

	evaluate: function(){
		
		for (var i = 1; i < arguments.length; i++){ 
     
    		
 		
 		}

	},

	app: function(options){

		var st = Sticky.exe,
        docHeight = document.body.scrollHeight,
        stop = docHeight - options.stop,
        start = options.fixed; //st.position(options.element).top - ;

	    st.delegate(window, 'scroll', function(){

	      var elementPosition = st.position(options.element),
	          scrollY = window.pageYOffset,
	          height = options.element.offsetHeight;
	  
	      if (scrollY < (start + options.paddingBanner)){

	          st.css(options.element,{
	              position: 'static',
	              top: st.position(options.element).top + 'px',
	              left: st.position(options.element).left + 'px'
	          });

            st.removeClass(options.element,'static');

            st.evaluate();

	      }else if(parseInt(scrollY + height + options.paddingBanner * 2) > stop){

	        var num = stop - scrollY - height - options.paddingBanner;

	        st.css(options.element,{
	              position: 'fixed',
	              top: num + 'px',
	              left: st.position(options.element).left + 'px'
	          });

          st.addClass(options.element,'static');

          st.evaluate();

	      }else if(scrollY > (start + options.paddingBanner)){

	          st.css(options.element,{
	              top: options.paddingHeader + 'px',
	              position: 'fixed',
	              left: st.position(options.element).left + 'px'
	          });

            st.addClass(options.element,'static');

            st.evaluate();

	      }

	    });

		if(st.position(options.element).top != options.fixed){
			setTimeout(function(){
				window.scrollBy(0,1); 
			},10);
		}

	}

}

window.onload = function(){

  var fixio = 0,
    fixalertio = 0,
    bannertopx = 0,
    ractions = 0,
    fixalertioweather = 0;

  if (document.getElementById('menu-sections') !== null) {

  	setTimeout(function(){

    if(document.getElementById('widget-wrap') != null) fixio = document.getElementById('widget-wrap').offsetHeight;
    if(document.getElementById('alert-wrap') != null) fixalertio = document.getElementById('alert-wrap').offsetHeight;
    if(document.getElementById('alert-wrap-weather') != null) fixalertioweather = document.getElementById('alert-wrap-weather').offsetHeight;
    if(document.getElementById('Top950x50') != null) bannertopx = document.getElementById('Top950x50').offsetHeight;
    if(document.getElementById('interactions') != null) ractions = document.getElementById('interactions').offsetHeight;

    	Sticky.exe.app({
        
	        element: document.getElementById('menu-sections'),
	        stop: document.body.scrollHeight - document.getElementById('footer').offsetTop,
	        fixed: document.getElementById('header-top').offsetHeight + fixio + fixalertio + bannertopx + ractions + fixalertioweather,
	        paddingBanner: 0,
	        paddingHeader: 0

	      });

    },2500);

  }

  }