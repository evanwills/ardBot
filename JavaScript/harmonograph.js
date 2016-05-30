// JSON to Tab delimited text
// \t+\{\s+"steps": ([0-9.]+),\s+"pendulums":\s+\[\s+\{\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),?\s+\},\s+\{\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),?\s+\},\s+\{\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),\s+"[^"]+": ([-0-9.]+),?\s+\}\s+\]\s+\},?

var s = 64;
var x = 0.0,  y = 0.0;
var t = 0.0, dt = 0.001;
var R = 400.0;
var Ax = 0.0, Ay = R, Bx = R, By = 0.0;
var Cx, Cy, Dx, Dy, Px, Py, Ex, Ey;
var graph, gr, scene, sc;
var intId;
var ns, setns = 100000;
var vis1 = true, vis2 = true;
var conf = {
	"a1x": 0,
	"a1y": 0,
	"p1x": 0,
	"p1y": 0,
	"f1": 0,
	"td1": 0,
	"a2x": 0,
	"a2y": 0,
	"p2x": 0,
	"p2y": 0,
	"f2": 0,
	"td2": 0,
	"a3x": 0,
	"a3y": 0,
	"p3x": 0,
	"p3y": 0,
	"f3": 0,
	"td3": 0
};
var configs = [];
var	steps = 0;
var configSaved = false;
var configLinier;

