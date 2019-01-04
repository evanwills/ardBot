import { Circle} from './circle.interface';
import { PenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable } from './drawingTable.interface';

export class WhirliDoodleDrawer {
  private base1: Circle;
  private base2: Circle;
  private drawingSpace: DrawingTable;
  private penHolder: PenHolder;

  public constructor(base1: Circle, base2: Circle, penHolder: PenHolder, drawingSpace: DrawingTable = null) {
    this.base1 = base1;
    this.base2 = base2;
    this.penHolder = penHolder;

    if (drawingSpace === null) {
      this.drawingSpace = new StaticDrawingTable();
    } else {
      this.drawingSpace = drawingSpace;
    }
  }

  public draw() {
    return this.drawingSpace.movePen(
      this.penHolder.movePen(
        this.base1.rotatePoint(),
        this.base2.rotatePoint()
      )
    );
  }
}
