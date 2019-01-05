import { Coordinate } from "./whirliDoodle.interfaces";
import {trianglePenHolder, scissorPenHolder, TpenHolder} from './whirliDoodle.pureFunctions';

export abstract class PenHolder {
  public abstract movePen(base1: Coordinate, base2: Coordinate): Coordinate;
}

export class TrianglePenHolder extends PenHolder {
  private length1: number;
  private length2: number;

  public constructor(length1: number, length2: number) {
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
  public movePen(base1: Coordinate, base2: Coordinate): Coordinate {
    const arm1 = {
      base: base1,
      length: this.length1
    }
    const arm2 = {
      base: base2,
      length: this.length2
    }
    return trianglePenHolder(arm1, arm2);
  }
}


export class ScissorPenHolder extends PenHolder {
  private length1: number;
  private length2: number;
  private offset1: number;
  private offset2: number;
  private return1: number;
  private return2: number;

  public constructor(length1: number, offset1: number, length2: number, offset2: number) {
    super();
    if (length1 <= 0) {
      throw Error('TrianglePenHolder constructor expects first parameter length1 to be a number greater than zero. ' + length1 + ' given.');
    }
    if (length2 <= 0) {
      throw Error('TrianglePenHolder constructor expects three parameter length2 to be a number greater than zero. ' + length2 + ' given.');
    }
    if (offset1 <= 0.3 || offset1 >= 0.8) {
      throw Error('TrianglePenHolder constructor expects two parameter offset1 to be a number greater than zero. ' + offset1 + ' given.');
    }
    if (offset2 <= 0.3 || offset2 >= 0.8) {
      throw Error('TrianglePenHolder constructor expects four parameter offset2 to be a number greater than zero. ' + offset2 + ' given.');
    }
    this.length1 = length1;
    this.length2 = length2;
    this.offset1 = offset1;
    this.offset2 = offset2;
    this.return1 = length1 * (1 - offset1);
    this.return2 = length2 * (1 - offset2);
  }
  public movePen(base1: Coordinate, base2: Coordinate): Coordinate {
    const arm1 = {
      base: base1,
      length: this.length1,
      pivotOffset: this.offset1,
      returnLength: this.return1
    }
    const arm2 = {
      base: base2,
      length: this.length2,
      pivotOffset: this.offset2,
      returnLength: this.return2
    }
    return scissorPenHolder(arm1, arm2);
  }
}

export class TSquarePenHolder extends PenHolder {
  private length: number;

  public constructor(length: number) {
    super();
    if (length <= 0) {
      throw Error('TrianglePenHolder constructor expects first parametesr length to be a number greater than zero. ' + length + ' given.');
    }
    this.length = length;
  }
  public movePen(base1: Coordinate, base2: Coordinate): Coordinate {
    return TpenHolder(base1, base2, this.length);
  }
}

