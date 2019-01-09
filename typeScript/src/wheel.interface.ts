import {Coordinate, CircleConstructor} from './whirliDoodle.interfaces';
import {IncrementManager} from './incrementManager.interface';
import {wheelRotator, getRadiusPoint, plusMinus360, signedDifference} from './whirliDoodle.pureFunctions';


export class Wheel {
  protected origin: Coordinate;
  protected radiusPoint: Coordinate;
  protected radiusLength: number;
  protected angleIncrement: IncrementManager;

  public constructor (origin: Coordinate, radiusLength: number, angleIncrement: IncrementManager, initialAngle: number = 0) {
    this.origin = origin;
    this.radiusLength = radiusLength;
    this.angleIncrement = angleIncrement;
    this.radiusPoint = getRadiusPoint(origin, radiusLength, plusMinus360(initialAngle));
  }

  /**
   * rotatePoint() rotates the radius point of a circle around the
   * circumference of the circle by the amount defince by
   * Wheel.angleIncrement
   *
   * Returns the updated (rotated) radius point
   */
  public rotatePoint () : Coordinate {
    this.radiusPoint = wheelRotator(
      this.origin,
      this.radiusPoint,
      this.angleIncrement.getIncrementedStep()
    );
    return this.radiusPoint;
  }

  /**
   * rotateOrigin() rotates this wheeel's origin and radius point
   * round the given origin by the given angle
   *
   * Method is indended to be used by DoubleWheel to rotate its
   * secondaryWheel around the primaryWheel's origin.
   * @param origin
   * @param angle
   */
  public rotateOrigin (origin: Coordinate, angle: number) : Coordinate {
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

  public getRadiusPoint () : Coordinate { return this.radiusPoint; }
  public getOrigin () : Coordinate { return this.origin; }

  public redefineOrigin(newOrigin: Coordinate) {
    const xOffset = signedDifference(newOrigin.x, this.origin.x);
    const yOffset = signedDifference(newOrigin.y, this.origin.y);

    this.origin.x += xOffset;
    this.origin.y += yOffset;
    this.radiusPoint.x += xOffset;
    this.radiusPoint.y += yOffset;
  }
}

export abstract class MultiWheel extends Wheel {
  protected secondaryWheel: Wheel;

  public rotatePoint (origin: Coordinate = null) {
    if (origin === null) {
      origin = this.origin;
    }

    this.secondaryWheel.rotateOrigin(
      origin,
      this.angleIncrement.getIncrementedStep()
    );

    return this.secondaryWheel.rotatePoint();
  }

  public rotateOrigin (origin: Coordinate, angle: number) {
    this.origin = wheelRotator(
      origin,
      this.origin,
      angle
    );

    this.secondaryWheel.rotateOrigin(
      origin,
      angle
    );
    return this.origin;
  }

  public getRadiusPoint () { return this.secondaryWheel.getRadiusPoint(); }

  public redefineOrigin(newOrigin: Coordinate) {
    super.redefineOrigin(newOrigin);
    this.secondaryWheel.redefineOrigin(this.radiusPoint);
  }
}

export class DoubleWheel extends MultiWheel {
  public constructor (primaryWheel: CircleConstructor, secondaryWheel: CircleConstructor) {
    if (typeof primaryWheel.initialAngle === 'undefined') {
      primaryWheel.initialAngle = 0;
    }
    super(primaryWheel.origin, primaryWheel.radiusLength, primaryWheel.angleIncrement, primaryWheel.initialAngle);

    if (typeof secondaryWheel.initialAngle === 'undefined') {
      secondaryWheel.initialAngle = 0;
    }
    this.secondaryWheel = new Wheel(this.radiusPoint, secondaryWheel.radiusLength, secondaryWheel.angleIncrement, secondaryWheel.initialAngle);
  }
}

/**
 * CompundWheel works exactly like DoubleWheel but it allows you to
 * nest an arbitrary number secondary wheels inside each other.
 *
 * The down side is that, for each outer wheel you must manually
 * create a new object, passing the previously created wheel as the
 * second parameter
 */
export class CompoundWheel extends MultiWheel {
  public constructor (primaryWheel: CircleConstructor, secondaryWheel: Wheel) {
    if (typeof primaryWheel.initialAngle === 'undefined') {
      primaryWheel.initialAngle = 0;
    }
    super(primaryWheel.origin, primaryWheel.radiusLength, primaryWheel.angleIncrement, primaryWheel.initialAngle);

    this.secondaryWheel = secondaryWheel;
    this.secondaryWheel.redefineOrigin(this.radiusPoint);
  }
}
