/**
	* 
	* m@rtlin, 28.7.2017
	*/


var DOMURL = window.URL || window.webkitURL || window;
///////////////////////////////////////////////////////////////////////////////

pageLoaded = function() {
	oic.begin();
}

loadInputImageByUrl = function() {
	var input = document.getElementById('input-url');
	var url = input.value;

	oic.loadInputImage(url, handleError);
}

inputImagePasteHandler = function(event) {

	var pasteHandler = function(url) {
		var textHandler = function(url) {
			oic.loadInputImage(url, handleError);
		}

		if (url) {
			oic.loadInputImage(url, handleError);			
		} else {
			oic.pasteEventToText(event, textHandler);
		}
	}

	oic.pasteEventToDataURI(event, "image", pasteHandler);

	}

updateSvgByForm = function() {
	oic.formToSvg();
	oic.updateOutlink(handleError);
}

toSquare = function(size) {
	oic.cropToSquare(size, handleError);
}

toCircle = function(size) {
	oic.roundToCircle(size, handleError);
}

handleError = function(msg, e) {
	var errorPanel = document.getElementById('error-panel');
	errorPanel.classList.remove('hidden');
	
	var errorText = document.getElementById('error-text');
	errorText.innerText = msg;
}

///////////////////////////////////////////////////////////////////////////////

oic.pasteEventToText = function(event, handler) {
	handler(null);
}

oic.pasteEventToDataURI = function(event, typeSpec, handler) {
	var oic = this;
	// http://jsfiddle.net/bt7BU/225/
	var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
	 
	// find pasted image among pasted items
	var blob = null;
	for (var i = 0; i < items.length; i++) {
		if (items[i].type.indexOf(typeSpec) === 0) {

			blob = items[i].getAsFile();
			break;
		}
	}
	
	// load image if there is a pasted image
	if (blob !== null) {
		var reader = new FileReader();

		reader.onload = function(event) {
			var url = event.target.result;
			//console.log(url); // data url!
			handler(url);
		};
		reader.readAsDataURL(blob);
	}
}

///////////////////////////////////////////////////////////////////////////////
oic.inferFromUrl = function(key) {
	var query = location.search;
	var tuples = query.split(/[&?]/);
	//console.log(tuples);

	for (var i = 0; i < tuples.length; i++) {
		var tuple = tuples[i];
		var parts = tuple.split('=');

		if (parts[0] == key) {
			return parts[1];
		}
	}

	return null;
}


