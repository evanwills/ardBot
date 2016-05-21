
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

require_once('stepper.class.php');
//require_once('itterator.class.php');
require_once('circle-interface.class.php');
require_once('circle-shape.class.php');
require_once('circle-manager.class.php');
require_once('boom.class.php');
require_once('whirliDoodle_model.class.php');
require_once('output.class.php');

define( 'TIMES' , 10000 );
define( 'WIDTH' , 5000 );



define('OFFSET', WIDTH / 2);
define('BOOM_ONE_LEN', WIDTH * 2);
define('BOOM_TWO_LEN', WIDTH * 2.25);debug(BOOM_ONE_LEN,BOOM_TWO_LEN);

/*
{
	MD3: {
		width: 5000,
		height: 5000,
		booms: {
			type: straightBoom,
			boomOne: {
				type: stepperFixed,
				length: 5000
			}
			boomTwo: {
				type: stepperFixed,
				length: 5000
			}
		},
		circleOne: {
			type: multiCircle,
			circleShape: {
				type: circle,
				initialAngle: 180,
				angleStep: 0
				radius: 12500
			},
			childCircle: {
				type: multiCircle,
				circleShape: {
					type: circle,
					initialAngle: 0,
					angleStep: 0.0037
					radius: 1613
				},
				childCircle: {
					type: multiCircle,
					circleShape: {
						type: circle,
						initialAngle: 0,
						angleStep: -0.077
						radius: 887
					},
					childCircle: {
						type: null
					}
				}
			},
			originX: 2500,
			originY: 2500
		}
		circleTwo: {
			type: multiCircle,
			circleShape: {
				type: circle,
				initialAngle: 120,
				angleStep: 0
				radius: 10000
			},
			childCircle: {
				type: multiCircle,
				circleShape: {
					type: circle,
					initialAngle: 0,
					angleStep: 0.0029
					radius: 1193
				},
				childCircle: {
					type: multiCircle,
					circleShape: {
						type: circle,
						initialAngle: 0,
						angleStep: 0.083
						radius: 1307
					},
					childCircle: {
						type: null
					}
				}
			},
			originX: 2500,
			originY: 2500
		}
		tableRotator: {
			type: circle,
			initialAngle: 0,
			angleStep: 0.13
			radius: 2500
		}
	}
}
*/



$circleOne = new multiCircle(
	new circle(
		 200
		,new stepperFixed( 0 )
		,new stepperFixed( BOOM_ONE_LEN )
	)
);
$circleOne->initXY( OFFSET , OFFSET );exit;
$circleOne->setChildCircle(
	new multiCircle(
		new circle(
			 0
			,new stepperFixed( 0.37 )
			,new stepperFixed( 1613 )
		)
	)
);
$circleOne->setChildCircle(
	new multiCircle(
		new circle(
			 0
			,new stepperFixed( 0.77 )
			,new stepperFixed( 887 )
		)
	)
);

	//
$circleTwo = new multiCircle(
	new circle(
		160
		,new stepperFixed( 0 )
		,new stepperFixed( BOOM_TWO_LEN )
	)
);
$circleTwo->initXY( OFFSET , OFFSET );
$circleTwo->setChildCircle(
	new multiCircle(
		new circle(
			 0
			,new stepperFixed( 0.29 )
			,new stepperFixed( 1193 )
		)
	)
);
$circleTwo->setChildCircle(
	new multiCircle(
		new circle(
			 0
			,new stepperFixed( 0.83 )
			,new stepperFixed( 1307 )
		)
	)
);



$tableRotator = new circle( 0 , new stepperFixed( 0.13 ) , new stepperFixed( OFFSET ));
$tableRotator->initXY( OFFSET , OFFSET );


$MD3 = new whirliDoodleModel(
	 WIDTH	// width
	,WIDTH	// height
	,new straightBoom( // booms
		 new stepperFixed( BOOM_ONE_LEN )
		,new stepperFixed( BOOM_TWO_LEN )
	 )
	,$circleOne	// firstCircle
	,$circleTwo	// secondCircle
	,$tableRotator //tableRotator
);




$output = new outputSVG( '' , WIDTH , WIDTH );
$output->openWrap();

for( $a = TIMES ; $a >= 0 ; $a -= 1) {
	$MD3->rotate();
	// output to file somehow
	$ouput->setXY( $MD3->getX() , $MD3->getY() );
}

$output->closeWrap();
$output->renderObjDump( $MD3->getState() );

$output->__destruct();
