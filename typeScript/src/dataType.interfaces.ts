import { IncrementManager } from "./incrementManager.interface";

export interface Coordinate {
  x: number,
  y: number
}

export interface Circle {
  centre: Coordinate,
  circumferencePoint: Coordinate
}

export interface WheelConstructor {
  radiusLength: number,
  angleIncrement: IncrementManager,
  initialAngle?: number
}

export interface PenHolderArm {
  base: Coordinate,
  // one arm length must be no greater than 1.3 * larger than its
  // partner and no smaller than 0.7 * its partner
  length: number
}

export interface ScissorArm extends PenHolderArm {
  pivotOffset: number, // pivotOffset must be greater than 0.3 & less than 0.8
  returnLength: number
}

export interface minMax {
  min: number,
  max: number
}

export interface BaseOffsets {
  base1Length: number,
  base2Length?: number,
  offsetAngle: number
}
