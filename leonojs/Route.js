/*!
 *
 * jQuery Route
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
@module Route
**/

"use stricts";

if(!Function.prototype.appbind){
  Function.prototype.appbind = function(){ 
    var fn = this, args = Array.prototype.slice.call(arguments),
        object = args.shift(); 
    return function(){ 
      return fn.apply(object, 
        args.concat(Array.prototype.slice.call(arguments))); 
    }; 
  };
}

/**
@class Route
@constructor
**/

function Route(datapage){

  this.datapage = datapage;

}

  /**
  @method get
  @return {String} data position
  @param dataAttr {String} data-item
  @param callback {Function} object  
  **/

Route.prototype.get = function(callback)
{
	var elementSys = document.getElementsByTagName('body')[0];
	var self = this;

	return elementSys.getAttribute(this.datapage);

}

  /**
  @method actions
  @return {Array}
  @param data {String} data-item
  @param callback {Function} object  
  **/

Route.prototype.action = function(data,callback)
{

	var self = this;
	return new Route().dataSort(data,callback);

}

  /**
  @method dataSort
  @return {Object}
  @param data {String} data-item
  @param switched {Function} object  
  **/

Route.prototype.dataSort = function(data,switched)
{
	return switched.call(this, data);
};

  /**
  @method when
  @return {Object}
  @param page {String} position page
  @param parts {Json} options page  
  **/

Route.prototype.when = function(page,parts)
{

	var self = this,
		temporizr = false;

	(new Route('data-page').get() == page && (typeof parts.onRoute == 'function')) ? parts.onRoute.apply(self,arguments) : false;

	setTimeout(function(){	
    (new Route('data-page').get() == page && typeof parts.onComplete == 'function') ? parts.onComplete.apply(self,arguments) : false;
  },300);

}

  /**
  @method ever
  @return {Object}
  @param parts {Json} options page
  @param prefix {String}
  @param not {String} no excutable   
  **/

Route.prototype.ever = function(parts,prefix,not)
{

  if(not.indexOf(prefix) !== -1){
    
  }else{
    (typeof parts.onEver == 'function') ? parts.onEver.apply(self,arguments) : false;
  }

}

  /**
  @method conditions
  @return {Object}
  @param conditional {String} position page
  @param callback {Object}   
  **/

Route.prototype.condition = function(conditional,callback)
{

  return (conditional == 'ever') ? callback.apply(self,arguments) : new Route().rule(this,conditional,callback);

}

  /**
  @method rules
  @return {Object}
  @param conditional {String} positions page
  @param callback {Object}   
  **/

Route.prototype.rule = function(self,conditional,callback)
{

  var dom = document.getElementsByTagName('body')[0].getAttribute(self.datapage);

  if(dom.indexOf(conditional) !== -1 && (typeof conditional != 'object')){
    
    //

    callback.apply(self,arguments)
  
  }else if(typeof conditional == 'object'){

    //

    for(var i in conditional){

      (dom == conditional[i]) ? callback.apply(self,arguments) : false;

    }

  }

}

Route.prototype.getMethods = function(arr)
{

  var res = [];

  for(var m in arr){
    /*if(typeof obj[m] == "function"){
      res.push(m);
    }*/

    res.push(arr[m]);

  }

  return res;

}

/*Route.prototype.httpHost = function(){

  var arr = [this['test'], this['local'], this['extralocal']];

  if (!window.location.origin) window.location.origin = window.location.protocol+"//" + window.location.host;

  for(var i in arr){

    if(new RegExp(arr[i].split(" >> ")[0]).test(window.location.host) && new RegExp(arr[i].split(" >> ")[1]).test(window.location.pathname)){

      var hostgen = window.location.origin + "/" + arr[i].split(" >> ")[1] + "/";

    }

  }

  return hostgen;

}*/

Route.prototype.getPath = function(){
  
  var str = location.pathname.split('/')[1];

  return str;

}