
function rotate(angle, x, y) {
	'use strict';
	var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
	//	currentAngle = tan(y/x);
		currentAngle = Math.atan(y / x),
		cosA = 0,
		sinA = 0;
	console.log('currentAngle = ' + currentAngle);
	console.log('angle = ' + angle);

	currentAngle += angle;

	cosA = Math.cos(currentAngle);
	sinA = Math.sin(currentAngle);

	x = cosA * radius;
	y = sinA * radius;

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
	for (a = 0; a < 714; a += angleStep) {
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