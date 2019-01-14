import { Wheel} from './wheel.interface';
import { PenHolder } from './penHolder.interface';
import { DrawingTable, StaticDrawingTable } from './drawingTable.interface';
import { Coordinate, BaseOffsets } from './dataType.interfaces';
import { getRadiusPoint } from './wheel.pureFunctions'

export class WhirliDoodleMachine {
  private base1: Wheel;
  private base2: Wheel;
  private drawingSpace: DrawingTable;
  private penHolder: PenHolder;
  readonly drawingSpaceLimit: Coordinate;
  // private firstQuadratic: boolean = false;

  public constructor(base1: Wheel, base2: Wheel, penHolder: PenHolder, drawingSpace: DrawingTable, baseOffsets: BaseOffsets = null) {
    this.base1 = base1;
    this.base2 = base2;
    this.penHolder = penHolder;
    let maxLength:number;
    let maxRadius:number = base1.getRadiusLength();

    if (drawingSpace === null) {
      this.drawingSpace = new StaticDrawingTable();
    } else {
      this.drawingSpace = drawingSpace;
    }
    if (baseOffsets === null) {
      baseOffsets = {
        base1Length: penHolder.getArmExtent(1),
        base2Length: penHolder.getArmExtent(2),
        offsetAngle: penHolder.defaultOffsetAngle
      }
    } else if (baseOffsets.hasOwnProperty('base2Length')) {
      baseOffsets.base2Length = baseOffsets.base1Length;
    }

    if (base2.getRadiusLength() > maxRadius) {
      maxRadius = base2.getRadiusLength();
    }
    if (baseOffsets.base1Length > baseOffsets.base2Length) {
      maxLength = baseOffsets.base1Length;
    } else {
      maxLength = baseOffsets.base2Length;
    }
    this.drawingSpaceLimit = {
      x: maxLength * 2.2,
      y: maxLength * 2.2,
    }

    const drawingSpaceOrigin: Coordinate = {x: (maxLength * 1.1), y: (maxLength * 1.1)};
    const halfAngle = (baseOffsets.offsetAngle / 2);

    this.drawingSpace.redefineOrigin(drawingSpaceOrigin);

    this.base1.redefineOrigin(
      getRadiusPoint(
        drawingSpaceOrigin,
        ((baseOffsets.base1Length + base1.getRadiusLength()) * 1.2),
        -halfAngle
      )
    );

    this.base2.redefineOrigin(
      getRadiusPoint(
        drawingSpaceOrigin,
        ((baseOffsets.base2Length + base2.getRadiusLength()) * 1.2),
        halfAngle
      )
    );
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
