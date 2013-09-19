if (document.getElementById('ckeditor-note') != null ) {
	CKEDITOR.replace( 'ckeditor-note',{
		language: 'es',
		customConfig : '',
		contentsCss: ['../../css/ckeditor.css', 'http://fonts.googleapis.com/css?family=Open%20Sans'],
		bodyClass: 'ckeditor-note',
		removePlugins: 'elementspath',
		forcePasteAsPlainText: true,
		stylesSet: [],
		toolbarCanCollapse: false,
		justifyClasses: [ 'rteleft', 'rtecenter', 'rteright', 'rtejustify' ],
		//extraPlugins : 'mediaembed,gmap',
		extraPlugins : 'mediaembed',
		resize_maxWidth: '100%',
		width:'950',
		toolbar: [
			          { name: 'basicstyles', items : ['Bold', 'Italic', 'Underline' ] },
			          { name: 'clipboard', items : [ 'Cut','Copy','Paste', 'PasteFromWord', '-', 'Undo','Redo' ] },
			          { name: 'paragraph', items : [ 'NumberedList','BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
			          { name: 'links', items : [ 'Link','Unlink' ] },
			          //{ name: 'embed', items: ['MediaEmbed', 'Image', 'gmap']},
			          { name: 'embed', items: ['MediaEmbed', 'Image']},
			          { name: 'tools', items : ['SpellChecker'] }
			     ]
		}
	);
}

if (document.getElementById('ckeditor-dropline') != null ) {
	CKEDITOR.replace( 'ckeditor-dropline',{
		language: 'es',
		customConfig : '',
		contentsCss: ['../../css/ckeditor.css'],
		bodyClass: 'ckeditor-dropline',
		removePlugins: 'elementspath',
		forcePasteAsPlainText: true,
		stylesSet: [],
		toolbarCanCollapse: false,
		justifyClasses: [ 'rteleft', 'rtecenter', 'rteright', 'rtejustify' ],
		resize_maxWidth: '100%',
		width:'950',
		height:'150',
		maxlength: '280',
		toolbar: [
			          { name: 'basicstyles', items : ['Bold', 'Italic', 'Underline' ] },
			          { name: 'links', items : [ 'Link','Unlink' ] },
			     ]
		}
	);
	CKEDITOR.instances["ckeditor-dropline"].on('key', checkLength);
	CKEDITOR.instances["ckeditor-dropline"].on('paste', checkLength);	
}
/*
if (document.getElementById('ckeditor-comment') != null ) {
	
	var pattern = /node-type-nota/g;
	var w = 535;
	if (pattern.test(document.body.className) == true) {	
		w = 580;
	}
	
	CKEDITOR.replace( 'ckeditor-comment',{
		language: 'es',
		customConfig : '',
		contentsCss: ['../../css/ckeditor.css'],
		bodyClass: 'ckeditor-comment',
		removePlugins: 'elementspath',
		forcePasteAsPlainText: true,
		stylesSet: [],
		toolbarCanCollapse: false,
		justifyClasses: [ 'rteleft', 'rtecenter', 'rteright', 'rtejustify' ],
		extraPlugins : 'mediaembed',
		resize_maxWidth: '100%',
		width:w,
		toolbar: [
			          { name: 'basicstyles', items : ['Bold', 'Italic', 'Underline' ] },
			          { name: 'clipboard', items : [ 'Cut','Copy','Paste', '-', 'Undo','Redo' ] },
			          { name: 'paragraph', items : [ 'NumberedList','BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
			          { name: 'links', items : [ 'Link','Unlink' ] },
			          { name: 'embed', items: ['MediaEmbed', 'Image']},
			     ]
		}
	);
}
*/

function getCurrentCount(editor){
	var currentLength = editor.getData()
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.replace(/&\w+;/g ,'X')
		.replace(/^\s*/g, '')
		.replace(/\s*$/g, '')
		.length;
 
	return currentLength;
}
 
function checkLength(evt){
	var stopHandler = false;
	var currentLength = getCurrentCount(evt.editor);
	var maximumLength = 160;
 
	if(evt.editor.config.maxlength)
	{
		maximumLength = evt.editor.config.maxlength;
	}
 
	if(!evt.editor.config.LockedInitialized)
	{
		evt.editor.config.LockedInitialized = 1;
		evt.editor.config.Locked = 0;
	}
 
	if(evt.data)
	{
		if(evt.data.html)
		{
			currentLength += evt.data.html.length;
		}
		else if(evt.data.text)
		{
			currentLength += evt.data.text.length;
		}
	}
 
	if(!stopHandler && currentLength >= maximumLength)
	{
		if (evt.name == 'paste'){
			alert('El texto que esta intentando copiar es muy largo, favor de hacerlo mas corto');
		}
		if ( !evt.editor.config.Locked )
		{
			// Record the last legal content.
			evt.editor.fire( 'saveSnapshot' );
			evt.editor.config.Locked = 1;
			// Cancel the keystroke.
			evt.cancel();
		}
		else
			// Check after this key has effected.
			setTimeout( function()
			{
				// Rollback the illegal one.
				if( getCurrentCount(evt.editor) > maximumLength )
					evt.editor.execCommand( 'undo' );
				else
					evt.editor.config.Locked = 0;
			}, 0);
	}
}