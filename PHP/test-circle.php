<?php

// ==================================================================
// START: debug include

if(!function_exists('debug'))
{
	if(isset($_SERVER['HTTP_HOST'])){ $path = $_SERVER['HTTP_HOST']; $pwd = dirname($_SERVER['SCRIPT_FILENAME']).'/'; }
	else { $path = isset($_SERVER['USER'])?$_SERVER['USER']:isset($_SERVER['USERNAME'])?$_SERVER['USERNAME']:''; $pwd = $_SERVER['PWD'].'/'; };
//	if( substr_compare( $path , '192.168.' , 0 , 8 ) == 0 ) { $path = 'localhost'; }
	switch($path)
	{
		case 'evan':		// home laptop
		case 'localhost':	$root = 'c:/wamp/www/';	$inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break; // home laptop

		case '192.168.18.128':	// work laptop (debian)
		case '192.168.1.128':	// raspberry Pi
		case 'antechinus':	// work laptop (debian)
		case 'wombat':	$root = '/var/www/';	$inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break; // home laptop

		case 'burrawangcoop.net.au':	// DreamHost
		case 'adra.net.au':		// DreamHost
		case 'canc.org.au':		// DreamHost
		case 'ewills':	$root = '/home/ewills/evan/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break; // DreamHost

		case 'apps.acu.edu.au':		// ACU
		case 'testapps.acu.edu.au':	// ACU
		case 'dev1.acu.edu.au':		// ACU
		case 'blogs.acu.edu.au':	// ACU
		case 'studentblogs.acu.edu.au':	// ACU
		case 'dev-blogs.acu.edu.au':	// ACU
		case 'evanw':	$root = '/home/evanw/';	$inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break; // ACU

		case 'webapps.acu.edu.au':	   // ACU
		case 'panvpuwebapps01.acu.edu.au': // ACU
		case 'test-webapps.acu.edu.au':	   // ACU
		case 'panvtuwebapps01.acu.edu.au': // ACU
		case 'dev-webapps.acu.edu.au':	   // ACU
		case 'panvduwebapps01.acu.edu.au': // ACU
		case 'evwills':
			if( isset($_SERVER['HOSTNAME']) && $_SERVER['HOSTNAME'] === 'panvtuwebapps01.acu.edu.au' ) {
				$root = '/home/evwills/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/'; // ACU
			} else {
				$root = '/var/www/html/mini-apps/'; $inc = $root.'includes_ev/'; $classes = $cls = $root.'classes_ev/'; // ACU
			}
			break;
	};

	set_include_path( get_include_path().PATH_SEPARATOR.$inc.PATH_SEPARATOR.$cls.PATH_SEPARATOR.$pwd);

	if(file_exists($inc.'debug.inc.php'))
	{
		if(!file_exists($pwd.'debug.info') && is_writable($pwd) && file_exists($inc.'template.debug.info'))
		{ copy( $inc.'template.debug.info' , $pwd.'debug.info' ); };
		include($inc.'debug.inc.php');
	}
	else { function debug(){}; };

	class emergency_log { public function write( $msg , $level = 0 , $die = false ){ echo $msg; if( $die === true ) { exit; } } }
};


// END: debug include
// ==================================================================


function hardRotate( $angle, $x, $y)
{
	settype($angle,'float');
	settype($x,'float');
	settype($y,'float');
//	debug($angle,$x,$y);
	if( $angle !== 0 )
	{
		$radius = sqrt( pow($x, 2) + pow($y, 2) );
		if( $y === 0.0 )
		{
			$currentAngle = atan($x);
		}
		elseif( $x === 0.0 )
		{
			$currentAngle = atan($y);
		}
		else
		{
			$currentAngle = atan($y/$x);
		}
		$currentAngle += deg2rad($angle);

		$x = cos($currentAngle) * $radius;
		$y = sin($currentAngle) * $radius;
	}

	return array($x,$y);
}


function rotate( $angle, $x, $y)
{
	$currentAngle = deg2rad($angle);

	$cosA = cos($currentAngle);
	$sinA = sin($currentAngle);

	$x = ( ($x * $cosA) - ($y * $sinA) );
	$y = ( ($x * $sinA) + ($y * $cosA) );
	return array($x,$y);
}

$spaceX = 800;
$spaceY = $spaceX;
$radius	= 400;
$initialAngle = 0;
$angleStep = 3;

$xy = rotate($initialAngle,0,$radius);
$b = 0;
$sep = '';
$output = '';

for( $a = 0 ; $a < 720 ; $a += $angleStep )
{
	$xy = hardRotate( $angleStep , $xy[0], $xy[1] );
	$output .= $sep.(($spaceX / 2) + $xy[0]).','.(($spaceY / 2) + $xy[1]);
	$sep = ' ';
}


echo '<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Testing trigonometry</title>
	</head>
	<body>

<!-- <?xml version="1.0"?> -->
		<svg width="'.$spaceX.'" height="'.$spaceY.'" viewPort="0 0 '.$spaceX.' '.$spaceY.'" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<polyline fill="none" stroke="black" points="'.$output.'" id="polly" />
		</svg>

		<script type="application/ecmascript" src="testCircle.js"></script>
	</body>
</html>';