/**
	* 
	* Conversions images <-> DataURI
	*/


var DOMURL = window.URL || window.webkitURL || window;
///////////////////////////////////////////////////////////////////////////////

oic.convertImageURLtoImageData = function(inputUrl, imageType, handler, errorHandler) {
  var img = new Image();                                                                                                               
  img.crossOrigin="anonymous";

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		
		ctx.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(inputUrl);

		var imgDataURL = canvas.toDataURL('image/' + imageType);
		handler(imgDataURL);
	  };

	img.onerror = function(e) {
		console.error("Cannot export image");
		errorHandler("Cannot export image, nested image does not exist or is protected against copying. Try copy image data instead.", e);
	}

  img.src = inputUrl;
}

oic.convertSVGtoSVGdata = function(svg, encoding) {
  var serializer = new XMLSerializer();                                                                                                
  var xml = serializer.serializeToString(svg);
    
	switch (encoding) {
		case 'utf-8':
		case 'utf8':
		 return "data:image/svg+xml;utf8," + xml;

		case 'base64':
		case 'Base64':
			return "data:image/svg+xml;base64," + btoa(xml);

		case 'uri':
		default:
			return "data:image/svg+xml," + encodeURIComponent(xml);
	}
} 

oic.convertSVGtoImageData = function(svg, imageType, handler, errorHandler) {
	var oic = this;
	var copy = svg.cloneNode(true);
	this.imagesInSvgToData(copy, imageType, function(svg) {

		var url = oic.convertSVGtoSVGdata(svg, null);
		oic.convertImageURLtoImageData(url, imageType, handler, errorHandler);
	}, errorHandler);
}

////////////////////////////////////////////////////////////////////////////////////

oic.imagesInSvgToData = function(svg, imageType, modifiedSvgHandler, errorHandler) {
	var oic = this;
	this.treeProcess(svg, function(e) {
			return e.childNodes;
		}, 
		function(e, itemStartedHandler, itemCompletedHandler) {
			if (e.nodeName == 'image') {
				itemStartedHandler();
				var originalUrl = e.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
			  
				oic.convertImageURLtoImageData(originalUrl, imageType, function(url) {
					e.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
					itemCompletedHandler();
				},
				errorHandler);
			}
		},
		function() {
			modifiedSvgHandler(svg);
		},
		errorHandler
	);
}

////////////////////////////////////////////////////////////////////////////////////


oic.treeProcess = function(input, childGenerator, itemProcessor, resultProcessor, errorHandler) {
	var children = childGenerator(input);
	var remaining = 0;
	
	var itemStartedHandler = function() {
		remaining++;
	}

	var itemCompletedHandler = function() {
		remaining--;
		if (remaining <= 0) {
			resultProcessor();
		}		
	}

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		
		itemProcessor(child, itemStartedHandler, itemCompletedHandler, errorHandler);
		
		this.treeProcess(child, childGenerator, itemProcessor, resultProcessor, errorHandler);
	}
}


////////////////////////////////////////////////////////////////////////////////////
oic.convertPasteEventToURL = function(event, ifImageType, handler, errorHandler) {
	var oic = this;
	var type = oic.determinePasteType(event);
	
	switch (type) {
		case 'string':
			oic.inferTextFromPaste(event, function(url) {
				if (ifImageType) {
					oic.convertImageURLtoImageData(url, ifImageType, handler);				
				} else {
					handler(url);
				}
			}, errorHandler);
			break;

		case 'file':
			this.inferDataFromPaste(event, handler, errorHandler);
			break;
		default:
			console.warn("Unknown paste type");
	}
}


oic.determinePasteType = function(event) {
	var data = event.clipboardData  || event.originalEvent.clipboardData;
	var items = data.items;

	switch (items.length) {
		case 0:
			return null;
		case 1:
			if (items[0].kind == 'string') {
				return 'string';
			} else {
				return null;
			}
		case 2:
			if (items[1].kind == 'file') {
				return 'file';
			} else {
				return null;
			}
		default:
			return null;
	}
}

oic.inferTextFromPaste = function(event, handler) {
	var data = event.clipboardData  || event.originalEvent.clipboardData;
	var items = data.items;
	var item = items[0];

	item.getAsString(handler);
}


oic.inferDataFromPaste = function(event, handler, errorHandler) {
	var data = event.clipboardData  || event.originalEvent.clipboardData;
	var items = data.items;
	
	var item = items[1];
	var blob = item.getAsFile();

	var reader = new FileReader();
    
	reader.onload = function(event) {
		var url = event.target.result;
		handler(url);
	};
	
	reader.onerror = function(e) {
		console.error("Cannot read clipboard data");
		errorHandler("Cannot read clipboard data. Never happended, dunno what to suggest to do.", e);
	}

	reader.readAsDataURL(blob);
}
