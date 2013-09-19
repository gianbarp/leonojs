(function ($) {
    var getScroll = function () {
        if (typeof getScroll.x == 'undefined') {
            getScroll.x = window.pageXOffset;
            getScroll.y = window.pageYOffset;
        }
        if (typeof getScroll.distanceX == 'undefined') {
            getScroll.distanceX = window.pageXOffset;
            getScroll.distanceY = window.pageYOffset;
        } else {
            getScroll.distanceX = window.pageXOffset - getScroll.x;
            getScroll.distanceY = window.pageYOffset - getScroll.y;
        }
        var diffX = getScroll.x - window.pageXOffset,
            diffY = getScroll.y - window.pageYOffset;
        
        getScroll.direction = diffX < 0 ? 'right' : diffX > 0 ? 'left' : diffY <= 0 ? 'down' : diffY > 0 ? 'up' : 'first';
        getScroll.x = window.pageXOffset;
        getScroll.y = window.pageYOffset;
    };
    
    $(window).on('scroll', getScroll);
    
    var getCSS = function (el, style) {
        if (typeof el.cssClone == 'undefined') {
            el.cssClone = el.clone().css('display', 'none');
            el.cssClone.find('input:radio').attr('name', 'sfd4fgdf');
            el.after(el.cssClone);
        }
        var clone = el.cssClone[0];
        if (typeof style != 'undefined') {
            var value;
            if (clone.currentStyle) {
                value = clone.currentStyle[style.replace(/-\w/g, function (s) {
                    return s.toUpperCase().replace('-', '')
                })];
            } else if (window.getComputedStyle) {
                value = document.defaultView.getComputedStyle(clone, null).getPropertyValue(style);
            }
            value = (/margin/g.test(style)) ? ((parseInt(value) === el[0].offsetLeft) ? value : 'auto') : value;
        }
        return {
            value: value || null,
            remove: function () {
                el.cssClone.remove();
            }
        };
    };
    
    $.fn.extend({
        stickier: function (options, reinit) {
            if (this.length == 0) return this;
            var settings = options || {}, running = (this.data('stickier')) ? true : false,
                $window = $(window),
                $document = $(document);
            if (typeof settings == 'string') {
                switch (settings) {
                case 'reinit':
                    $window.off('scroll', this.data('stickier').f);
                    return this.stickier({}, true);
                    break;
                case 'off':
                    this.data('stickier', $.extend(this.data('stickier'), {
                        on: false
                    }));
                    break;
                case 'on':
                    this.data('stickier', $.extend(this.data('stickier'), {
                        on: true
                    }));
                    break;
                }
                return this;
            } else if (typeof settings == 'object') {
                if (!running) {
                    this.data('stickier', $.extend({
                        top: 0,
                        bottom: 0,
                        bottomEnd: 0,
                        bottomLimiter: null,
                        innerTop: 0,
                        innerSticker: null,
                        ezequielLimiter: 0,
                        className: 'sticky',
                        wrapperClassName: 'wrapper-sticky',
                        noContainer: false,
                        responsive: false,
                        followScroll: true,
                        onStart: function () {},
                        onStop: function () {},
                        on: true
                    }, settings));
                    var $bottom_limiter = this.data('stickier').bottomLimiter;

                    if ($bottom_limiter !== null && this.data('stickier').noContainer ) {                  
                        this.data('stickier', $.extend(this.data('stickier'), {
                            bottomEnd: $document.height() - $bottom_limiter.offset().top + this.data('stickier').ezequielLimiter
                        }));

                        //alert(this.data('stickier').bottomEnd);
                    }
                } else {
                    this.data('stickier', $.extend(this.data('stickier'), settings));
                } if (running && !reinit) {
                    return this;
                }
            }
            return this.each(function () {
                var $this = $(this),
                    $parent = $this.parent(),
                    $wrapper = (function () {
                        var $this_wrapper = $this.parent('.' + $this.data('stickier').wrapperClassName);
                        if ($this_wrapper.length > 0) {
                            $this_wrapper.css({
                                'height': $this.outerHeight(true),
                                'width': (function () {
                                    var width = getCSS($this_wrapper, 'width').value;
                                    getCSS($this_wrapper).remove();
                                    if (width.indexOf('%') >= 0 || width == 'auto') {
                                        $this.css('width', $this_wrapper.width());
                                        return width;
                                    } else {
                                        return $this.outerWidth(true);
                                    }
                                })()
                            });
                            return $this_wrapper;
                        } else {
                            return false;
                        }
                    })() || (function () {
                        var $this_wrapper = $('<div>', {
                            'class': $this.data('stickier').wrapperClassName
                        }).css({
                            'height': $this.outerHeight(true),
                            'width': (function () {
                                var width = getCSS($this, 'width').value;
                                if (width.indexOf('%') >= 0 || width == 'auto') {
                                    $this.css('width', parseFloat($this.css('width')));
                                    return width;
                                } else {
                                    var margin = getCSS($this, 'margin-left').value;
                                    return (margin == 'auto') ? $this.outerWidth() : $this.outerWidth(true);
                                }
                            })(),
                            'margin': (getCSS($this, 'margin-left').value) ? 'auto' : null,
                            'position': (function () {
                                var position = $this.css('position');
                                return position == 'static' ? 'relative' : position;
                            })(),
                            'float': $this.css('float') || null,
                            'left': getCSS($this, 'left').value,
                            'right': getCSS($this, 'right').value,
                            'top': getCSS($this, 'top').value,
                            'bottom': getCSS($this, 'bottom').value
                        });
                        $this.wrap($this_wrapper);
                        return $this.parent();
                    })(),
                    setFixed = function (args) {
                        if ($this.hasClass($this.data('stickier').className)) return;
                        args = args || {};
                        $this.css({
                            position: 'fixed',
                            top: args.top || 0,
                            left: args.left || $wrapper.offset().left
                        }).addClass($this.data('stickier').className);
                        $this.data('stickier').onStart.apply(this);
                    }, reset = function (args) {
                        args = args || {};
                        $this.css({
                            position: args.position || 'absolute',
                            top: args.top || 0,
                            left: args.left || 0
                        }).removeClass($this.data('stickier').className);
                        $this.data('stickier').onStop.apply(this);
                    };
                    
                getCSS($this).remove();

                $this.css({
                    top: 'auto',
                    bottom: 'auto',
                    left: 'auto',
                    right: 'auto'
                });

                if ($this.outerHeight(true) > $parent.height()) return this;
                $(window).load(function () {
                    if ($this.outerHeight(true) > $parent.height()) {
                        $wrapper.css('height', $this.outerHeight(true));
                        $this.stickier('reinit');
                    }
                });
                var f = function (init) {

                    if($this.data('stickier') == undefined){
                      
                      return;
                    }

                    $referrer = ($this.data('stickier').noContainer) ? $document : $wrapper.parent();
                    
                    if (!$this.data('stickier').on || $this.outerHeight(true) >= $referrer.height()) return;
                    
                    var top_spacing = ($this.data('stickier').innerSticker) ? $($this.data('stickier').innerSticker).position().top : (($this.data('stickier').innerTop) ? $this.data('stickier').innerTop : 0),
                        wrapper_inner_top = $wrapper.offset().top,
                        bottom_limit = $referrer.height() - $this.data('stickier').bottomEnd + ($this.data('stickier').noContainer ? 0 : wrapper_inner_top),
                        top_limit = $wrapper.offset().top - $this.data('stickier').top + top_spacing,
                        this_height = $this.outerHeight(true) + $this.data('stickier').bottom,
                        window_height = $window.height(),
                        offset_top = $window.scrollTop(),
                        this_document_top = $this.offset().top,
                        this_window_top = this_document_top - offset_top,
                        bottom_distance;
                    
                    if (offset_top >= top_limit) {
                        if (bottom_limit + $this.data('stickier').bottom - ($this.data('stickier').followScroll ? 0 : $this.data('stickier').top) <= offset_top + this_height - top_spacing - ((this_height - top_spacing > window_height - (top_limit - top_spacing) && $this.data('stickier').followScroll) ? (((bottom_distance = this_height - window_height - top_spacing) > 0) ? bottom_distance : 0) : 0)) {
                            reset({
                                top: bottom_limit - this_height + $this.data('stickier').bottom - wrapper_inner_top
                            });
                        } else if (this_height - top_spacing > window_height && $this.data('stickier').followScroll) {
                            if (this_window_top + this_height <= window_height) {
                                if (getScroll.direction == 'down') {
                                    setFixed({
                                        top: window_height - this_height
                                    });
                                } else {
                                    if (this_window_top < 0 && $this.css('position') == 'fixed') {
                                        reset({
                                            top: this_document_top - (top_limit + $this.data('stickier').top - top_spacing) - getScroll.distanceY
                                        });
                                    }
                                }
                            } else {
                                if (getScroll.direction == 'up' && this_document_top >= offset_top + $this.data('stickier').top - top_spacing) {
                                    setFixed({
                                        top: $this.data('stickier').top - top_spacing
                                    });
                                } else if (getScroll.direction == 'down' && this_document_top + this_height > window_height && $this.css('position') == 'fixed') {
                                    reset({
                                        top: this_document_top - (top_limit + $this.data('stickier').top - top_spacing) - getScroll.distanceY
                                    });
                                }
                            }
                        } else {
                            setFixed({
                                top: $this.data('stickier').top - top_spacing
                            });
                        }
                    } else {
                        reset();
                    } if (init === true) {
                        $this.css('top', ($this.css('position') == 'fixed') ? $this.data('stickier').top - top_spacing : 0);
                    }
                };
                
                var resize_timeout = false,
                    $resize_clone = false;

                function onResize() {
                    if ($this.data('stickier').responsive) {
                        if (!$resize_clone) {
                            $resize_clone = $this.clone().attr('style', '').css({
                                visibility: 'hidden',
                                height: 0,
                                overflow: 'hidden',
                                paddingTop: 0,
                                paddingBottom: 0,
                                marginTop: 0,
                                marginBottom: 0
                            });
                            $wrapper.after($resize_clone);
                        }
                        if (getCSS($resize_clone, 'width').value != getCSS($wrapper, 'width').value) $wrapper.width(getCSS($resize_clone, 'width').value);
                        getCSS($wrapper).remove();
                        if (resize_timeout) {
                            clearTimeout(resize_timeout);
                        }
                        resize_timeout = setTimeout(function () {
                            
                            resize_timeout = false;
                            getCSS($resize_clone).remove();
                            $resize_clone.remove();
                            $resize_clone = false;
                        }, 100);
                    }
                    if ($this.css('position') == 'fixed') {
                        $this.css('left', $wrapper.offset().left);
                    } else {
                        $this.css('left', 0);
                    } if ($this.width() != $wrapper.width()) $this.css('width', $wrapper.width());
                }
                
                $window.on('resize', onResize);
                
                $this.data('stickier', $.extend($this.data('stickier'), {
                    f: function () {}
                }));
                
                $this.data('stickier', $.extend($this.data('stickier'), {
                    f: f
                }));
                
                $this.data('stickier').f(true);
                $window.on('scroll', $this.data('stickier').f);
            });
        }
    });
})(jQuery);