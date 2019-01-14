import { Coordinate } from './dataType.interfaces';
import { IncrementManager } from './incrementManager.interface';
import { wheelRotator, plusMinus360 } from './wheel.pureFunctions';

export abstract class DrawingTable {
  /**
   * movePen() calculates the position of the pen relative to the
   * centre of the drawing table.
   *
   * Each time this method is called the angle used to rotate the
   * position is increased by the increment provided in the
   * increment manager
   *
   * @param position the coordinates of the pen as defined by the
   *                 penHolder
   */
  public abstract movePen (position: Coordinate): Coordinate;
  public abstract redefineOrigin(newOrigin: Coordinate) : void;

}
export class StaticDrawingTable extends DrawingTable {

  public constructor() { super(); }

  /**
   * movePen() normally calculates the position of the pen relative
   * to the centre of the drawing table, but in this case we want the
   * position of the drawing table to be fixed (or static) so we just
   * return the supplied coordinate.
   *
   * It is possible to achieve the same outcome with
   * RotatingDrawingTable.movePen() but that way still requires a lot
   * of calculation so this is more efficient.
   *
   * @param position the coordinates of the pen as defined by the
   *                 penHolder
   */
  public movePen (position: Coordinate): Coordinate {
    return position;
  }

  public redefineOrigin(newOrigin: Coordinate) {}
}

export class RotatingDrawingTable extends DrawingTable {
  private origin: Coordinate = {x: 0, y: 0};
  private angleIncrement: IncrementManager;
  private cumulativeAngle: number = 0;

  public constructor(origin: Coordinate, angleIncrement: IncrementManager) {
    super();
    this.origin = origin;
    this.angleIncrement = angleIncrement;
  }

  public movePen (position: Coordinate) : Coordinate {
    return wheelRotator(
      this.origin,
      position,
      this.accumulateAngle()
    );
  }

  /**
   * accumulateAngle() increases the cumulative angle (used to
   * calculate the rotated pen position) by the specified increment.
   * Then ensures that the angle is within plus/minus 360 degrees.
   */
  private accumulateAngle() : number {
    this.cumulativeAngle = plusMinus360(
      this.cumulativeAngle + this.angleIncrement.getIncrementedStep()
    );
    return this.cumulativeAngle;
  }


  public redefineOrigin(newOrigin: Coordinate) {
    this.origin.x = newOrigin.x;
    this.origin.y = newOrigin.y;
  }
}
