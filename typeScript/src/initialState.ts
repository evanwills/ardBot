export const init = {
  steps: 20000,
  base1: {
    type: 'compound',
    origin: {
      x: 200,
      y: -500
    },
    radiusLength: 250,
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.25
    },
    initialAngle: 37,
    extraWheel: {
      radiusLength: 173,
      angleIncrement: {
        type: 'IncrementManager',
        value: -0.145
      },
      initialAngle: 198.5,
    }
  },
  base2: {
    type: 'compound',
    origin: {
      x: 500,
      y: -550
    },
    radiusLength: 350,
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.485
    },
    initialAngle: 37,
    extraWheel: {
      radiusLength: 121,
      angleIncrement: {
        type: 'IncrementManager',
        value: 0.267
      },
      initialAngle: 289.755,
    }
  },
  penHolder: {
    type: 'ScissorPenHolder',
    arm1Length: 723,
    arm2Length: 698,
    hingeOffset: 0.667
  },
  drawingTable: {
    type: 'RotatingDrawingTable',
    origin: {
      x: 350,
      y: 200
    },
    radiusLength: 400,
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.333
    },
    initialAngle: 0,
  }
}
