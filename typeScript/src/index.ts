import { Wheel, DoubleWheel } from './wheel.interface';
import {IncrementManager} from './incrementManager.interface';
import { PenHolder, TrianglePenHolder, ScissorPenHolder, TSquarePenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable, RotatingDrawingTable } from './drawingTable.interface';
import { WhirliDoodleMachine } from './whirliDoodleMachine';
// import { SVG } from 'SVG';
import { SVGnodes } from './SVGnodes';
import { steps, config } from './initialState';
// import { steps, config } from './initialState.simpleTriangle';


let currentStep: number = steps;

let base1: Wheel;
console.log('config.base1.type:', config.base1.type)
if (config.base1.type === 'DoubleWheel') {
  const base1Primary = {
    radiusLength: config.base1.radiusLength,
    angleIncrement: new IncrementManager(config.base1.angleIncrement.value),
    initialAngle: config.base1.initialAngle
  }
  const base1Secondary = {
    radiusLength: config.base1.extraWheel.radiusLength,
    angleIncrement: new IncrementManager(config.base1.extraWheel.angleIncrement.value),
    initialAngle: config.base1.extraWheel.initialAngle
  }
  base1 = new DoubleWheel(base1Primary, base1Secondary);
} else {
  base1 = new Wheel(config.base1.radiusLength, new IncrementManager(config.base1.angleIncrement.value), config.base1.initialAngle);
}


let base2: Wheel;
console.log('config.base1.type:', config.base2.type)
if (config.base2.type === 'DoubleWheel') {
  const base2Primary = {
    radiusLength: config.base2.radiusLength,
    angleIncrement: new IncrementManager(config.base2.angleIncrement.value),
    initialAngle: config.base2.initialAngle
  }
  const base2Secondary = {
    radiusLength: config.base2.extraWheel.radiusLength,
    angleIncrement: new IncrementManager(config.base2.extraWheel.angleIncrement.value),
    initialAngle: config.base2.extraWheel.initialAngle
  }
  base2 = new DoubleWheel(base2Primary, base2Secondary);
} else {
  base2 = new Wheel(config.base2.radiusLength, new IncrementManager(config.base2.angleIncrement.value), config.base2.initialAngle);
}

let penArm: PenHolder;
console.log('config.penHolder.type:', config.penHolder.type)
if (config.penHolder.type === 'TrianglePenHolder') {
  penArm = new TrianglePenHolder(
    config.penHolder.arm1Length,
    config.penHolder.arm2Length
  );
} else if (config.penHolder.type === 'ScissorPenHolder') {
  penArm = new ScissorPenHolder(
    config.penHolder.arm1Length,
    config.penHolder.hingeOffset,
    config.penHolder.arm2Length);
} else if (config.penHolder.type === 'TSquarePenHolder') {
  penArm = new TSquarePenHolder(
    config.penHolder.arm1Length
  );
}

let drawingTable: DrawingTable
console.log('config.drawingTable.type:', config.drawingTable.type)
if (config.drawingTable.type !== 'RotatingDrawingTable') {
  drawingTable = new StaticDrawingTable();
} else {
  drawingTable = new RotatingDrawingTable(
    {
      x: config.drawingTable.radiusLength,
      y: config.drawingTable.radiusLength
    },
    new IncrementManager(
      config.drawingTable.angleIncrement.value,
    )
  );
}

let machine = new WhirliDoodleMachine(base1, base2, penArm, drawingTable);
let SVGnode = new SVGnodes();

let SVGwrapper = document.getElementById('svgWrap');
$(SVGwrapper).attr('width', machine.drawingSpaceLimit.x);
$(SVGwrapper).attr('height', machine.drawingSpaceLimit.y);
$(SVGwrapper).attr('viewport', '0 0 ' + machine.drawingSpaceLimit.x + ' ' + machine.drawingSpaceLimit.y);

let nodes = '';
const SVGelementID = '#whirliDoodlePollyline';
// const SVGelementID = '#whirliDoodlePath';
// let output = [];
while (currentStep >= 0) {
  nodes += SVGnode.getNextPolylineNode(machine.draw());
  // nodes += SVGnode.getNextPathNode(machine.draw());
  $(SVGelementID).attr('points', nodes);
  currentStep -= 1;
}
