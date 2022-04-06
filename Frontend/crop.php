<?xml version="1.0" standalone="no"?>
<?php

error_reporting(-1);
ini_set('display_errors', 'On');

?><?php

define("DEFAULT_SIZE", 400);

?><?php

if (!(isset($_GET) && $_GET['img'] && $_GET['spec'])) {
	die("Missing 'img' and 'spec' params ('size' is optional)\n");
}


$img = $_GET['img']; 

$spec = json_decode($_GET['spec']);

if (isset($_GET['size'])) {
	$size = (int) $_GET['size'];
} else {
	$size = DEFAULT_SIZE;
}

if (!(isset($spec->crop) && isset($spec->crop->top))) {
	$spec->crop->top = 0;
}
if (!(isset($spec->crop) && isset($spec->crop->bot))) {
	$spec->crop->bot = 1.0;
}
if (!(isset($spec->crop) && isset($spec->crop->left))) {
	$spec->crop->left = 0;
}
if (!(isset($spec->crop) && isset($spec->crop->right))) {
	$spec->crop->right = 1.0;
}

if (!(isset($spec->crop) && isset($spec->crop->bot))) {
	$spec->crop->bot = 0;
}

if ($spec->crop->top >= $spec->crop->bot) {
	die("top >= bot\n");
}
if ($spec->crop->left >= $spec->crop->right) {
	die("left >= right");
}

?><?php


	$height = (float) $size * ($spec->crop->bot - $spec->crop->top);	
	$width = (float) $size * ($spec->crop->right - $spec->crop->left);
	$top = (float) $size * $spec->crop->top;
	$left = (float) $size * $spec->crop->left;
	$negTop = (float) - $top;
	$negLeft = (float) - $left;
	$rx = (float) $size * $spec->round->round;
	$ry = (float) $rx;

header('Content-Type: image/svg+xml');
	
?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="<?= $width ?>" height="<?= $height ?>" id="svg-elem" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<clipPath id="total-crop">
			<rect id="total-crop-rect"
			x="0" y="0" width="<?= $width ?>" height="<?= $height ?>" rx="<?= $rx ?>" ry="<?= $ry ?>"
			transform="translate(<?= $left ?>, <?= $top ?>)" />
		</clipPath>
	</defs>

	<image id="image-to-crop"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xlink:href="<?= $img ?>" clip-path="url(#total-crop)"
			x="0" y="0" width="<?= $size ?>" height="<?= $size ?>" 
			transform="translate(<?= $negLeft ?>, <?= $negTop ?>)"/>

</svg>

