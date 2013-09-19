var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = true;

Drupal.theme = function(func) {
	  for (var i = 1, args = []; i < arguments.length; i++) {
	    args.push(arguments[i]);
	  }

	  return (Drupal.theme.prototype[func]).apply(this, args);
	};


jQuery.extend(Drupal.settings, {"basePath":"\/","fbconnect":{"user_pictures":"allow","language_code":"es_ES","app_id":"346699902992","debug":0,"connect_js":"document.location.protocol + '\/\/connect.facebook.net\/es_ES\/all.js'","loginout_mode":"manual","invite_name":"TN.com.ar | Todo Noticias","fast_reg_mode":1,"fbuid":"1624133027","user":{"uid":"1","fbuid":null}},"friendconnect":{"site_id":"13665434618024056116","parent_url":"\/sites\/all\/modules\/contrib\/friendconnect\/"}});