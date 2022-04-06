/**
	* Implementation of forms and specs and svg conversion
	*/

oic.initializeSvg = function() {                                                                                                       
  var svg = document.getElementById('svg-elem');

  svg.setAttribute('width', SVG_SIZE);
  svg.setAttribute('height', SVG_SIZE);

  var rect = document.getElementById('total-crop-rect');

  rect.setAttribute('width', SVG_SIZE);
  rect.setAttribute('height', SVG_SIZE);

  var img = document.getElementById('image-to-crop');

  img.setAttribute('width', SVG_SIZE);
  img.setAttribute('height', SVG_SIZE);
}

///////////////////////////////////////////////////////////////////////////////

oic.formToSvg = function() {
  var spec = this.formToSpec();
  this.specToSvg(spec);
}

oic.specToSvgAndForm = function(spec) {
  this.specToForm(spec);
  this.specToSvg(spec);
}

///////////////////////////////////////////////////////////////////////////////
oic.formToSpec = function() {
  var crop = this.formToCrop();
  var round = this.formToRound();

  return { 'crop': crop, 'round': round };
}


oic.formToCrop = function() {
  var inputCropTop = document.getElementById('input-crop-top');
  var inputCropBot = document.getElementById('input-crop-bottom');
  var inputCropLeft = document.getElementById('input-crop-left');
  var inputCropRight = document.getElementById('input-crop-right');
  
  var cropTop = parseFloat(inputCropTop.value);
  var cropBot = parseFloat(inputCropBot.value);
  var cropLeft = parseFloat(inputCropLeft.value);
  var cropRight = parseFloat(inputCropRight.value);

  if (cropTop >= cropBot) {
    console.warn("T-B: " + cropTop + " - " + cropBot);
    return null;
  }

  if (cropLeft >= cropRight) {
    console.warn("L-R: " + cropLeft + " - " + cropRight);
    return null;
  }

  return { 'top': cropTop, 'bot': cropBot, 'left': cropLeft, 'right': cropRight };
}

oic.formToRound = function() {
  var inputRoundCorners = document.getElementById('input-round-corners');
  
  var roundCorners = parseFloat(inputRoundCorners.value);

  return { 'round': roundCorners };
}

///////////////////////////////////////////////////////////////////////////////
oic.specToForm = function(spec) {
  if (spec.crop) {
    this.cropToForm(spec.crop);
  }

  if (spec.round) {
    this.roundToForm(spec.round);
  }
}

oic.cropToForm = function(crop) {
  var inputCropTop = document.getElementById('input-crop-top');
  var inputCropBot = document.getElementById('input-crop-bottom');
  var inputCropLeft = document.getElementById('input-crop-left');
  var inputCropRight = document.getElementById('input-crop-right');
  
  inputCropTop.value = crop.top;
  inputCropBot.value = crop.bot;
  inputCropLeft.value = crop.left;
  inputCropRight.value = crop.right;
}

oic.roundToForm = function(round) {
  var inputRoundCorners = document.getElementById('input-round-corners');
  
  inputRoundCorners.value = round.round;
}

///////////////////////////////////////////////////////////////////////////////
oic.specToSvg = function(spec) {
  if (spec.crop) {
    this.cropToSvg(spec.crop);
  }

  if (spec.round) {
    this.roundToSvg(spec.round);
  }
}

oic.cropToSvg = function(crop) {
  var svg = document.getElementById('svg-elem');
  var wrapper = document.getElementById('svg-wrapper');
  var cropper = document.getElementById('total-crop-rect');
  var cropped = document.getElementById('image-to-crop');

  wrapper.style.paddingTop = SVG_SIZE * crop.top + "px";
  wrapper.style.paddingLeft = SVG_SIZE * crop.left + "px";
  wrapper.style.paddingBottom = SVG_SIZE * (1 - crop.bot) + "px";
  wrapper.style.paddingRight = SVG_SIZE * (1 - crop.right) + "px";
  
  var top = SVG_SIZE * crop.top;
  var left = SVG_SIZE * crop.left;
  var height = SVG_SIZE * (crop.bot - crop.top);
  var width = SVG_SIZE * (crop.right - crop.left);

  svg.setAttribute('height', height);
  svg.setAttribute('width', width);

  cropper.setAttribute('height', height);
  cropper.setAttribute('width', width);
  
  var transformRev = "translate(" + (- left) + ", " + (- top) + ")"; 
  cropped.setAttribute('transform', transformRev);

  var transform = "translate(" + left + ", " + top + ")"; 
  cropper.setAttribute('transform', transform);
}

oic.roundToSvg = function(round) {
  var cropper = document.getElementById('total-crop-rect');

  var rndX = round.round * cropper.getAttribute('width');
  var rndY = round.round * cropper.getAttribute('height');

  cropper.setAttribute('rx', rndX);
  cropper.setAttribute('ry', rndY);
}
  
///////////////////////////////////////////////////////////////////////////////
oic.specToFormAndSvg = function(spec) {
  this.specToForm(spec);
  this.specToSvg(spec);
}

///////////////////////////////////////////////////////////////////////////////
oic.cropToSquare = function(size, errorHandler) {
  var less = (size / 2);
  var least  = (1 - (size / 2));

  var crop = { 'top': less, 'bot': least, 'left': less, 'right': least };
  var spec = { 'crop': crop, 'round': null };

  this.specToFormAndSvg(spec);
  this.updateOutlink(errorHandler);
}

oic.roundToCircle = function(size, errorHandler) {
  var rad = (1 / 2) * size;

  var round = { 'round': rad };
  var spec = { 'spec': null, 'round': round };

  this.specToFormAndSvg(spec);
  this.updateOutlink(errorHandler);
}

///////////////////////////////////////////////////////////////////////////////


