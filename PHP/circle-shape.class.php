<?php

// ==================================================================
// START: circleType family

abstract class circleShapeInterface extends abstractCircle // interface
{
	/**
	 * @method	setRadiusPointXY() sets the _radiusPOintX &
	 *			 for the circle object
	 */
	abstract public function setRadiusPointXY( $x , $y );

	abstract public function rotateXY( $x , $y );

	abstract public function getRadiusPointX();

	abstract public function getRadiusPointY();
}


abstract class abstractCircleShape extends circleShapeInterface // interface
{
	protected $_angleStep;
	protected $_currentAngle = 0;
	protected $_initialAngle = 0;
	protected $_tmpAngle = 0;
	protected $_tmpX = 0;
	protected $_tmpY = 0;


	public function getRadiusPointX()
	{
		return $this->_tmpX;
	}

	public function getRadiusPointY()
	{
		return $this->_tmpY;
	}

	public function setRadiusPointXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$this->_radiusPointX = $x;
		$this->_radiusPointY = $y;
	}

	protected function _getPositiveDiff( $a , $b , &$isNeg )
	{
		if( $a > $b )
		{
			$isNeg = false;
			return $a - $b;
		}
		else
		{
			$isNeg = true;
			return $b - $a;
		}
	}

	protected function _setPosNeg( $input , $isNeg )
	{
		if( $isNeg === true )
		{
			return -$input;
		}
		else
		{
			return $input;
		}
	}

	protected function _getIsNeg( $input ) {
		if( $input < 0 )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * getAngle returns the angle based on value of $x & $y end point
	 * of a radius relative to origin 0,0
	 *
	 * NOTE: $x & $y must always be positive;
	 *
	 * @param [numeric] $x X coordinate of point on a circle relative
	 *                     relative to 0,0 origin
	 * @param [numeric] $y Y coordinate of point on a circle relative
	 *                     relative to 0,0 origin
	 * @return [numeric] angle
	 */
	protected function _getAngle( $x , $y )
	{
		return tan( $x * $y );
	}
}

class circle extends abstractCircleShape
{
	private $_radius;
//		double _getRadius( $X , $Y ) {
//			return
//		}
//		double _getAngle( radius ) {
//
//		}

	public function __construct( $initialAngle , stepper $angleStep , stepper $radius ) {
		if( !is_numeric($initialAngle) )
		{
			// throw
		}
		$this->_radius = $radius;
		$this->_initialAngle = $initialAngle;
		$this->_angleStep = $angleStep;
	}



	public function initXY( $originX , $originY )
	{
		// https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
		debug($originX,$originY);
		if( !is_numeric($originX) || !is_numeric($originY) )
		{
			// throw
		}

		$tmpOx = $this->_originX;
		$tmpOy = $this->_originY;
		$this->_originX = 0;
		$this->_originY = 0;
		$radius = $this->_radius->getStep();

		switch($this->_initialAngle) {
			case 0:
				$this->_radiusPointY = $radius;
				break;
			case 90:
				$this->_radiusPointX = $radius;
			case 180:
				$this->_radiusPointY = -$radius;
				break;
			case 270:
				$this->_radiusPointX = -$radius;
				break;
			default:
				// radius is used as the Y coordinate (12 O'Clock)
				$this->_radiusPointX = $this->_getRadiusX( $this->_initialAngle , $radius );
				$this->_radiusPointY = $this->_getRadiusY( $this->_initialAngle , $radius );
		}

		$this->_originX = $tmpOx;
		$this->_originY = $tmpOy;

		$this->_radiusPointX += $this->_originX;
		$this->_radiusPointY += $this->_originY;debug($this);
	}


	public function rotateXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}

		// make origin 0,0
		$relativeX = $this->_getPositiveDiff( $x , $this->_originX , $xIsNeg );
		$relativeY = $this->_getPositiveDiff( $y , $this->_originY , $yIsNeg );

		debug('$this->_originX = '.$this->_originX,'$x = '.$x,'$relativeX = '.$relativeX);
		debug('$this->_originY = '.$this->_originY,'$y = '.$y,'$relativeY = '.$relativeY);

