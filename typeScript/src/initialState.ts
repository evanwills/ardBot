export const steps = 20000;

export const config = {
  base1: {
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.025
    },
    extraWheel: {
      radiusLength: 173,
      angleIncrement: {
        type: 'IncrementManager',
        value: -0.0145
      },
      initialAngle: 198.5,
    },
    initialAngle: 37,
    radiusLength: 250,
    type: 'DoubleWheel'
  },
  base2: {
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.00485
    },
    extraWheel: {
      angleIncrement: {
        type: 'IncrementManager',
        value: 0.00267
      },
      initialAngle: 289.755,
      radiusLength: 121
    },
    initialAngle: 37,
    radiusLength: 350,
    type: 'DoubleWheel'
  },
  penHolder: {
    type: 'ScissorPenHolder',
    arm1Length: 723,
    arm2Length: 698,
    hingeOffset: 0.667
  },
  drawingTable: {
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.000333
    },
    radiusLength: 400,
    type: 'RotatingDrawingTable'
  },
  baseOffsets: {
    base1Length: 650,
    base2Length: 700,
    offsetAngle: 30
  }
}
