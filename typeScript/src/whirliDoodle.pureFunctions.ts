import {Coordinate, PenHolderArm, ScissorArm} from './whriliDoodle.interfaces';


/**
 * circleRotator() is a pure function that simply rotates a given
 * point on a circle by the angle specified
 * 
 * @param centre the Coordinate of the centre point of the circle
 * @param point the Coordinate for the point on the circumference of
 *               the circle that is to be rotated
 * @param angle the amount the circumference point is to be rotated
 * 
 * @returns new Coordinate for the point on the circle's cirumference
 */
export const circleRotator = function(centre: Coordinate, point: Coordinate, angle: number) : Coordinate {
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

/**
 * trianglePenHolder() calculates the Coordinates of the pen based on
 * the length of the arms of the pen holder and the Coordinates of
 * the base of each arm
 * 
 * @param arm1 the Coordinates for the base of arm 1
 * @param arm2 the Coordinates for the base of arm 2
 * @param length1 the length of arm 1
 * @param length2 the length of arm 2 (defaults to length of arm 1)
 */
export const trianglePenHolder = function(arm1: PenHolderArm, arm2: PenHolderArm) : Coordinate {
  
  if (arm1.length <= 0 || arm2.length <= 0 || arm1.length <= (arm2.length * 0.7) || arm1.length >= arm2.length * 1.3) {
    throw Error('trianglePenHolder expects at least one arm to have a length greater than zero and be no more than 130% bigger than the other arm and no smaller than 70% of the other arm.');
  }
  
  return {
    x: 0,
    y: 0
  }
}

export const scissorPenHolder = function(arm1: ScissorArm, arm2: ScissorArm) : Coordinate {   
  if (arm1.length <= 0 || arm2.length <= 0 || arm1.length <= (arm2.length * 0.7) || arm1.length >= arm2.length * 1.3) {
    throw Error('trianglePenHolder expects at least one arm to have a length greater than zero and be no more than 130% bigger than the other arm and no smaller than 70% of the other arm.');
  }

  
  return {
    x: 0,
    y: 0
  }
}

export const TPenHolder = function(origin1: Coordinate, origin2: Coordinate, length: number) : Coordinate {  
  return {
    x: 0,
    y: 0
  }
}