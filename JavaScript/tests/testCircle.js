
var config = {
	"angle": {
		"initial": 120,
		"step": -2
	},
	"pollyLineID": 'polly',
	"radius": 400,
	"viewPort": {
		"svgID": 'svgWrap',
		"x": 900,
		"y": 900
	}
};


function deg2rad(degrees) {
	'use strict';
	degrees = degrees * 1;
	return ((degrees * Math.PI) / 180);
}


function hardRotate(angle, x, y) {
	'use strict';
	var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
		newAngle = Math.atan(y / x) + deg2rad(angle);

	return [Math.cos(newAngle) * radius, Math.sin(newAngle) * radius];
}

/*
function rotate(angle, x, y) {
	'use strict';
	var cosA = 0,
		sinA = 0;

	angle = deg2rad(angle);

	console.log('angle = ' + angle);

	cosA = Math.cos(angle);
	sinA = Math.sin(angle);

//	cosA = Math.floor(Math.cos(angle) * 100000) / 100000;
//	sinA = Math.floor(Math.sin(angle) * 100000) / 100000;

	x = (x * cosA) - (y * sinA);
	y = (x * sinA) + (y * cosA);

	return [x, y];
}
*/


function doIt(conf) {
	'use strict';
	var a = 0,
		b = 0,
		cumulative = 0,
		offsetX = conf.viewPort.x / 2,
		offsetY = conf.viewPort.y / 2,
		points = '',
		polly = document.getElementById(conf.pollyLineID),
		svg = document.getElementById(conf.viewPort.svgID),
		xy = hardRotate(conf.angle.initial, conf.radius, 0);

	svg.setAttribute('width', conf.viewPort.x);
	svg.setAttribute('height', conf.viewPort.y);
	svg.setAttribute('viewPort', '0 0 ' + conf.viewPort.x + ' ' + conf.viewPort.y);

	cumulative += conf.angle.initial;

	polly.setAttribute('points', polly.getAttribute('points') + ' ' + (xy[0] + offsetY) + ',' + (xy[1] + offsetY));

	for (a = 0; a < 170; a += 2) {
		cumulative += conf.angle.step;

		xy = hardRotate(conf.angle.step, xy[0], xy[1]);

		console.log("\nangleStep: " + conf.angle.step, "\ncumulative: " + cumulative, "\nx: " + xy[0] + "\ny: " + xy[1] + "\n");

		polly.setAttribute('points', polly.getAttribute('points') + ' ' + (xy[0] + offsetX) + ',' + (xy[1] + offsetY));


		b += 1;
		if (b > 10) {
//			sleep(5);
			console.log("\n\n ======================================= \n\n");
			b = 0;
		}
	}
}


doIt(config);

