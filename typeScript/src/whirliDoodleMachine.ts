import { Wheel} from './wheel.interface';
import { PenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable } from './drawingTable.interface';
import { Coordinate } from './dataType.interfaces';

export class WhirliDoodleMachine {
  private base1: Wheel;
  private base2: Wheel;
  private drawingSpace: DrawingTable;
  private penHolder: PenHolder;
  private oldCoordinate: Coordinate;
  private firstQuadratic: boolean = false;

  public constructor(base1: Wheel, base2: Wheel, penHolder: PenHolder, drawingSpace: DrawingTable = null) {
    this.base1 = base1;
    this.base2 = base2;
    this.penHolder = penHolder;

    if (drawingSpace === null) {
      this.drawingSpace = new StaticDrawingTable();
    } else {
      this.drawingSpace = drawingSpace;
    }
  }

  /**
   * draw() outputs the next X/Y coordinate to be used in the artwork.
   */
  public draw(): Coordinate {
    return this.drawingSpace.movePen(
      this.penHolder.movePen(
        this.base1.rotatePoint(),
        this.base2.rotatePoint()
      )
    );
  }
}
