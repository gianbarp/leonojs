    TN.uploader = {}
 
    /*
     * Video uploader
     */
    TN.uploader.video = new plupload.Uploader({
        runtimes : 'flash, html5',
        container : 'video-uploader',
        max_file_size : '250mb',
        browse_button : 'video-pickfiles',
        url : 'http://uploader.tn.com.ar',
        flash_swf_url : '/sites/all/themes/leono/swf/plupload-flash.swf',
        chunk_size : '256Kb',
        filters : [
            {title : "Archivo de video", extensions : "mpeg4,3gpp,mov,avi,mjpg,mpeg2,mpegps,wmv,flv,mp4,3gp,mpg"}
        ],
        resize : {width : 320, height : 240, quality : 90}
    });
 
    TN.uploader.video.is_enable = true;
 
    TN.uploader.video.disable = function(){
        $('#' + TN.uploader.video.id + '_flash_container').addClass('hidden');
        $('#video-pickfiles').addClass('disabled');
        $('#video-list .video:gt(0)').addClass('disable'); 
        TN.uploader.video.is_enable = false;        
    }
 
    TN.uploader.video.enable = function(){
        $('#' + TN.uploader.video.id + '_flash_container').removeClass('hidden');
        $('#video-pickfiles').removeClass('disabled'); 
        $('#video-list .image').removeClass('disable');
        TN.uploader.video.is_enable = true;
        setTimeout('TN.uploader.video.refresh();', 500);      
    }
 
    TN.uploader.video.init();
    TN.uploader.video.refresh();
 
    TN.uploader.video.bind('FilesAdded', function(up, files) {
        $.each(files, function(i, file) {
            $('#video-uploader .namefile').html(file.name + ' (' + plupload.formatSize(file.size) + ')');
        });
 
        up.refresh(); // Reposition Flash/Silverlight
 
        $('#video-uploader .video-status .progressbar').css('display', 'block');
        $('#video-uploader .video-status .progressbar span').css('width', '0%');
 
        // autostart the upload
        TN.uploader.video.start();
 
        $('#video-uploader .video-status').css('display', 'block');
        $('#video-pickfiles').addClass('hidden');
 
        TN.uploader.image.disable();
 
    });
 
    TN.uploader.video.bind('UploadProgress', function(up, file) {
        $('#video-uploader .progressbar span').css('width', file.percent + '%');
        if (file.percent == 100){
            $('#video-uploader .progressbar').css('display', 'none');
        }
    });
 
    $('#video-uploader .delete').click(function(e) {
        $.cookie('uploadedVideos', null);
        $('#video-uploader .video-status').css('display', 'none');
        $('#video-pickfiles').removeClass('hidden');
 
        $("#edit-field-video-tnylg-0-value").val('');
        TN.uploader.video.enable();
        TN.uploader.image.enable();
    });
 
    TN.uploader.video.bind('Error', function(up, err) {
        switch (err.code){
            case -500:
                break;
            case -600:
                $.auto('html',function(){
                    $('#boxContent').append(box.text("Tu archivo es demasiado grande. Podés subir videos de hasta 250 MB e imágenes hasta 10 MB."));
                    box.fadeIn();
                });
                break;
            default:
                $.auto('html',function(){
                    $('#boxContent').append(box.text("Hubo un error subiendo tu archivo. Por favor, volvé a intentarlo en unos minutos."));
                    box.fadeIn();
                });

        }
 
        up.refresh(); // Reposition Flash/Silverlight
 
    });
 
    TN.uploader.video.bind('FileUploaded', function(up, file, response) {
        $.cookie('uploadedVideos', $('.video-status .namefile').html());
        $("#edit-field-video-tnylg-0-value").val('file://'+file.name);
        BASE_PATH = "http://uploader.tn.com.ar/";
        try {
          var obj = jQuery.parseJSON(response.response);
        } catch(err) {
          var is_json = false;
        }
        if(is_json != false){
          $.each(obj, function(index, value) {
            hash = index;
           $.each(value.encoded, function(key, val){
              if(val.ftp_path){
                $("#edit-field-video-tnylg-0-value").val(BASE_PATH+"ufe-uploaded/"+val.ftp_path+"/"+hash+"/"+hash+".json");
              }
             });
          });
        }
        TN.uploader.video.disable();
        // $('#' + file.id + " b").html("100%");
    });
 
 
    /*
     * Image uploader
     */
 
    TN.uploader.image = new plupload.Uploader({
        runtimes : 'flash, html5',
        container : 'image-uploader',
        max_file_size : '10mb',
        browse_button : 'image-pickfiles',
        url : '/tnylagente/upload',
        flash_swf_url : '/sites/all/themes/leono/swf/plupload-flash.swf',
        filters : [
            {title : "Archivos de imagenes", extensions : "jpg,gif,png,jpeg"}
        ],
        resize : {width : 800, height : 600, quality : 100}
    });
 
    TN.uploader.image.is_enable = true;
 
    TN.uploader.image.disable = function(){
        $('#' + TN.uploader.image.id + '_flash_container').addClass('hidden');
        $('#image-pickfiles').addClass('disabled');
        $('#image-list .image:gt(0)').addClass('disable'); 
        TN.uploader.image.is_enable = false;        
    }
 
    TN.uploader.image.enable = function(){
        $('#' + TN.uploader.image.id + '_flash_container').removeClass('hidden');
        $('#image-pickfiles').removeClass('disabled'); 
        $('#image-list .image').removeClass('disable');
        TN.uploader.image.is_enable = true;
        setTimeout('TN.uploader.image.refresh();', 500);      
    }    
 
    TN.uploader.image.init();
    TN.uploader.image.refresh();
 
 
    TN.uploader.image.bind('FilesAdded', function(up, files) {
        $.each(files, function(i, file) {
            $('#image-list').append('<div class="image" id="' + file.id +'"><div class="namefile"> ' + file.name + ' (' + plupload.formatSize(file.size) + ')' + '</div><div class="progressbar"><span></span></div><div class="delete" data-id="' + file.id +'"></div>');
        });
 
        up.refresh(); // Reposition Flash/Silverlight
 
        // autostart the upload
        TN.uploader.image.start();
         TN.uploader.video.disable();
 
    });
 
    TN.uploader.image.bind('UploadProgress', function(up, file) {
        $('#' + file.id + ' .progressbar span').css('width', file.percent + '%');
        if (file.percent == 100){
            $('#' + file.id + ' .progressbar').remove();
        }
 
    });
 
    TN.uploader.image.bind('FileUploaded', function(up, file, response) {
        var obj = $.parseJSON(response.response);
        $.uploadedFiles = $('#edit-field-imagen-tnylg-hidden-0-value').val().split('||');
         if($.uploadedFiles.length < 1){
            $.uploadedFiles = [];
        }
        $.uploadedFiles.push(obj.fid+'@@'+file.id);
        $('#edit-field-imagen-tnylg-hidden-0-value').val($.uploadedFiles.join('||'));
    });
 
    $('#image-uploader .delete').live('click' , function(e) {
        $.uploadedFiles = $('#edit-field-imagen-tnylg-hidden-0-value').val().split('||');
        var fid = $(this).data('fid');
        var id = $(this).data('id');
        if(typeof(fid) != 'undefined'){
            $.each($.uploadedFiles, function(i, file){
                file += ''; // force convert to string
                if(file.indexOf(fid) != -1){
                    $.uploadedFiles.splice(i,1);
                }
            });
            $('#'+fid).remove();
            $('#edit-field-imagen-tnylg-hidden-0-value').val($.uploadedFiles.join('||'));
            TN.uploader.image.enable();
        } else if(typeof(id) != 'undefined'){
            $.each($.uploadedFiles, function(i, file){
                file += ''; // force convert to string
                if(file.indexOf(id) != -1){
                    $.uploadedFiles.splice(i,1);
                }
            });
            $('#'+id).remove();
            TN.uploader.image.total.uploaded = TN.uploader.image.total.uploaded - 1;
            $('#edit-field-imagen-tnylg-hidden-0-value').val($.uploadedFiles.join('||'));
        }
 
        if (TN.uploader.image.files.length == 1){
            TN.uploader.video.enable();
        }
 
         if($('#edit-field-imagen-tnylg-hidden-0-value').val() == ''){
           TN.uploader.video.enable();
         }
 
        //animacion
        $.each(TN.uploader.image.files, function(i, file) {
            if (file.id == id){
                TN.uploader.image.removeFile(file.id);
                $('#' + file.id).remove();
                $('#image-list .image:eq(0)').removeClass('disable');
                TN.uploader.image.files.splice(i,1)
 
                if (TN.uploader.image.is_enable == true){
                    TN.uploader.image.refresh();
                }
 
                if (TN.uploader.image.files.length == 0){
                    TN.uploader.image.enable();
                }
                return false;
            }
        });
 
 
    });

    var box = $('<div id="msgBox" class="pop-action"></div>');

    TN.uploader.image.bind('Error', function(up, err) {

        switch (err.code){
            case -500:
                break;
            case -600:
                $.auto('html',function(){
                    $('#boxContent').append(box.text("Tu archivo es demasiado grande. Podés subir videos de hasta 250 MB e imágenes hasta 10 MB."));
                    box.fadeIn();
                });
                break;
            default:
                $.auto('html',function(){
                    $('#boxContent').append(box.text("Hubo un error subiendo tu archivo. Por favor, volvé a intentarlo en unos minutos."));
                    box.fadeIn();
                });
 
        }
        up.refresh(); // Reposition Flash/Silverlight
    });
 
 
    TN.uploader.is_finished = function(){
        if ( (TN.uploader.image.files.length === (TN.uploader.image.total.uploaded + TN.uploader.image.total.failed)) && 
             (TN.uploader.video.files.length === (TN.uploader.video.total.uploaded + TN.uploader.video.total.failed)) ){
          return true;  
        } else {
          return false;
        }
    }
 
    $('form.publish').submit(function() {
 
        if (TN.uploader.is_finished() == true){
            // $(this).find('.submit').attr('disabled','disabled').addClass('disabled');
            return true;
        }
 
        // Si hay archivos para subir, los subo
        if ( (TN.uploader.video.files.length > 0) || (TN.uploader.image.files.length > 0) ) {
 
            // When all files are uploaded submit form
            TN.uploader.video.bind('StateChanged', function() {
                if (TN.uploader.is_finished() == true){
                    $('form.publish').submit();
                    $('#boxclose').click();
                }
            });
 
            TN.uploader.image.bind('StateChanged', function() {
                if (TN.uploader.is_finished() == true){
                    $('form.publish').submit();
                    $('#boxclose').click();
                }
            });

            $.auto('html',function(){
                $('#boxContent').append(box.text("Tus archivos se están subiendo. Al terminar la carga, se publicará tu nota."));
                box.fadeIn();
            });
 
        } else {
            return true;
        }
 
        return false;
 
    });
 
 
 
 
    if($('#edit-field-imagen-tnylg-hidden-0-value').val() != ''){
        TN.uploader.video.disable();
    }
    if($("#edit-field-video-tnylg-0-value").val() != ''){
        TN.uploader.image.disable();
        TN.uploader.video.disable();
    }
 
