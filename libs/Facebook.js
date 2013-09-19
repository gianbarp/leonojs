/**************************************************************************
  Rutinas de ayuda para Facebook

  Rutina de ayuda para conectarse a FB y publicar en el wall del usuario.
  el ejemplo mas basico es:

  TN.FB.publish('mensaje de prueba');

  Si el usuario no esta logueado, se va a realizar el login y se van a
  solicitar los permisos de ser necesario.

  Un ejemplo mas completo puede ser:

    FB.publish(
        { 'message': 'mensaje a compatir',
          'attachment': { 'name': 'titulo de la nota',
                          'description': 'bajada de la nota',
                          'href': 'path/a/a/nota',
                          'media': [{ 'type': 'image',
                                      'src': 'path/a/la/imagen',
                                      'href': 'link/a/la/nota'}]
                        }
        });

message, attachment, action_links, target, callback

 *************************************************************************/

facebookAPI = function(opts) {

  var that = {};
  var data = opts;

  var loginFB = function(callback) {
    FB.login( function(response) {
      if (response.authResponse) {
        callback(response)
      } else {
        // usuario cancelo el pedido de autorizacion
      }
    }, {scope:'read_stream,publish_stream'});
  };
  that.loginFB = loginFB;

  var publish = function() {
    //this.data = {message: message, attachment: attachment, action_links: action_links, target: target, callback: callback};

    FB.getLoginStatus( function(response) {
      if ((response.status) && (response.status === 'connected')) {
        streamPublish();
      } else {
        loginFB( streamPublish );
      }
    });

  };
  that.publish = publish;

  var streamPublish = function() {
    FB.ui({ method: 'stream.publish',
            message: data.message,
            attachment: data.attachment,
            action_links: data.action_links,
            target_id: data.target
          }, function(response) {
              if (data.callback) data.calback(response);
            }
    );
  };
  that.streamPublish = streamPublish;

  return that;

};
