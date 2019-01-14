export const steps = 20000;

export const config = {
  base1: {
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.025
    },
    initialAngle: 0,
    radiusLength: 250,
    type: 'Wheel'
  },
  base2: {
    angleIncrement: {
      type: 'IncrementManager',
      value: 0.00485
    },
    initialAngle: 0,
    radiusLength: 250,
    type: 'Wheel'
  },
  penHolder: {
    type: 'TrianglePenHolder',
    arm1Length: 750,
    arm2Length: 750
  },
  drawingTable: {
    // angleIncrement: {
    //   type: 'IncrementManager',
    //   value: 0.000333
    // },
    // radiusLength: 400,
    type: 'StaticDrawingTable'
  // },
  // baseOffsets: {
  //   base1Length: 650,
  //   base2Length: 700,
  //   offsetAngle: 30
  }
}
