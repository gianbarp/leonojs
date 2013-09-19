/*!
 *
 * jQuery Header
 * Version: 1.0.1
 * Original author: TN Devs
 * Support && crowsource: @TodoNoticias
 * Extend: jQuery Pattern
 * Licensed under the MIT license
 *
 */

var route = new Route('data-page');

/**
 * @class HeaderApp
 * @constructor
 */

function HeaderApp(){ extend(HeaderApp, TN.app);

  function render(options){

    var self = new HeaderApp();

    switch(options.name){

      case self.list.alerta.api: compile(options); break;
      case self.list.pregunta.api: 

            compile(options,function(){

              $('#question-timer').countdown({until: $('#question-timer').data('time'), format: 'MS', compact:true, description: ''});
              publish();

            }); 

      break;
      case self.list.encuesta.api:

      if(!store.get('closeInteraction_' + $('#interactions').data('nid'))){

            compile(options,function(){

              $('#poll-timer').countdown({until: $('#poll-timer').data('time'), format: 'MS', compact:true, description: ''});
              $('#interactions.poll-widget').poll_widget({
                response:'json',
                after: function(){

                  if(store.get('interactions_social')){
                    transport.forEachPost(store.get('interactions_social'));
                  }

                }

              });

            });

        } 

      break;
      case self.list.notificaciones.api: compile(options); break;

    }

  }

  function compile(options,callback){

    var data = options.obj,
        template = Handlebars.getTemplate(config.templates + options.template);

        Helpers.handleHelpers.footer();
        
        var $tp = $(template(data));
        
        $(options.wrap).before($tp);
        
        var autoHeight = $tp.css('height', 'auto').height();

        $tp.height(0).animate({height: autoHeight}, 1000,function(){
          $tp.css('height', 'auto')
        });        

        if(callback != undefined){
          callback();
        }

  }

  function publish(){

    $("#interactions .comment-box").find('input[type=submit]').click(function(e){
      e.preventDefault();

      if(!$.cookie('tns01')){

        $.auto("ajax", config.ajax + 'overlay-login.html', function(){

          setTimeout(function(){
            $("#destination").attr('href',$("#destination").attr('href') + location.pathname);
          },400);

        });

      }else{

        //
        var comment = $('#interactions').find('textarea').val(),btn = $(this),box = "";

        if(comment != ""){
            $.ajax({
                type: "POST",
                url: '/services/interview_tv/comment.json',
                data: '{ "nid":"' + $('#interactions').data('nid') + '", "comment":"' + comment + '" }',
                accept: "application/json",
                contentType: "application/json",
                beforeSend:function(){
                  box = $('<div id="msgBox" class="pop-action"></div>');

                },
                success: function(data){
                    store.set('closeInteraction_' + $('#interactions').data('nid'),true);
                    $.auto('html',function(){
                        $('#boxContent').append(box.text("Gracias por participar"));
                        box.fadeIn();
                    });

                    if(store.get('interactions_social')){
                      transport.forEachPost(store.get('interactions_social'));
                    }

                    btn.attr('disabled',true);
                }

            });
        }

      }

    });

  }

	this.list = {

		alerta: {
      wrap: '#header',
      api: 'alerta_meteorologica',
      tmpl: 'alert'
    },

		pregunta: {
      wrap: '#header',
      api: 'entrevista_tv',
      tmpl: 'questions'
    },

		encuesta: {
      wrap: '#header',
      api: 'encuesta_tv',
      tmpl: 'poll'
    },

		notificaciones: {
      wrap: '#header',
      api: 'notificaciones',
      tmpl: 'notify'
    }

	}

	this.process = function(){

    var self = new HeaderApp();

		self.getJson('/services/prioridad_interacciones.json?alt=true&preset=564x383&url=true', function(xh){ 

	      for(var i in self.list){

          if( xh[self.list[i].api] != undefined && xh[self.list[i].api].status != 0 ){

            render({ 

              wrap: self.list[i].wrap,
              name: self.list[i].api, 
              obj: xh[self.list[i].api],
              template: self.list[i].tmpl

            });

          } 

        } 

	  });

	}

}