TN.evil = {}

TN.evil.carrousel = function(o) {
  var that = {};

  o = $.extend({'search': ' '}, o);

  var tw = new TWTR.Widget({
    id: o.id,
    type: o.type,
    search: o.search,
    width: 950, height: 534, interval: 4000, subject: "", title: "", rpp: 20, footer: "",
    theme: { shell: { background: '#1deb25', color: '#ffffff' }, tweets: { background: 'inherited', color: 'blue', links: '#1895CA' } },
    features: { avatars: true, hashtags: true, timestamp: true, fullscreen: false, scrollbar: false, live: true, loop: true, behavior: 'default', dateformat: 'absolute', toptweets: true }
  });

  var new_creator = function(o) {
    var t = new tw.original_creator(o);
    var e = document.createElement('li');
    e.className = 'twtr-tweet';
    e.innerHTML = t.element.innerHTML;
    this.element = e;
  };

  tw._getWidgetHtml = function() {
     var html='<div class="content twtr-widget twtr-timeline"><div class="twtr-reference-tweet"></div><ul id="twtr-container" class="twtr-container"></ul></div>';
     return html;
  };

  tw._appendTweet = function(el) {
    var $u = $('#twtr-container');
    if ($u.find('li').length > tw.rpp - 3) {
     $u.css('width', ($u.width()+315)+'px');
     $u.find('li:first').remove();
    };
    $u.append(el);
    $u.parents('section').find('.next').trigger('click');
    return tw;

  };

  tw.set_tweet_creator(new_creator);
  tw.render();
  if (o.type == 'list') { tw.setList(o.owner, o.list); }
  tw.start();
};


TN.evil.init = function(){
  if ($('#twitter-carrousel').length == 0) {return false;};
  
  TN.evil.carrousel({'id': 'twitt-box', 'type': 'search', 'search': $('#twitter-carrousel').find('.search').data('search')});
  
  $('#twitter-carrousel').jCarrouselLite({
    btnNext: '.next',
    btnPrev: '.prev',
    visible: 3,
    circular: false,
    speed: 1000,
    dynamic: true,
    dyn_item_size: 315,
    dyn_length: 20    
  });  
};













(function($) {                                          // Compliant with jquery.noConflict()
  $.fn.jCarrouselLite = function(o) {
      o = $.extend({
          btnPrev: null,
          btnNext: null,
          btnGo: null,
          mouseWheel: false,
          auto: null,
          wrapper: 'ul',
          element: 'li',        

          speed: 200,
          easing: null,

          vertical: false,
          circular: true,
          visible: 3,
          start: 0,
          scroll: 1,

          beforeStart: null,
          afterEnd: null,
          dynamic: null,
          dyn_length: 0,
          dyn_item_size: 0,
          autohide: false
      }, o || {});

      return this.each(function() {                           // Returns the element collection. Chainable.

          var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
          //var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;
          var div = $(this), ul = $(o.wrapper, div), tLi = $(o.element, ul), tl = tLi.size(), v = o.visible;

          if(o.circular) {
              ul.prepend(tLi.slice(tl-v-1+1).clone())
                .append(tLi.slice(0,v).clone());
              o.start += v;
          }

          //var li = $("li", ul), itemLength = li.size(), curr = o.start;
          var li = $(o.element, ul), itemLength = li.size(), curr = o.start;
          div.css("visibility", "visible");

          var fl = (o.vertical ? "none" : "left");
          li.css({"overflow": "hidden", "float": fl});
          ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
          div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

          var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
          var ulSize;                                         // size of full ul(total length, not just for the visible items)
          
          if (o.dynamic) {
            ulSize = o.dyn_item_size * o.dyn_length;
          } else {
            ulSize = liSize * itemLength;
          }
          var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

          li.css({width: li.width(), height: li.height()});
          ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

          div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images
          
          if(o.btnPrev) {
            $(this).find(o.btnPrev).click(function() {
                return go(curr - o.scroll);
            });
          }
    
          if(o.btnNext) {
            $(this).find(o.btnNext).click(function() {
                  return go(curr + o.scroll);
              });
          }        

          /*
          if(o.btnPrev)
              $(o.btnPrev).click(function() {
                  return go(curr-o.scroll);
              });

          if(o.btnNext)
              $(o.btnNext).click(function() {
                  return go(curr+o.scroll);
              });
          */
          /*
          if(o.btnGo)
              $.each(o.btnGo, function(i, val) {
                  $(val).click(function() {
                      return go(o.circular ? o.visible+i : i);
                  });
              });
          */
          
          /*
          if ((o.btnPrev) || (o.btnNext)) {
            $(this).find(o.btnPrev).fadeIn('slow');
            $(this).find(o.btnNext).fadeIn('slow');
          }        
          */
          
          if(o.btnGo){
            $(this).find(o.btnGo).click(function(){
              var i = $(this).data('index') || $(this).index();
              //return go(o.circular ? o.visible + $(this).data('index') : $(this).data('index'));
              return go(o.circular ? o.visible + i : i);
            });
          }        
          
          
          if(o.mouseWheel && div.mousewheel)
              div.mousewheel(function(e, d) {
                  return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
              });

          if(o.auto)
              setInterval(function() {
                  go(curr+o.scroll);
              }, o.auto+o.speed);

          function vis() {
              return li.slice(curr).slice(0,v);
          };

          function go(to) {
            if (o.dynamic) {
              li = $(o.element, $(o.wrapper,div));
              itemLength = li.size();
              liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
              ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
              divSize = liSize * v;                           // size of entire div(total length for just the visible items)
            }
            if(!running) {
              
              if (o.autohide == true){
                itemLength = $(o.wrapper).find($(o.element + ':visible')).length;
                //
              }             

                if(o.beforeStart)
                    o.beforeStart.call(this, vis(), curr);

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<=o.start-v-1) {           // If first, then goto last
                        ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
                        curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
                    } else if(to>=itemLength-v+1) { // If last, then goto first
                        ul.css(animCss, -( (v) * liSize ) + "px" );
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
                        curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                }                           // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                //var ul = $('ul',div);
                ul.animate(
                    animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis(), curr);
                        running = false;
                    }
                );
               
                // Disable buttons when the carrousel reaches the last/first, and enable when not
                if(!o.circular) {
                    $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                }

              }
              return false;
          };
      });

      function css(el, prop) {
          if (el.length === 0) return 0;
          return parseInt($.css(el[0], prop)) || 0;
      };
      function width(el) {
          if ((el.length === 0) && (o.dynamic)) {
            return 3000;
          };
          return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
      };
      function height(el) {
          if (el.length === 0) return 0;
          return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
      };

    };

  })(jQuery);