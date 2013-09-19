/*!
 *
 * jQuery Auth
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
 * @class Login
 * @constructor
 */

 function Login(o)
 {

 	for(var i in o){

 		

 		this[''.concat(o[i].type)] = {
 				
 			define:  o[i].define,	
			service: o[i].service,
			data: 	 o[i].data,
			error: 	 o[i].error,
			status:  o[i].status,
			before:  o[i].before,
			success: o[i].success

 		}
 	}

 	var sendDataService = function(o){

 		$.ajax({
            type: o.define,
            url: o.service + '.json',
            data: o.data,
            accept: "application/json",
            contentType: "application/json",

            statusCode:{

              406:function(xhr){
              	o.error(xhr);
              },
              
              401:function(xhr){
              	o.status.call(xhr);
              }

            },

            beforeSend:function(){
            	o.before.call(arguments,this);
            },

            success: function(data,textStatus,XMLHttpRequest){
            	o.success(data,textStatus,XMLHttpRequest);
            }

        });

 	}

 	this.process = function(ins,type){

 		return sendDataService(ins[type]);

 	}

 }