import {Coordinate, CircleConstructor} from './whirliDoodle.interfaces';
import {IncrementManager} from './incrementManager.interface';
import {wheelRotator, getRadiusPoint} from './whirliDoodle.pureFunctions';


export class Wheel {
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
    this.radiusPoint = wheelRotator(
      origin,
      this.radiusPoint,
      this.angleIncrement.getIncrementedStep()
    );
    return this.radiusPoint;
  }

  public rotateOrigin (origin: Coordinate, angle: number) {
    this.origin = wheelRotator(
      origin,
      this.origin,
      angle
    );
    this.radiusPoint = wheelRotator(
      origin,
      this.radiusPoint,
      angle
    );
    return this.origin;
  }

  public getRadiusPoint () { return this.radiusPoint; }
  public getOrigin () { return this.origin; }
}

export class CompoundWheel extends Wheel {
  private extraWheel: Wheel;

  public constructor (primaryWheel: CircleConstructor, secondaryWheel: CircleConstructor) {
    if (typeof primaryWheel.initialAngle === 'undefined') {
      primaryWheel.initialAngle = 0;
    }
    super(primaryWheel.origin, primaryWheel.radiusLength, primaryWheel.angleIncrement, primaryWheel.initialAngle);

    if (typeof secondaryWheel.initialAngle === 'undefined') {
      secondaryWheel.initialAngle = 0;
    }
    this.extraWheel = new Wheel(this.radiusPoint, secondaryWheel.radiusLength, secondaryWheel.angleIncrement, secondaryWheel.initialAngle);
  }


  public rotatePoint (origin: Coordinate = null) {
    if (origin === null) {
      origin = this.origin;
    }
    this.extraWheel.rotateOrigin(
      this.origin,
      this.angleIncrement.getIncrementedStep()
    );

    return this.extraWheel.rotatePoint();
  }


  public rotateOrigin (origin: Coordinate, angle: number) {
    this.origin = wheelRotator(
      origin,
      this.origin,
      angle
    );
    this.extraWheel.rotateOrigin(
      origin,
      angle
    );
    return this.origin;
  }

  public getRadiusPoint () { return this.extraWheel.getRadiusPoint(); }
}
