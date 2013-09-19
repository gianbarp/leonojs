/*!
 *
 * jQuery Math
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

/**
@module LAB
**/

function suma(){

    var buffer = 0;
    
    for(var i = 1; i < arguments[0].length; i++){
        
        buffer += arguments[0][i];
      
    }
    
    
    
}

function App(){}

App.prototype.Calculator = function(){
    
    this.Calculator.operation = arguments[0];
    this.Calculator.operation.call(this,arguments);

}

var app = new App();
app.Calculator(suma,1,2,3,4);