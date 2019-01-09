import {Coordinate, PenHolderArm, ScissorArm} from './whirliDoodle.interfaces';

/**
 * All functions within this file are "Pure"
 * i.e. they have no side effects.
 * Given the same inputs they always return the same outputs.
 * No values outside the function are affected.
 */

// ==============================================
// START: circle calculations

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

const zeroOriginRadiusPoint = (origin: Coordinate, radiusPoint: Coordinate) : Coordinate => {
  return {
    x: radiusPoint.x - origin.x,
    y: radiusPoint.y - origin.y
  };
}
const unZeroOriginRadiusPoint = (origin: Coordinate, radiusPoint: Coordinate) : Coordinate => {
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

//  END:  circle calculations
// ==============================================
// START: pen holder calculations

/**
 * trianglePenHolder() calculates the Coordinates of the pen based on
 * the length of the arms of the pen holder and the Coordinates of
 * the base of each arm
 *
 *       returned pen
 *   position coordinates
 *            /\
 *           /  \
 *  length1 /    \ length2
 *         /      \
 *        /        \
 *     base1      base2
 *
 * @param base1 the Coordinates for the base of arm 1
 * @param base2 the Coordinates for the base of arm 2
 * @param length1 the length of arm 1
 * @param length2 the length of arm 2 (defaults to length of arm 1)
 */
export const trianglePenHolder = function(base1: Coordinate, base2: Coordinate, length1: number, length2: number = null) : Coordinate {
  if (length2 === null) {
    length2 = length1;
  }
  if (length1 <= 0) {
    throw Error('scissorPenHolder expects third parameter length1 to be greater than zero');
  }
  if (length2 <= 0) {
    throw Error('scissorPenHolder expects fifth parameter length2 to be greater than zero');
  }
  if (length1 <= (length2 * 0.666667) || length1 >= length2 * 1.5) {
    throw Error('scissorPenHolder expects length1 to be no more than 130% and no less than 70% of length2.');
  }

  // adjust base2 so that base1 is 0, 0 (to make calculations easier)
  const zeroed2 = zeroOriginRadiusPoint(base1, base2);
  const baseLength = Math.sqrt(Math.pow(zeroed2.x, 2) + Math.pow(zeroed2.y, 2));

  // Since it's easier to calculating things if the base is at zero
  // degrees, we'll add the base's angle at the end
  const baseAngle = Math.tan(zeroed2.y / zeroed2.x); // b
  const angle1 = Math.cos(
    (
      Math.pow(baseLength, 2) +
      Math.pow(length1, 2) - // c
      Math.pow(length2, 2) // a
    )
    /
    (2 * (baseLength * length2))
  );

  // add the base angle
  return getRadiusPoint(base1, length1, angle1 + baseAngle);
}

/**
 * scissorPenHolder() calculates the Coordinates of the pen based on
 * the length of the arms of the pen holder and the Coordinates of
 * the base of each arm.
 *
 * Pen holder arms are arranged in a scissor configuration
 * e.g.
 *       returned pen
 *   position coordinates
 *           /\                       \ returnArm1             /
 *          /  \ secondaryArm          \ (secondary arm 1)    / returnArm2
 *         /    \                       \                    / (secondary arm 2)
 *         \    /                    /                 \
 *          \  / primaryArm         /                   \
 *           \/                    /                     \ (primaryArm2)
 *           /\ hingeOffset       / length1               \ length2
 *          /  \                 / (primaryArm1)         \
 *         /    \               /                           \
 *        /      \             /                             \
 *    base1      base2
 *
 * @param base1   the Coordinates for the base of length1
 * @param base2   the Coordinates for the base of length2
 * @param length1 the length of primary arm 1
 * @param hingeOffset the position of the hinge of the scissor
 *                a decimal value between 0.3 and 0.8
 * @param length2 the length of arm primary 2
 *                (defaults to length of arm 1)
 */
export const scissorPenHolder = function(base1: Coordinate, base2: Coordinate, length1: number, hingeOffset: number = 0.5, length2: number = null) : Coordinate {
  if (length2 === null) {
    length2 = length1;
  }
  if (length1 <= 0) {
    throw Error('scissorPenHolder() expects third parameter length1 to be greater than zero');
  }
  if (hingeOffset <= 0.3 || hingeOffset >= 0.8) {
    throw Error('scissorPenHolder() expects fourth parameter hingeOffset to be a number between 0.3 & less than 0.8 (inclusive). ' + hingeOffset + ' given.');
  }
  if (length2 <= 0) {
    throw Error('scissorPenHolder() expects fifth parameter length2 to be greater than zero');
  }
  if (length1 <= (length2 * 0.75) || length1 >= length2 * 1.333333) {
    throw Error('scissorPenHolder() expects third parameter length1 to be less than 133.3% and greater than 75% of length2.');
  }

  const primaryArm1 = length1 * hingeOffset;
  const primaryArm2 = length2 * hingeOffset;
  const secondaryArm1 = length1 * (1 - hingeOffset);
  const secondaryArm2 = length2 * (1 - hingeOffset);

  // adjust base2 so that base1 is 0, 0 (to make calculations easier)
  const zeroed2 = zeroOriginRadiusPoint(base1, base2);
  const baseLength = Math.sqrt(Math.pow(zeroed2.x, 2) + Math.pow(zeroed2.y, 2));

  // Since it's easier to calculating things if the base is at zero
  // degrees, we'll add the base's angle at the end
  const baseAngle = Math.tan(zeroed2.y / zeroed2.x);
  const angle1 = Math.cos(
    (
      Math.pow(baseLength, 2) + // b
      Math.pow(primaryArm1, 2) - // c
      Math.pow(primaryArm2, 2) // a
    )
    /
    (2 * (baseLength * primaryArm2))
  );
  const angle2 = Math.cos(
    (
      Math.pow(primaryArm2, 2) + // a
      Math.pow(baseLength, 2) - // b
      Math.pow(primaryArm1, 2) // c
    )
    /
    (2 * (primaryArm2 * baseLength))
  );

  // use the trianglePenholder function to get the final coordinate
  // of the end of scissor using the coordinates of the ends of the
  // primary arms as the base of the triangle.
  return trianglePenHolder(
    // get the coordinate of the end of the first primary arm of
    // the scissor
    getRadiusPoint(base1, length1, angle1 + baseAngle),
    // get the coordinate of the end of the second primary arm of
    // the scissor
    getRadiusPoint(base2, length2, angle2 + baseAngle),
    secondaryArm1,
    secondaryArm2
  );
}

/**
 * TPenHolder() calculates the Coordinates of the pen based on the
 * length of a central arm (that is always halfway along the
 * baseLength) and the Coordinates of each end of the baseLength
 *
 * Pen holder arms are arranged in a T configuration
 * e.g.
 *       returned pen
 *   position coordinates
 *             |
 *             | length
 *             |
 *             |
 *   base1     |      base2
 *      ---------------
 *         baseLength
 *
 * @param base1 the Coordinates for the base of arm 1
 * @param base2 the Coordinates for the base of arm 2
 * @param length the length of vertical part of the T
 */
export const TPenHolder = function(base1: Coordinate, base2: Coordinate, length: number) : Coordinate {
  if (length <= 0) {
    throw Error('TPenHolder() expects third parameter length to be greater than zero');
  }

  // adjust base2 so that base1 is 0, 0 (to make calculations easier)
  const zeroed2 = zeroOriginRadiusPoint(base1, base2);

  // WE half the base length because we always want the vertical part
  // of the T to be centred on the base.
  const baseLength = (Math.sqrt(Math.pow(zeroed2.x, 2) + Math.pow(zeroed2.y, 2)) / 2);

  // Since it's easier to calculating things if the base is at zero
  // degrees, we'll add the base's angle at the end
  const baseAngle = Math.tan(zeroed2.y / zeroed2.x);

  // the T pen holder essentially forms an isoscelese triangle so we
  // can just use tan to calculate one angle
  const angle1 = Math.tan(length / baseLength)

  // add the base angle
  return getRadiusPoint(base1, length, angle1 + baseAngle);
}

//  END:  pen holder calculations
// ==============================================

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
