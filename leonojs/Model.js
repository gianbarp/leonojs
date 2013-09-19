/*!
 *
 * jQuery Model
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
@module Model
**/

"use stricts";

TN.app = function(){}
//var TN = function(){};

/**
@class <
@constructor
**/

function extend(bob, alice){
  
    if ( (bob == undefined) || (alice == undefined)) {return false;}
  
    function _(){};
    _.prototype = alice.prototype;
    bob.prototype = new _;
    bob.prototype.constructor = bob;
    bob.prototype.parent = alice;
};

/**
 * @class Prototype
 * @constructor
 * @param arguments {String} arguments
 */

TN.app = function(){

  /**
  @method carrier set get
  @return {obj|string|num|bool}
  **/

  this.carrier = function(team,identifier){

    this.team = team;
    this.identifier = identifier;

  }

  this.drop = function(identifier){

    if(identifier == this.identifier){

      return this.team;

    }

  }

  this.forEachPost = function(obj){

    for(var i in obj){

      $.post(obj[i].url);

    }

  }

}

TN.app.prototype = (function(){

  /**
  @method run
  @return {Object}
  **/

	var run = function(){  };

  /**
  @method async
  @return {String}
  **/

  var async = function(id,asyncstatus,src,callback){

    var js = document.createElement('script');
    js.id = id;
    js.async = asyncstatus;
    js.src = src;
    
    document.getElementsByTagName('head')[0].appendChild(js);

    return callback.call(this);

  }

  /**
  @method heredoc
  @return {String}
  **/

  var heredoc = function(str){

      var here = "<<",
          end = ">>";

      var reobj = new RegExp("/\\*"+here+"\\n[\\s\\S]*?\\n"+end+"\\*/", "m");
      str = reobj.exec(str).toString();
      str = str.replace(new RegExp("/\\*"+here+"\\n",'m'),'').toString();
      
      return str.replace(new RegExp("\\n"+end+"\\*/",'m'),'').toString();

  }

  /**
  @method addEvent
  @return {Object} event
  @param obj {Object}
  @param type {String}
  @param fn {Function}  
  **/

  var addEvent = function(obj, type, fn){
    if ( obj.attachEvent ) {

      obj['e'+type+fn] = fn;

      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}

      obj.attachEvent( 'on'+type, obj[type+fn] );

    }else{

      obj.addEventListener( type, fn, false );

   }

  };

  /**
  @method fusionFile
  @return {JSON}
  @param files {string}  
  **/

  var fusionFiles = function(file1,file2,callback){

    var st = new TN.app(),
        obj = null;

    st.getJson(file1,function(data){ store.set('a',data) });
    st.getJson(file2,function(data){ store.set('b',data); setTimeout(function(){ callback(); },2000); });

  }

  /**
  @method loadAsync
  @return {Object} include total sync page 
  @param load {String} page
  @param callback {Function}  
  **/

  var loadAsync = function(load,callback){

    
    

    var xhr,
        xh;

    if(typeof XMLHttpRequest !== 'undefined'){ 
      xhr = new XMLHttpRequest();
    }else{

      var versions = ["MSXML2.XmlHttp.5.0",
                      "MSXML2.XmlHttp.4.0",
                      "MSXML2.XmlHttp.3.0",
                      "MSXML2.XmlHttp.2.0",
                      "Microsoft.XmlHttp"];

       for(var i = 0, len = versions.length; i < len; i++) {
        try {

          xhr = new ActiveXObject(versions[i]);
          break;

        }
        catch(e){

          

        }

       } // end for
    }
    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
      if(xhr.readyState < 4) {
        return;
      }

      if(xhr.status !== 200) {
        
        return;
      }


      if(xhr.readyState === 4) {

        

        xh = eval( "(" + xhr.responseText + ")" );

        callback(xh);

      }

    }

    xhr.open('GET', load, true);
    xhr.send('');

    

  }

  /**
  @method db
  @return {Object} localstorage item
  @param key {String} localstorage Key
  @param jsonData {String} file
  @param expirationMin {Number} 
  **/

  var db = function(key,jsonData,expirationMin){

      if(expirationMin == false){ return;

      }else{

        var expirationMS = expirationMin * 60 * 1000;
        jsonData.push({ denied: true, timestamp: new Date().getTime() + expirationMS });

        if(jsonData[0] != null){

          store.set(key,jsonData);
        
        }

      }

  };

  /**
  @method dbTimestamp
  @return {Object} timestamp
  @param key {String} localstorage item
  **/

  var dbTimestamp = function(key){

    var dbTimestampStore = store.get(key);

    if(dbTimestampStore[0] != null){

      for(var i in dbTimestampStore){

        if(dbTimestampStore[i].timestamp != undefined || dbTimestampStore[i].timestamp != null){

         return (new Date().getTime() < dbTimestampStore[i].timestamp) ? true : false;

        }

      }

    }
  
  };

  /**
  Renders objects
  @method Objects render
  @type Object
  @final
  **/

  return{
    
    constructor: TN,
    
    init: function(){
      return this._(run)();
    },

    ev: function(obj, type, fn){
      return this._(addEvent)(obj, type, fn);
    },

    syncscript: function(id,asyncstatus,src,callback){
      return this._(async)(id,asyncstatus,src,callback);
    },

    heredoc: function(str){
      return this._(heredoc)(str);
    },

    dbApp: function(key,jsonData,expirationMin){
      return this._(db)(key,jsonData,expirationMin);
    },

    dbAppTimestamp: function(key){
      return this._(dbTimestamp)(key);
    },

    getJson: function(load,callback){
      return this._(loadAsync)(load,callback);
    },

    getFusionFiles: function(file1,file2,callback){
      return this._(fusionFiles)(file1,file2,callback);
    },

    _:function(callback){
      var self = this;
      return function(){
        return callback.apply(self,arguments);
      };

    }
  
  }

}());