import { Coordinate } from './dataType.interfaces';

/**
 * All functions within this file are "Pure"
 * i.e. they have no side effects.
 * Given the same inputs they always return the same outputs.
 * No values outside the function are affected.
 */

/**
 * wheelRotator() is a pure function that simply rotates a given
 * point on a circle's circumference by the angle specified
 *
 * @param centre the Coordinate of the centre point of the circle
 * @param point the Coordinate for the point on the circumference of
 *               the circle that is to be rotated
 * @param angle the amount the circumference point is to be rotated
 *
 * @returns new Coordinate for the point on the circle's cirumference
 */
export const wheelRotator = function(centre: Coordinate, point: Coordinate, angle: number) : Coordinate {
  let tmpPoint = zeroOriginRadiusPoint(centre, point);

  // do rotation stuff
	let radAngle:number = deg2rad(angle);
	let	currentAngle: number = 0;
	let	radius: number;

	// make X & Y relative to this circle's origin
	let {x, y} = tmpPoint;

	// --------------------------------------------------------------
	//	rotate XY around a circle without needing radius
	//	(https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions)

  //	x = (x * Math.cos(angle)) - (y * Math.sin(angle));
  //	y = (x * Math.sin(angle)) + (y * Math.cos(angle));
	// --------------------------------------------------------------

	// rotate XY using basic trigonometry
	if (angle !== 0) {
		radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if (x !== 0 && y !== 0) {
      if (x === 0) {
        currentAngle = Math.atan(y);
      } else if (y === 0) {
        currentAngle = Math.atan(x);
      } else {
        currentAngle = Math.atan(y / x);
      }
    }
		currentAngle += radAngle;

		x = Math.cos(currentAngle) * radius;
		y = Math.sin(currentAngle) * radius;
	}
	// --------------------------------------------------------------

  // convert relative X & Y back to absolute X & Y
  return unZeroOriginRadiusPoint(centre, {x: x, y: y});
}

export const zeroOriginRadiusPoint = (origin: Coordinate, radiusPoint: Coordinate) : Coordinate => {
  return {
    x: radiusPoint.x - origin.x,
    y: radiusPoint.y - origin.y
  };
}
export const unZeroOriginRadiusPoint = (origin: Coordinate, radiusPoint: Coordinate) : Coordinate => {
  return {
    x: radiusPoint.x + origin.x,
    y: radiusPoint.y + origin.y
  };
}

const deg2rad = (degrees: number) : number => {
	return ((degrees * Math.PI) / 180);
};

/**
 * radiusModifier() is a pure function that adjusts the point
 * Coordinate on the circumference of a circle by increasing or
 * decreasing the radius of the circle
 *
 * @param centre the Coordinate of the centre point of the circle
 * @param point the Coordinate for the point on the circumference of
 *               the circle that is to be rotated
 * @param modifier the amount to increase or decrease the radius of
 *               the circle
 *
 * @returns new Coordinate for the point on the circle's cirumference
 */
export const radiusModifier = function(centre: Coordinate, point: Coordinate, modifier: number) : Coordinate {
  let angle: number = 0;
  let radius: number;
  let {x, y} = zeroOriginRadiusPoint(centre, point);

	// --------------------------------------------------------------
	// rotate XY using basic trigonometry
  radius = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * modifier;
  if (x !== 0 && y !== 0) {
    if (x === 0) {
      angle = Math.atan(y);
    } else if (y === 0) {
      angle = Math.atan(x);
    } else {
      angle = Math.atan(y / x);
    }
  }

  return unZeroOriginRadiusPoint (
    centre,
    {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  );
}

export const getRadiusPoint = (centre: Coordinate, length: number, angle: number ) : Coordinate => {

	let radAngle:number = deg2rad(angle);
  return unZeroOriginRadiusPoint(
    centre,
    {
      x: Math.cos(radAngle) * length,
      y: Math.sin(radAngle) * length
    }
  );
}

/**
 * plusMinus360() ensures that a given number is greater than or
 * equal to -360 and less than or equal to +360.
 *
 * @param input
 */
export const plusMinus360 = function (input: number) : number {
  let output = input;
  if (output > 360) {
    while(output > 360) {
      output -= 360;
    }
  } else if (output < -360) {
    while(output < -360) {
      output += 360;
    }
  }
  return output;
}

/**
 * signedDifference() returns the difference between two numbers.
 * If the newValue is less than the oldValue the returned output is
 * negative.
 *
 * @param newValue
 * @param oldValue
 */
export const signedDifference = function (newValue: number, oldValue: number) : number {
  if (newValue > oldValue) {
    return newValue - oldValue
  } else if (newValue < oldValue) {
    return -(oldValue - newValue);
  } else {
    return 0;
  }
}
