/**
	* Core implementation of oic
	*/

var oic = {};

var SVG_SIZE = 400;
var OUTPUT_FORMAT = 'png'; // can be 'svg', 'png', 'jpeg' or 'link'
//////////////////////////////////////////////////////////////////////////////

oic.begin = function() {
  this.initializeSvg();

  var imgStr = this.inferFromUrl('img');
  var specStr = this.inferFromUrl('spec');
  var redirectStr = this.inferFromUrl('redirect');

  if (imgStr) {
    var imgInput = document.getElementById('input-url');
    imgInput.value = imgStr;
    this.loadInputImage(imgStr, errorHandler);
  }

  if (specStr) {
    var unesc = decodeURI(specStr);
    var spec = JSON.parse(unesc);
    this.specToFormAndSvg(spec);
  }

  if (redirectStr) {
    var url = this.generateOutlink();
    location.href = url;
  }
}

oic.loadInputImage = function(url, errorHandler) {
  var input = document.getElementById('input-image');
  input.value = url;

  console.info("Image loading");
  var oic = this;

  var img = new Image();
  img.crossOrigin="anonymous";
  
  img.onload = function() {
    
      console.info("Image loaded, size: " + img.width + " x " + img.height);
    
      var toCrop = document.getElementById('image-to-crop');
      toCrop.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url);
  
      oic.formToSvg();
      oic.updateOutlink(errorHandler);

  };

  img.onerror = function(e) {
	console.error("Image could not be loaded.");
	errorHandler("Image loading failed. Image does not exist or is protected against copying. " 
			+ "If you have pasted URL of image, try direct copy of image instead.", e);
  }

  img.src = url;
}


//////////////////////////////////////////////////////////////////////////////

oic.updateOutlink = function(errorHandler) {
  var svg = document.getElementById('svg-elem');
	var outlink = document.getElementById('output-link');

	var handler = function(url) {
		outlink.href = url;
	}

	var input = document.getElementById('input-image');
	var inputUrl = input.value;

	switch (OUTPUT_FORMAT) {
		case 'svg':
			this.generateSVG(svg, handler, errorHandler);
			break;
		case 'png':
		case 'jpeg':
			this.generateBitmap(svg, OUTPUT_FORMAT, handler, errorHandler);
			break;
		case 'link':
			this.generateLink(inputUrl, handler);
			break;
		default:
			console.warn("Unknown output format");
	}

/*
  if (OUTPUT_FORMAT == 'png') {
    var handler = function(url) {     
      outlink.href = url;
    }
    this.generatePNG(handler);
  }
  
  if (OUTPUT_FORMAT == 'svg') {
    var url = this.generateSVG(inputImage);
    outlink.href = url;
  }
  
  if (OUTPUT_FORMAT == 'link') {
    var input = document.getElementById('input-image');
    var inputImage = input.value;

    var url = this.generateLink(inputImage);
    outlink.href = url;
  }
	*/
}


oic.generateSVG = function(svg, outlink, handler, errorHandler) {
	
	var url = this.convertSVGtoSVGdata(svg, SVG_ENCODING, errorHandler);

	handler(url);
}

oic.generateBitmap = function(svg, imageType, handler, errorHandler) {
	this.convertSVGtoImageData(svg, imageType, handler, errorHandler);
}

oic.generateLink = function(input, handler) {
  var inputUrl = encodeURIComponent(input);
  var spec = oic.formToSpec();
  var specJson = JSON.stringify(spec);

  var relativeUrl = "crop.php?img=" + inputUrl + "&spec=" + specJson;
  var absoluteUrl = location.protocol + "//" + location.hostname + "" + location.pathname + relativeUrl;

  handler(absoluteUrl);
}

   


