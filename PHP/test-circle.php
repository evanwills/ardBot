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

/*

require_once('stepper.class.php');
require_once('circle-interface.class.php');
require_once('circle-shape.class.php');
// require_once('circle-manager.class.php');
// require_once('boom.class.php');
// require_once('whirliDoodle-model.class.php');
// require_once('output.class.php');


debug('$initialAngle = 50' , 'stepper $angleStep = 2' , '$radius = 39');
$testCircle = new circle( 50 , new stepperFixed(2) , new stepperFixed(39) );


$testCircle->initXY(0,0);
for( $a = 0 ; $a < 10 ; $a += 1 )
{
	$testCircle->rotate();
	debug('$a = '.$a , '$testCircle->getX() = '.$testCircle->getX() , '$testCircle->getY() = '.$testCircle->getY()  );
}

*/
/*
function rotate( $angle, $x, $y)
{
	$angle = rad2deg($angle);
//	$angle = deg2rad($angle);
	$cosA = cos($angle);
	$sinA = sin($angle);

	$x = ( ($x * $cosA) - ($y * $sinA) );
	$y = ( ($x * $sinA) + ($y * $cosA) );
//	$x = deg2rad( ($x * $cosA) - ($y * $sinA) );
//	$y = deg2rad( ($x * $sinA) + ($y * $cosA) );
//	$x = rad2deg( ($x * $cosA) - ($y * $sinA) );
//	$y = rad2deg( ($x * $sinA) + ($y * $cosA) );
	return array($x,$y);
}
*/

function rotate( $angle, $x, $y)
{
	$radius = sqrt( pow($x, 2) + pow($y, 2) );
	// currentAngle = tan(y/x);
	$currentAngle = tan($y/$x);
	$currentAngle += $angle;

//	$currentAngle = rad2deg($angle);
	$currentAngle = deg2rad($angle);

//	$cosA = cos($currentAngle);
//	$sinA = sin($currentAngle);
	$cosA = acos($currentAngle);
	$sinA = asin($currentAngle);

//	$cosA = deg2rad($cosA);
//	$sinA = deg2rad($sinA);
	$cosA = rad2deg($cosA);
	$sinA = rad2deg($sinA);

	$x = $cosA * $radius;
	$y = $sinA * $radius;


//	$x = ( ($x * $cosA) - ($y * $sinA) );
//	$y = ( ($x * $sinA) + ($y * $cosA) );
//	$x = deg2rad( ($x * $cosA) - ($y * $sinA) );
//	$y = deg2rad( ($x * $sinA) + ($y * $cosA) );
//	$x = rad2deg( ($x * $cosA) - ($y * $sinA) );
//	$y = rad2deg( ($x * $sinA) + ($y * $cosA) );
	return array($x,$y);
}


$radius	= 30;
$initialAngle = 45;
$angleStep = 3;

$xy = rotate($initialAngle,0,$radius);
$b = 0;
for( $a = 0 ; $a < 360 ; $a += $angleStep )
{
	$xy = rotate( $angleStep , $xy[0], $xy[1] );
	echo "\nx: {$xy[0]}\ny: {$xy[1]}\n";
	$b += 1;
	if( $b > 10 )
	{
		sleep(5);
		echo "\n\n ======================================= \n\n";
		$b = 0;
	}
}