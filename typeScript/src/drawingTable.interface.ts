import { Coordinate } from "./whriliDoodle.interfaces";
import {IncrementManager} from './incrementManager.interface';
import {circleRotator} from './whirliDoodle.pureFunctions';

export abstract class DrawingTable {
  public abstract movePen (position: Coordinate): Coordinate;
}
export class StaticDrawingTable extends DrawingTable {
  public movePen (position: Coordinate): Coordinate {
    return position;
  }
}

export class RotatingDrawingTable extends StaticDrawingTable {
  private origin: Coordinate;
  private angleIncrement: IncrementManager;
  private cumulativeAngle: number;

  public constructor(origin: Coordinate, angleIncrement: IncrementManager, initialAngle: number = 0) {
    super();
    this.origin = origin;
    this.angleIncrement = angleIncrement;
    this.cumulativeAngle = initialAngle;
  }

  public movePen (position: Coordinate) : Coordinate {
    return circleRotator(
      this.origin,
      position,
      this.accumulateAngle()
    );
  }

  private accumulateAngle() {
    this.cumulativeAngle += this.angleIncrement.getIncrementedStep();
    if (this.cumulativeAngle > 360) {
      while(this.cumulativeAngle > 360) {
        this.cumulativeAngle -= 360;
      }
    } else if (this.cumulativeAngle < -360) {
      while(this.cumulativeAngle < -360) {
        this.cumulativeAngle += 360;
      }
    }
    return this.cumulativeAngle;
  }
}
