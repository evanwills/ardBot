import { Wheel} from './wheel.interface';
import { PenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable } from './drawingTable.interface';
import { Coordinate } from './whirliDoodle.interfaces';

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
   * draw() outputs SVG quadratic curve coordinates
   */
  public draw(): string {
    const newCoordinate = this.drawingSpace.movePen(
      this.penHolder.movePen(
        this.base1.rotatePoint(),
        this.base2.rotatePoint()
      )
    );
    if (this.oldCoordinate === null) {
      this.oldCoordinate = newCoordinate;
      return "M " + newCoordinate.x + ',' + newCoordinate.y + ' Q';
    } else {
      // Need to work out how to set up cubic bezier points
      // See https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Curve_commands
      // for more info.
      let quadratic = '';
      if (this.firstQuadratic === false) {
        // somehow calculate quatratic control node
        quadratic += 'T';
        this.firstQuadratic = true;
      }
      const relativeCoordinate = {
        x: this.oldCoordinate.x - newCoordinate.x,
        y: this.oldCoordinate.y - newCoordinate.y
      }
      this.oldCoordinate = newCoordinate;
      return quadratic + ' ' + relativeCoordinate.x + ',' + relativeCoordinate.y;
    }
  }
}