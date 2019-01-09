import { Coordinate } from "./whirliDoodle.interfaces";
import {trianglePenHolder, scissorPenHolder, TPenHolder} from './whirliDoodle.pureFunctions';

export abstract class PenHolder {
  public abstract movePen(base1: Coordinate, base2: Coordinate): Coordinate;
}

export class TrianglePenHolder extends PenHolder {
  private length1: number;
  private length2: number;

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
}


export class ScissorPenHolder extends PenHolder {
  private length1: number;
  private length2: number;
  private hingeOffset: number;
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
}

export class TSquarePenHolder extends PenHolder {
  private length: number;

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
}

