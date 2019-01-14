import { Coordinate, WheelConstructor } from './dataType.interfaces';
import { IncrementManager} from './incrementManager.interface';
import { wheelRotator, getRadiusPoint, plusMinus360, signedDifference } from './wheel.pureFunctions';


export class Wheel {
  protected origin: Coordinate = {x: 0, y: 0};
  protected radiusPoint: Coordinate;
  protected radiusLength: number;
  protected angleIncrement: IncrementManager;

  public constructor (radiusLength: number, angleIncrement: IncrementManager, initialAngle: number = 0) {
    this.radiusLength = radiusLength;
    this.angleIncrement = angleIncrement;
    this.radiusPoint = getRadiusPoint(this.origin, radiusLength, plusMinus360(initialAngle));
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
  public getRadiusLength () : number { return this.radiusLength; }

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
  public getRadiusLength () : number { return this.radiusLength + this.secondaryWheel.getRadiusLength(); }

  public redefineOrigin(newOrigin: Coordinate) {
    super.redefineOrigin(newOrigin);
    this.secondaryWheel.redefineOrigin(this.radiusPoint);
  }
}

export class DoubleWheel extends MultiWheel {
  public constructor (primaryWheel: WheelConstructor, secondaryWheel: WheelConstructor) {
    if (typeof primaryWheel.initialAngle === 'undefined') {
      primaryWheel.initialAngle = 0;
    }
    super(primaryWheel.radiusLength, primaryWheel.angleIncrement, primaryWheel.initialAngle);

    if (typeof secondaryWheel.initialAngle === 'undefined') {
      secondaryWheel.initialAngle = 0;
    }
    this.secondaryWheel = new Wheel(secondaryWheel.radiusLength, secondaryWheel.angleIncrement, secondaryWheel.initialAngle);
    this.secondaryWheel.redefineOrigin(this.radiusPoint);
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
  public constructor (primaryWheel: WheelConstructor, secondaryWheel: Wheel) {
    if (typeof primaryWheel.initialAngle === 'undefined') {
      primaryWheel.initialAngle = 0;
    }
    super(primaryWheel.radiusLength, primaryWheel.angleIncrement, primaryWheel.initialAngle);

    this.secondaryWheel = secondaryWheel;
    this.secondaryWheel.redefineOrigin(this.radiusPoint);
  }
}