/*
 * unnecessary with new equation

		// get the radius based on x,y
		$radius = sqrt( pow($relativeX,2) + pow($relativeY,2) );
		debug($radius.' = sqrt( pow('.$relativeX.',2) + pow('.$relativeY.',2) );', sqrt( pow($relativeX,2) + pow($relativeY,2) ));

		// get the new angle (calculate current angle then add angle step)
 */

		$step = $this->_angleStep->getStep();

		$this->_tmpX = $this->_setPosNeg(
							 $this->_getNewRadiusX( $step , $x , $y )
							,$xIsNeg
						)
						+ $this->_originX;
		$this->_tmpY = $this->_setPosNeg(
							 $this->_getNewRadiusY( $step , $x , $y )
							,$yIsNeg
						)
						+ $this->_originY;
	}

	public function rotate()
	{
		$this->_angleStep->updateStep();
		$this->_radius->updateStep();
		$this->rotateXY( $this->_radiusPointX , $this->_radiusPointY );
		$this->_radiusPointX = $this->_tmpX;
		$this->_radiusPointY = $this->_tmpY;
		$this->_currentAngle = $this->_tmpAngle;
	}

	private function _getRadiusX( $angle , $radius )
	{
		debug(
			 "$radius * sin($angle)"
			,"$radius * ".sin($angle)
			,$radius * sin($angle)
		);
		return $radius * sin($angle);
	}

	private function _getRadiusY( $angle , $radius )
	{
		debug(
			 "$radius * cos($angle)"
			,"$radius * ".cos($angle)
			,$radius * cos($angle)
		);
		return $radius * cos($angle);

	}

	private function _getNewRadiusX( $angle , $x , $y )
	{
		// see https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
		// in particular see https://upload.wikimedia.org/math/6/7/9/6794b4de87caedcc56ae6b759bb33c88.png

		debug(
			"($x * cos($angle)) - ($y * cos($angle))",
			"($x * ".cos($angle).") - ($y * ".sin($angle).")",
			($x * cos($angle)).' - '.($y * sin($angle)),
			($x * cos($angle)) - ($y * sin($angle))
		);

		return ($x * cos($angle)) - ($y * sin($angle));
	}

	private function _getNewRadiusY( $angle , $x , $y )
	{
		// see https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
		// in particular see https://upload.wikimedia.org/math/6/7/9/6794b4de87caedcc56ae6b759bb33c88.png

		debug(
			"($x * sin($angle)) - ($y * cos($angle))",
			"($x * ".sin($angle).") - ($y * ".cos($angle).")",
			($x * sin($angle)).' - '.($y * cos($angle)),
			($x * sin($angle)) - ($y * cos($angle))
		);
		return rad2deg( ( $x * sin($angle) ) - ( $y * cos($angle) ) );
	}
}

class ellipse extends abstractCircleShape
{
	private $_radiusX;
	private $_radiusY;
	private $_radiusOffsetX;
	private $_radiusOffsetY;

	public function __construct( $initalAngle , stepper $angleStep ,  stepper $radiusX , stepper $radiusY , stepper $radiusOffsetX , stepper $radiusOffsetY ) {
		$this->_initialAngle = $initialAngle;
		$this->_angleStep = $angleStep;
		$this->_radiusX = $radiusX;
		$this->_radiusY = $radiusY;
		$this->_radiusoffsetX = $radiusoffsetX;
		$this->_radiusoffsetY = $radiusoffsetY;
	}

	public function rotate( )
	{
	}

	public function rotateXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
	}

	public function initXY( $originX , $originY )
	{
		if( !is_numeric($originX) || !is_numeric($originY) )
		{
			// throw
		}
		$this->setOriginXY( $originX, $originY );
	}
}

//  END: circleType
// ==================================================================

