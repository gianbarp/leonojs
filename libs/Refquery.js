var Ref = function(){};

Ref.prototype.urlQuery = function(pointer,action){
  
  var refin = document.referrer,

      self = this,

      protomatch = /^(https?|ftp):\/\//;

      splitin = pointer.split(" OR "),

      strtest = refin.replace(protomatch, '');

      for(i in splitin){

        if(new RegExp(splitin[i]).test(strtest.split('/')[0])){

          action(splitin[i]);
        
        }

      }

  }

Ref.prototype.pathQuery = function(query,callback){

  var hostName = window.document.referrer,

      protomatch = /^(https?|ftp):\/\//,

      generatepath = hostName.replace(protomatch, '').split('/')[1],

      ext, c = 0;
      
      splitin = query.split(" ELSE ")[0].split(" OR ");

      for(i in splitin){

        if(new RegExp(splitin[i]).test(generatepath) == true){

          ext = callback(splitin[i],generatepath);

        }else{

          ++c;
        
        }

      }

      if(splitin.length == c){

        ext = callback(query.split(" ELSE ")[1]);
      
      }

      return ext;

}