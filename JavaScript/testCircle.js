function deg2rad(degrees) {
	return (( degrees * Math.PI ) / 180);
}


function hardRotate(angle, x, y) {
	'use strict';
	var radius = 0,
		currentAngle = 0,
		cosA = 0,
		sinA = 0;

	angle = angle * 1;

	if (angle !== 0) {
		radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if (x === 0 && y === 0) {
			return [x, y];
		} else if (x === 0) {
			currentAngle = Math.atan(y);
		} else if (y === 0) {
			currentAngle = Math.atan(x);
		} else {
			currentAngle = Math.atan(y/x);
		}
		currentAngle += deg2rad(angle);

		x = Math.cos(currentAngle) * radius;
		y = Math.sin(currentAngle) * radius;
	}

	return [x, y];
}


function rotate(angle, x, y) {
	'use strict';
	var cosA = 0,
		sinA = 0;

	angle = angle * 1;
	angle = deg2rad(angle);

	console.log('angle = ' + angle);

	cosA = Math.cos(angle);
	sinA = Math.sin(angle);

//	cosA = Math.floor(Math.cos(angle) * 100000) / 100000;
//	sinA = Math.floor(Math.sin(angle) * 100000) / 100000;

	x = (x * cosA) - (y * sinA);
	y = (x * sinA) + (y * cosA)	;

	return [x, y];
}

function doIt() {
	'use strict';
	var a = 0,
		b = 0,
		radius	= 400,
		initialAngle = 0,
		angleStep = 2,
		xy = rotate(initialAngle, radius, 0),
		polly = document.getElementById('polly');


	b = 0;
	for (a = 0; a < 5660; a += angleStep) {
//		xy = hardRotate(angleStep, xy[0], xy[1]);
		xy = rotate(angleStep, xy[0], xy[1]);
		console.log("\nx: " + xy[0] + "\ny: " + xy[1] + "\n");
		polly.setAttribute('points', polly.getAttribute('points') + ' ' + (xy[0] + 500) + ',' + (xy[1] + 500));
		b += 1;
		if (b > 10) {
//			sleep(5);
			console.log("\n\n ======================================= \n\n");
			b = 0;
		}
	}
}
doIt();