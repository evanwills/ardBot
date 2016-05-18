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
	protected $_currentAngle;
	protected $_initialAngle;
	protected $_tmpAngle;
	protected $_tmpX;
	protected $_tmpY;


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

	public function rotateXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$relativeX = $this->x - $this->_orginX;
		$relativeY = $this->y - $this->_orginY;
		$radius = sqrt( sq($relativeX) + sq($relativeY) );
		$_tmpAngle = sin( $relativeY / $radius ) + $this->_angleStep->getStep();

		$newAngle =  deg2rad( $_tmpAngle );

		$this->_tmpX = ($radius * acos($newAngle) ) + $this->_originX;
		$this->_tmpX = ($radius * asin($newAngle) ) + $this->_originY;
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



	public function initXY( $originX , $originY )
	{
		if( !is_numeric($originX) || !is_numeric($originY) )
		{
			// throw
		}
		$this->setOriginXY( $originX , $originY );
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

