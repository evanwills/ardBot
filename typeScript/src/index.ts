import { Wheel, DoubleWheel } from './wheel.interface';
import {IncrementManager} from './incrementManager.interface';
import { PenHolder, TrianglePenHolder, ScissorPenHolder, TSquarePenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable, RotatingDrawingTable } from './drawingTable.interface';
import { WhirliDoodleMachine } from './whirliDoodleMachine';
// import { SVG } from 'SVG';
import { SVGnodes } from './SVGnodes';
import { init } from './initialState';


let steps: number = init.steps;

let base1: Wheel;
if (init.base1.type === 'DoubleWheel') {
  const base1Primary = {
    origin: init.base1.origin,
    radiusLength: init.base1.radiusLength,
    angleIncrement: new IncrementManager(init.base1.angleIncrement.value),
    initialAngle: init.base1.initialAngle
  }
  const base1Secondary = {
    origin: init.base1.origin,
    radiusLength: init.base1.extraWheel.radiusLength,
    angleIncrement: new IncrementManager(init.base1.extraWheel.angleIncrement.value),
    initialAngle: init.base1.extraWheel.initialAngle
  }
  base1 = new DoubleWheel(base1Primary, base1Secondary);
} else {
  base1 = new Wheel(init.base1.origin, init.base1.radiusLength, new IncrementManager(init.base1.angleIncrement.value), init.base1.initialAngle);
}


let base2: Wheel;
if (init.base2.type === 'DoubleWheel') {
  const base2Primary = {
    origin: init.base2.origin,
    radiusLength: init.base2.radiusLength,
    angleIncrement: new IncrementManager(init.base2.angleIncrement.value),
    initialAngle: init.base2.initialAngle
  }
  const base2Secondary = {
    origin: init.base2.origin,
    radiusLength: init.base2.extraWheel.radiusLength,
    angleIncrement: new IncrementManager(init.base2.extraWheel.angleIncrement.value),
    initialAngle: init.base2.extraWheel.initialAngle
  }
  base2 = new DoubleWheel(base2Primary, base2Secondary);
} else {
  base2 = new Wheel(init.base2.origin, init.base2.radiusLength, new IncrementManager(init.base2.angleIncrement.value), init.base2.initialAngle);
}

let penArm: PenHolder;
if (init.penHolder.type === 'TrianglePenHolder') {
  penArm = new TrianglePenHolder(
    init.penHolder.arm1Length,
    init.penHolder.arm2Length
  );
} else if (init.penHolder.type === 'ScissorPenHolder') {
  penArm = new ScissorPenHolder(
    init.penHolder.arm1Length,
    init.penHolder.hingeOffset,
    init.penHolder.arm2Length);
} else if (init.penHolder.type === 'TSquarePenHolder') {
  penArm = new TSquarePenHolder(
    init.penHolder.arm1Length
  );
}

let drawingTable: DrawingTable
if (init.drawingTable.type !== 'RotatingDrawingTable') {
  drawingTable = new StaticDrawingTable();
} else {
  drawingTable = new RotatingDrawingTable(
    init.drawingTable.origin,
    new IncrementManager(
      init.drawingTable.angleIncrement.value,
    ),
    init.drawingTable.initialAngle
  );
}

let machine = new WhirliDoodleMachine(base1, base2, penArm, drawingTable);
let SVGnode = new SVGnodes();

// let SVGelement = document.getElementById('svgWrap');

let nodes = '';
const SVGelementID = '#whirliDoodlePollyline';
// const SVGelementID = '#whirliDoodlePath';
// let output = [];
while (steps >= 0) {
  nodes += SVGnode.getNextPolylineNode(machine.draw());
  // nodes += SVGnode.getNextPathNode(machine.draw());
  $(SVGelementID).attr('points', nodes);
  steps -= 1;
}
