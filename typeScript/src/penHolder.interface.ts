import { Coordinate } from "./dataType.interfaces";
import { trianglePenHolder, scissorPenHolder, TPenHolder } from './penHolder.pureFunctions';

export abstract class PenHolder {
  readonly type: string = 'unknown';
  readonly defaultOffsetAngle: number = 30;
  readonly maxOffsetAngle: number = 90;

  public abstract movePen(base1: Coordinate, base2: Coordinate): Coordinate;

  public abstract getArmExtent(arm: number) : number;
}

export class TrianglePenHolder extends PenHolder {
  private length1: number;
  private length2: number;
  readonly type: string = 'triangle';
  readonly defaultOffsetAngle: number = 90;
  readonly maxOffsetAngle: number = 90;

  public constructor (length1: number, length2: number) {
    super();
    if (length1 <= 0) {
      throw Error('TrianglePenHolder constructor expects first parameter length1 to be a number greater than zero. ' + length1 + ' given.');
    }
    if (length2 <= 0) {
      throw Error('TrianglePenHolder constructor expects second parameter length2 to be a number greater than zero. ' + length2 + ' given.');
    }
    this.length1 = length1;
    this.length2 = length2;
  }

  public movePen (base1: Coordinate, base2: Coordinate): Coordinate {
    return trianglePenHolder(base1, base2, this.length1, this.length2);
  }

  public getArmExtent(arm: number) : number {
    if (arm === 1) {
      return this.length1;
    } else {
      return this.length2;
    }
  }
}


export class ScissorPenHolder extends PenHolder {
  private length1: number;
  private length2: number;
  private hingeOffset: number;
  readonly type: string = 'scissor';
  readonly defaultOffsetAngle: number = 30;
  readonly maxOffsetAngle: number = 45;
  // private return1: number;
  // private return2: number;

  public constructor (length1: number, hingeOffset: number = 0.5, length2: number = null) {
    super();
    if (length2 === null) {
      length2 = length1
    }
    if (length1 <= 0) {
      throw Error('ScissorPenHolder constructor expects first parameter length1 to be a number greater than zero. ' + length1 + ' given.');
    }
    if (length2 <= 0) {
      throw Error('ScissorPenHolder constructor expects three parameter length2 to be a number greater than zero. ' + length2 + ' given.');
    }
    if (hingeOffset <= 0.3 || hingeOffset >= 0.8) {
      throw Error('ScissorPenHolder constructor expects two parameter hingeOffset to be a number greater than 0.3 & less than 0.8. ' + hingeOffset + ' given.');
    }

    this.length1 = length1;
    this.length2 = length2;
    this.hingeOffset = hingeOffset;
  }

  public movePen (base1: Coordinate, base2: Coordinate): Coordinate {
    return scissorPenHolder(base1, base2, this.length1, this.hingeOffset, this.length2);
  }

  public getArmExtent(arm: number) : number {
    let len;
    if (arm === 1) {
      len = this.length1;
    } else {
      len = this.length2;
    }
    return ((len * (1 - this.hingeOffset)) + len);
  }
}

export class TSquarePenHolder extends PenHolder {
  private length: number;
  readonly type: string = 'tSquare';
  readonly defaultOffsetAngle: number = 30;
  readonly maxOffsetAngle: number = 45;

  public constructor (length: number) {
    super();
    if (length <= 0) {
      throw Error('TrianglePenHolder constructor expects first parametesr length to be a number greater than zero. ' + length + ' given.');
    }
    this.length = length;
  }

  public movePen (base1: Coordinate, base2: Coordinate): Coordinate {
    return TPenHolder(base1, base2, this.length);
  }

  public getArmExtent(arm: number) : number {
    return this.length;
  }
}