function LinierConfig() {
	var a = -105, // a1x
		b = -105, // a2x
		c = -105, // a3x
		d = 105, // a1y
		e = 105, // a2y
		f = 105, // a3y
		g = -100, // p1x
		h = -100, // p2x
		i = -100, // p3x
		j = 100, // p1y
		k = 100, // p2y
		l = 100, // p3y
		m = 0.5, // dt1
		n = 0.5, // dt2
		o = 0.5, // dt3
		p = 0, // f1
		q = 0, // f2
		r = 0, // f3
		ampMin = -105,
		ampMax = 105,
		ampInc = 2,
		phaMin = -100,
		phaMax = 100,
		phaInc = 1,
		dampMin = 0,
		dampMax = 200,
		dampInc = 2,
		FreqMin = 0,
		FreqMax = 2,
		FreqInc = 0.2;


	function doInc() {
		r += FreqInc;
		if (r > FreqMax) {
			r = FreqMin;
			q += FreqInc;
			if (q > FreqMax) {
				q = FreqMin;
				p += FreqInc;
				if (p > FreqMax) {
					p = FreqMin;
					o += dampInc;
					if (o > dampInc) {
						o = dampMin;
						n += dampInc;
						if (n > dampInc) {
							n = dampMin;
							m += dampInc;
							if (m > dampInc) {
								m = dampMin;
								l += phaInc;
								if (l > phaMax) {
									l = phaMin;
									k += phaInc;
									if (k > phaMax) {
										k = phaMin;
										j += phaInc;
										if (j > phaMax) {
											j = phaMin;
											i -= phaInc;
											if (i < phaMin) {
												i = phaMax;
												h -= phaInc;
												if (h < phaMin) {
													h = phaMax;
													g -= phaInc;
													if (g < phaMin) {
														g = phaMax;
														f += ampInc;
														if (f < ampMin) {
															f = ampMax;
															e -= ampInc;
															if (e < ampMin) {
																e = ampMax;
																d -= ampInc;
																if (d < ampMin) {
																	d = ampMax;
																	c -= ampInc;
																	if (c > ampMax) {
																		c = ampMin;
																		b += ampInc;
																		if (b > ampMax) {
																			b = ampMin;
																			a += ampInc;
																			if (a > ampMax) {
																				a = ampMin;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}



	this.getConfig = function () {
		doInc();
		return {
			"a1x": a,
			"a2x": b,
			"a3x": c,
			"a1y": d,
			"a2y": e,
			"a3y": f,
			"p1x": g,
			"p2x": h,
			"p3x": i,
			"p1y": j,
			"p2y": k,
			"p3y": l,
			"td1": m,
			"td2": n,
			"td3": o,
			"f1": p,
			"f2": q,
			"f3": r
		}
	}
}

//configLinier = new LinierConfig();



function init() {

	var a = 0,
		b = 0,
		key = '',
		minMax = [
			['a', 'x', -105, 105],
			['a', 'y', -105, 105],
			['p', 'x', 0, 100],
			['p', 'y', 0, 100],
			['td', '', 0.5, 200],
			['f', '', 0.5, 1.5]
		],
		tmp = 0;

	for (a = 0; a < minMax.length; a += 1) {
		for (b = 1; b < 4; b += 1) {
			key = minMax[a][0] + b + minMax[a][1];
			tmp = setInputRandom(key, minMax[a][2], minMax[a][3]);
			conf[key] = tmp;
		}
	}

	reset();
	configSaved = false;
}
/*
function init() {

	var a = 0,
		b = 0,
		key = '',
		minMax = [
			['a', 'x'],
			['a', 'y'],
			['p', 'x'],
			['p', 'y'],
			['td', ''],
			['f', '']
		],
		tmpConf = configLinier.getConfig(),
		tmp = 0;

	for (a = 0; a < minMax.length; a += 1) {
		for (b = 1; b < 4; b += 1) {
			key = minMax[a][0] + b + minMax[a][1];
			tmp = setInput(key, tmpConf[key]);
			conf[key] = tmp;
		}
	}

	reset();
	configSaved = false;
}
*/
function reset() {

	graph = document.getElementById('graph');
	gr = graph.getContext('2d');
	gr.setTransform(2, 0, 0, -2, 490, 390);
	gr.rotate(0.7854);
	gr.clearRect(-490, -390, graph.width, graph.height);
	gr.strokeStyle = "hsl(40,80%,80%)";
	gr.lineWidth = 0.4;
	gr.globalAlpha = 0.8;
	scene = document.getElementById('scene');
	sc = scene.getContext('2d');
	sc.setTransform(0.25, 0, 0, -0.25, 150, 180);
	sc.rotate(0.7854);
	sc.clearRect(-560, -560, scene.width * 4, scene.height * 4);
	sc.fillStyle = "rgba(44,22,11,0.8)";
	sc.lineWidth = 4;
	sc.globalAlpha = 0.8;
	t = 0.0;
	ns = setns;
	steps = 0;

	inputChange();
	swing();
	//console.log("gr = ",gr);
}

function step() {
	var i = 0;
	steps += 1;
	gr.beginPath();
	gr.moveTo(x, y);
	for (i = 0; i < s; i += 1) {
		t += dt;
		swing();
		gr.lineTo(x, y);
	}
	gr.stroke();
	sc.clearRect(-680, -680, 1600, 1600);
	sc.strokeStyle = "#999966";
	sc.strokeRect(Ax - 80, By - 80, Bx - Ax + 160, Ay - By + 160);
	sc.beginPath();
	sc.arc(Ax, Ay, 10, 0, 6.2832);
	sc.stroke();
    sc.beginPath();
	sc.arc(Bx, By, 10, 0, 6.2832);
	sc.stroke();
    sc.beginPath();
	sc.arc(Ax, By, 10, 0, 6.2832);
	sc.stroke();
	sc.beginPath();
	sc.arc(Ex, Ey, 200, 0, 6.2832);
	sc.fill();
	sc.stroke();
	sc.beginPath();
	sc.moveTo(Ax, By);
	sc.lineTo(Ex, Ey);
	sc.stroke();
	sc.strokeStyle = "#F0F2BC";
	sc.beginPath();
	sc.moveTo(Ax, Ay);
	sc.lineTo(Cx, Cy);
	sc.lineTo(Px, Py);
	sc.lineTo(Dx, Dy);
	sc.lineTo(Bx, By);
	sc.stroke();
	ns -= 1;
	if (ns <= 0) { window.clearInterval(intId); }

	if (steps > 50000) {
		init();
	}
}

function doMath(a, b, c, d) {
	return conf[a] * Math.exp(-t / conf[b]) * Math.sin(2.0 * Math.PI * conf[c] * t + conf[d]);
}

function swing() {
	//console.log('conf = ', conf);
	var x1 = doMath('a1x', 'td1', 'f1', 'p1x'),
		y1 = doMath('a1y', 'td1', 'f1', 'p1y'),
		x2 = doMath('a2x', 'td2', 'f2', 'p2x'),
		y2 = doMath('a2y', 'td2', 'f2', 'p2y'),
		x3 = doMath('a3x', 'td3', 'f3', 'p3x'),
		y3 = doMath('a3y', 'td3', 'f3', 'p3y'),
		CD = Math.sqrt(Math.pow(R + x2 - x1, 2) + Math.pow(R + y1 - y2, 2)),
		gamma = Math.acos(CD / (2 * R)) - Math.acos((R + y1 - y2) / CD);



	Px = x1 - (R * Math.sin(gamma));
	Py = R + y1 - (R * Math.cos(gamma));
	x = Px - x3;
	y = Py - y3;
	Cx = x1;
	Cy = R + y1;
	Dx = R + x2;
	Dy = y2;
	Ex = x3;
	Ey = y3;
}

function startStop() {
	var stab = document.getElementById('startButton');
	if (intId === null) {
		intId = window.setInterval(step, 1000 * dt);
		stab.innerHTML = 'stop';
	} else {
		window.clearInterval(intId);
		intId = null;
		stab.innerHTML = 'start';
	}
}

function speed() {
	s = s * 2;
	if (s > 128) {
		s = 1;
	}
	document.getElementById('spf').innerHTML = "&nbsp; " + s + "x";
}
function showSettings() {
	if (vis1) {
		document.getElementById('settings').style.visibility = "hidden";
		vis1 = false;
	} else {
		document.getElementById('settings').style.visibility = "visible";
		vis1 = true;
	}
}
function showScene() {
	if (vis2) {
		document.getElementById('topview').style.visibility = "hidden";
		vis2 = false;
	} else {
		document.getElementById('topview').style.visibility = "visible";
		vis2 = true;
	}
}

function read(id) {
	var input = document.getElementById(id),
		value = input.value,
		f = parseFloat(value);

	if (isNaN(f)) {
		input.className = 'error';
	} else {
		input.className = '';
	}
	f = f * 1;
	return f;
}

function setInputRandom(id, min, max) {
	var input = document.getElementById(id),
		rand = 0;

	//console.log('typeof min = ', typeof min);
	if (typeof min !== 'number') {
		throw {'message': 'setInputRandom() expects second parameter "min" to be a number. ' + typeof min + ' given.'};
	}
	if (typeof max !== 'number') {
		throw {'message': 'setInputRandom() expects second parameter "max" to be a number. ' + typeof max + ' given.'};
	}

	// look at using web crypto as source of randomness.
	// window.crypto.getRandomValues()
	// https://developer.mozilla.org/en-US/docs/Web/API/RandomSource/getRandomValues

	rand = (Math.random() * (max - min) + min);
	rand = Math.round(rand * 100);
	rand /= 100;
	input.setAttribute('value', rand);
	return rand;
}

function setInput(id, val) {
	var input = document.getElementById(id),
		rand = 0;

	//console.log('typeof min = ', typeof min);
	if (typeof val !== 'number') {
		throw {'message': 'setInput() expects second parameter "val" to be a number. ' + typeof val + ' given.'};
	}

	input.setAttribute('value', val);
	return val;
}

function inputChange() {
	var a = 0;
	for (a = 1; a < 4; a += 1) {
		conf.a1x = read('a' + a + 'x');
		conf.a1y = read('a' + a + 'y');
		conf.p1x = read('p' + a + 'x') / 180.0 * Math.PI;
		conf.p1y = read('p' + a + 'y') / 180.0 * Math.PI;
		conf.f1 = read('f' + a);
		conf.td1 = read('td' + a);

	}
}


function ConfigObj(input) {
	var a = 0,
		b = 0,
		key = '',
		keys = [
			['a', 'x', 'ampX'], ['a', 'y', 'ampY'], ['p', 'x', 'phaseX'], ['p', 'y', 'phaseY'], ['td', '', 'damping'], ['f', '', 'frequency']
		],
		values = [],
		tmp = [],
		confSteps = steps;

	for (a = 1; a < 4; a += 1) {
		for (b = 0; b < keys.length; b += 1) {
			key = keys[b][0] + a + keys[b][1];
			tmp[key] = input[key];
		}
		values[a] = tmp;
	}

	this.render = function () {
		var sep = '\n\t\t\t\t{',
		innerSep = '\n\t\t\t\t\t',
		output = ',\n\t\t{\n\t\t\t"steps": ' + confSteps + ',\n\t\t\t"pendulums": [';

		for (a = 1; a < 4; a += 1) {
			output += sep;
			for (b = 0; b < keys.length; b += 1) {
				key = keys[b][0] + a + keys[b][1];
				output += innerSep + '"' + keys[b][2] + '": ' + values[a][key];
				innerSep = ',\n\t\t\t\t\t';
			}
			innerSep = '\n\t\t\t\t\t';
			output += '\n\t\t\t\t}';
			sep = ',\n\t\t\t\t{';
		}
		output += '\n\t\t\t]\n\t\t}';
		return output;
	}
}

function saveConfig()
{
	if (configSaved === false) {
		configSaved = true;
		configs.push(new ConfigObj(conf));
	}
}

function showExport() {
	var a = 0,
		b = 0,
		key = '',
		output = document.getElementById('exportPre'),
		json = '';

	inputChange();
	saveConfig();

	for (a = 1; a < configs.length; a += 1) {
		json += configs[a].render();
	}
	output.innerHTML = json;
}

intId = window.setInterval(step, 1000 * dt);


speed();