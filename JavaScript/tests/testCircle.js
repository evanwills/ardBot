
var config = {
  'angle': {
    'initial': 120,
    'step': -2
  },
  'pollyLineID': 'polly',
  'radius': 400,
  'viewPort': {
    'svgID': 'svgWrap',
    'x': 900,
    'y': 900
  }
}

function deg2rad (degrees) {
  'use strict'
  degrees = degrees * 1
  return ((degrees * Math.PI) / 180)
}

function hardRotate (angle, x, y) {
  'use strict'
  var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  var newAngle = Math.atan(y / x) + deg2rad(angle)

  return [Math.cos(newAngle) * radius, Math.sin(newAngle) * radius]
}

function doIt (conf) {
  'use strict'
  var a = 0
  var b = 0
  var cumulative = 0
  var offsetX = conf.viewPort.x / 2
  var offsetY = conf.viewPort.y / 2
  // var points = ''
  var polly = document.getElementById(conf.pollyLineID)
  var svg = document.getElementById(conf.viewPort.svgID)
  var xy = hardRotate(conf.angle.initial, conf.radius, 0)

  svg.setAttribute('width', conf.viewPort.x)
  svg.setAttribute('height', conf.viewPort.y)
  svg.setAttribute('viewPort', '0 0 ' + conf.viewPort.x + ' ' + conf.viewPort.y)

  cumulative += conf.angle.initial

  polly.setAttribute('points', polly.getAttribute('points') + ' ' + (xy[0] + offsetY) + ',' + (xy[1] + offsetY))

  for (a = 0; a < 170; a += 2) {
    cumulative += conf.angle.step

    xy = hardRotate(conf.angle.step, xy[0], xy[1])

    console.log('\nangleStep: ' + conf.angle.step, '\ncumulative: ' + cumulative, '\nx: ' + xy[0] + '\ny: ' + xy[1] + '\n')

    polly.setAttribute('points', polly.getAttribute('points') + ' ' + (xy[0] + offsetX) + ',' + (xy[1] + offsetY))

    b += 1
    if (b > 10) {
      // sleep(5)
      console.log('\n\n ======================================= \n\n')
      b = 0
    }
  }
}

doIt(config)
