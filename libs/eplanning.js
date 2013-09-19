/* eplanning custom code
 * It's depend on jquery
 */
TN.eplanning = function(opts) {
  var that = {};
  var data = opts;

  var getEplServer = function() {
    var rc = undefined;
    var dc = document.cookie;
    var ci = dc.indexOf("EPLSERVER=");
    if (ci != -1) {
     ci += 10;
     var ce = dc.indexOf(';', ci);
     if (ce == -1) ce = dc.length;
     rc = dc.substring(ci, ce);
    }
    return rc;
  };

  var checkInit = function() {
    if (data.epl.eplReady()) {
      return true;
    } else {
      data.epl.eplInit(data.eplArgs);
      return data.epl.eplReady();
    }
  };

  var eplCheckStart = function() {
    if (document.epl) {
      data.epl = document.epl;
      return checkInit();
    } else {
      if (data.eplLL) { return false; }
      var eS2 = getEplServer();

      var eIF = $('<iframe />', { 'src': 'about:blank', 'name': 'epl4iframe', 'id': 'epl4iframe',
                                  'width': 0, 'height': 0, 'style.width': '0px',
                                  'style.height': '0px', 'style.display': 'none' })
        .appendTo($('html > body'));

      //var eIFD = $('#epl4iframe').contentWindow.document;
      var eIFD = eIF.get(0).contentWindow.document;
      eIFD.open(); eIFD.close();

      /*
      var eIFD = eIF.get(0).contentDocument ? eIF.get(0).contentDocument : eIF.get(0).document;
      eIFD.open();eIFD.write('<html><head><title>e-planning</title></head><bo'+'dy></bo'+'dy></html>');eIFD.close();
      */

      var s = eIFD.createElement('SCRIPT'); s.src = 'http://' + (eS2 ? eS2: data.eS1) +'/layers/epl-41.js';
      eIFD.body.appendChild(s);
      window.eplDoc = data.eplDoc;

      if (!eS2) {
       var ss = eIFD.createElement('SCRIPT');
       ss.src = 'http://ads.e-planning.net/egc/4/41a3';
       eIFD.body.appendChild(ss);
      }
      data.eplLL = true;
      return false;
     }

  };

  var eplSetAd = function(eID, custF) {
    if (eplCheckStart()) {
      try {
        if (custF === true) {
          data.epl.setCustomAdShow(eID, data.eplArgs.custom[eID]);
        }
        data.epl.showSpace(eID);
      } catch(err) {
        if (window.console != undefined) {
          //
        }
      }
    } else {
      setTimeout(function(){
            eplSetAd(eID, custF);
          },
          250);
      /*
       * Old code, just in case of fire
        var efu = 'TN.ads.jqe.eplSetAd("'+eID+'", '+ custF +');';
        setTimeout(efu, 250);
      */
    }
  };
  that.eplSetAd = eplSetAd;

  var add = function(eID, custF) {
    var container = document.getElementById(eID);
    
    //If the container don't exist, we must go to the shit
    if (container == null){return false;}
    
    var ad = document.createElement('div');    
    ad.setAttribute('id', 'eplAdDiv' + eID);
    container.appendChild(ad);

    if (custF === true) {
      if (!data.eplArgs.custom) {
        data.eplArgs.custom = {};
      }
      data.eplArgs.custom[eID] = custF;
    } else {
      custF = false;
    }
    eplSetAd(eID, custF);
  };
  that.add = add;

  /*
  var showChapa = function(sele, sec, nombre) {
    $(sele).each(function(i,e) {
      var rnd = (new String(Math.random())).substring(2,8) + (((new Date()).getTime()) & 262143);
      $(e).append(
        $('<a href="http://ads.e-planning.net/ei/3/563b/'+sec+'/'+nombre+'?it=i&rnd=' + rnd + '" rel="nofollow" target="_blank"></a>')
        .append($('<img width="50" height="50" alt="e-planning.net ad" src="http://ads.e-planning.net/eb/3/563b/'+sec+'/'+nombre+'?o=i&rnd=' + rnd + '" border=0>'))
      );
    });
  }
  that.showChapa = showChapa;
  */
  
  return that;


}; // eoc


/*
var JQepl = TN.eplanning( { eplDoc: document,
                            eplLL: false,
                            eS1: 'us.img.e-planning.net',
                            eplArgs: { iIF:1, sV:"http://ads.e-planning.net/", vV:"4",sI:"9a3b",sec:"Home",
                                       eIs:["Top998x50","Megaexpandible","Skyx160x600xIZQ","Skyx160x600xDER"] }
                         })

*/