jQuery.extend(Drupal.settings, {"basePath":"\/","fbconnect":{"user_pictures":"allow","language_code":"es_LA","app_id":"346699902992","debug":0,"connect_js":"document.location.protocol + '\/\/connect.facebook.net\/es_LA\/all.js'","loginout_mode":"manual","invite_name":"Todo Noticias","fast_reg_mode":1,"fast_reg_autoname":1,"omit_fb_init_code":true,"fbuid":"548667561","user":{"uid":"1","fbuid":null}},"ckeditor":{"teaser":"edit-body","module_path":"\/sites\/all\/modules\/contrib\/ckeditor","theme":["garland","garland"],"settings":{"edit-body":{"customConfig":"\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.config.js?1338208892","defaultLanguage":"en","toolbar":"TN","enterMode":1,"shiftEnterMode":2,"toolbarStartupExpanded":true,"width":"100%","height":420,"skin":"kama","format_tags":"p;div;pre;address;h1;h2;h3;h4;h5;h6","scayt_autoStartup":false,"stylesCombo_stylesSet":"drupal:\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.styles.js","contentsCss":["\/themes\/garland\/style.css?U","\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.css?U"]},"edit-field-bajada-tnylg-0-value":{"customConfig":"\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.config.js?1338208892","defaultLanguage":"en","toolbar":"TN","enterMode":1,"shiftEnterMode":2,"toolbarStartupExpanded":true,"width":"100%","height":182,"skin":"kama","format_tags":"p;div;pre;address;h1;h2;h3;h4;h5;h6","scayt_autoStartup":false,"stylesCombo_stylesSet":"drupal:\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.styles.js","contentsCss":["\/themes\/garland\/style.css?U","\/sites\/all\/modules\/contrib\/ckeditor\/ckeditor.css?U"]}},"autostart":{"edit-body":true,"edit-field-bajada-tnylg-0-value":true}},"HierarchicalSelect":{"basePath":"\/","getArguments":"","settings":{"12":{"animationDelay":400,"cacheId":"hs_taxonomy_1___","renderFlatSelect":0,"createNewItems":0,"createNewLevels":0,"resizable":0,"path":"hierarchical_select_json"}}},"filefield":{"field_imagen_tnylg":"png gif jpg jpeg"},"ahah":{"edit-field-imagen-tnylg-0-filefield-upload":{"url":"\/filefield\/ahah\/tnylagente\/field_imagen_tnylg\/0","event":"mousedown","keypress":true,"wrapper":"edit-field-imagen-tnylg-0-ahah-wrapper","selector":"#edit-field-imagen-tnylg-0-filefield-upload","effect":"fade","method":"replace","progress":{"type":"throbber"},"button":{"op":"Subir"}},"edit-field-imagen-tnylg-0-filefield-remove":{"url":"\/filefield\/ahah\/tnylagente\/field_imagen_tnylg\/0","event":"mousedown","keypress":true,"wrapper":"edit-field-imagen-tnylg-0-ahah-wrapper","selector":"#edit-field-imagen-tnylg-0-filefield-remove","effect":"fade","method":"replace","progress":{"type":"throbber"},"button":{"field_imagen_tnylg_0_filefield_remove":"Eliminar"}},"edit-field-imagen-tnylg-field-imagen-tnylg-add-more":{"url":"\/content\/js_add_more\/tnylagente\/field_imagen_tnylg","event":"mousedown","keypress":true,"wrapper":"field-imagen-tnylg-items","selector":"#edit-field-imagen-tnylg-field-imagen-tnylg-add-more","effect":"fade","method":"replace","progress":{"type":"throbber"},"button":{"field_imagen_tnylg_add_more":"Add another item"}}},"teaserCheckbox":{"edit-teaser-js":"edit-teaser-include"},"teaser":{"edit-teaser-js":"edit-body"},"tableDrag":{"field_imagen_tnylg_values":{"field_imagen_tnylg-delta-order":[{"target":"field_imagen_tnylg-delta-order","source":"field_imagen_tnylg-delta-order","relationship":"sibling","action":"order","hidden":true,"limit":0}]}}});