import {Coordinate, CircleConstructor} from './whriliDoodle.interfaces';
import {IncrementManager} from './incrementManager.interface';
import {circleRotator, getRadiusPoint} from './whirliDoodle.pureFunctions';


export class Circle {
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

  public rotateOrigin (origin: Coordinate, angle: number) {
    this.origin = circleRotator(
      origin,
      this.origin,
      angle
    );
    this.radiusPoint = circleRotator(
      origin,
      this.radiusPoint,
      angle
    );
    return this.origin;
  }

  public getRadiusPoint () { return this.radiusPoint; }
  public getOrigin () { return this.origin; }
}

export class CompoundCircle extends Circle {
  private extraCircle: Circle;

  public constructor (primaryCircle: CircleConstructor, secondaryCircle: CircleConstructor) {
    if (typeof primaryCircle.initialAngle === 'undefined') {
      primaryCircle.initialAngle = 0;
    }
    super(primaryCircle.origin, primaryCircle.radiusLength, primaryCircle.angleIncrement, primaryCircle.initialAngle);

    if (typeof secondaryCircle.initialAngle === 'undefined') {
      secondaryCircle.initialAngle = 0;
    }
    this.extraCircle = new Circle(this.radiusPoint, secondaryCircle.radiusLength, secondaryCircle.angleIncrement, secondaryCircle.initialAngle);
  }


  public rotatePoint (origin: Coordinate = null) {
    if (origin === null) {
      origin = this.origin;
    }
    this.extraCircle.rotateOrigin(
      this.origin,
      this.angleIncrement.getIncrementedStep()
    );

    return this.extraCircle.rotatePoint();
  }


  public rotateOrigin (origin: Coordinate, angle: number) {
    this.origin = circleRotator(
      origin,
      this.origin,
      angle
    );
    this.extraCircle.rotateOrigin(
      origin,
      angle
    );
    return this.origin;
  }

  public getRadiusPoint () { return this.extraCircle.getRadiusPoint(); }
}
