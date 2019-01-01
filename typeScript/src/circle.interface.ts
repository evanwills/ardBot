import {Coordinate, PenHolderArm} from './whriliDoodle.interfaces';
import {IncrementManager} from './incrementManager';
import {circleRotator, getRadiusPoint} from './whirliDoodle.pureFunctions';


class Circle {
  protected origin: Coordinate;
  protected radiusPoint: Coordinate;
  protected radiusLength: number;
  protected angleIncrement: IncrementManager;

  public constructor (origin: Coordinate, radiusLength: number, angleIncrement: IncrementManager, initialAngle: number = 0) {
    this.origin = origin;
    this.radiusLength = radiusLength;
    this.angleIncrement = angleIncrement;
    this.radiusPoint = getRadiusPoint(origin, radiusLength, initialAngle);
  }

  public rotatePoint (origin: Coordinate = null) {
    if (origin === null) {
      origin = this.origin;
    }
    this.radiusPoint = circleRotator(
      origin,
      this.radiusPoint,
      this.angleIncrement.getIncrementedStep()
    );
    return this.radiusPoint;
  }

  public getRadiusPoint () { return this.radiusPoint; }
  public getOrigin () { return this.origin; }

  public setRotatedOrigin (origin: Coordinate) { this.origin = origin; }
}

/**
 * CumulativeCircle applies an accumulating angle to the coordinates
 * of the pen before rendering those coordinates to the SVG path.
 */
class CumulativeCircle extends Circle {
  private cumulativeAngle: number;

  public constructor (origin: Coordinate, radiusLength: number, angleIncrement: IncrementManager, initialAngle: number = 0) {
    super(origin, radiusLength, angleIncrement, initialAngle);
  }

  public rotatePoint (origin: Coordinate = null) {
    if (origin === null) {
      origin = this.origin;
    }

    this.radiusPoint = circleRotator(
      origin,
      this.radiusPoint,
      this.accumulateAngle()
    );

    return this.radiusPoint;
  }

  private accumulateAngle() {
    this.cumulativeAngle += this.angleIncrement.getIncrementedStep();
    while(this.cumulativeAngle > 360) {
      this.cumulativeAngle -= 360;
    }
    return this.cumulativeAngle;
  }
}
