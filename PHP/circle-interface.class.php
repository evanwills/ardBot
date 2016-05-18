<?php

// Generic interface for both circleShape and circleManager objects
interface circleInterface
{
	/**
	 * @method	initXY() puts the _radiusPointX &
	 *			_radiusPointY at their initial location
	 *
	 * @param x (12 O'clock) coordinate of the X radius point to
	 *			           be used as the starting point from which, the
	 *			           radius is rotated to the specified angle
	 *
	 * @param y (12 O'clock) coordinate of the Y radius point to
	 *			be used as the starting point from which, the
	 *			radius is rotated to the specified angle
	 */
	public function initXY( $x , $y );

	/**
	 * @method rotate() move the radiusPoint to a new location
	 */
	public function rotate();

	/**
	 * @method rotateXY() move the radiusPoint to a new location
	 */
	public function rotateXY( $x , $y );

	/**
	 * @method	setOriginXY() sets the _originX & _originY for
	 *			the circle object
	 */
	public function setOriginXY( $x , $y );

	/**
	 * @method	getX() returns the final _radiusPointX in the
	 *			stack (the one that will be used as the origin of
	 *			one drawing arm)
	 */
	public function getX();

	/**
	 * @method	getY() like getX() but for the Y value
	 */
	public function getY();

	/**
	 * @method	getOriginX() returns the _originX of this
	 *			circleManager object
	 */
	public function getOriginX();

	/**
	 * @method	getOriginY() returns the _originY of this
	 *			circleManager object
	 */
	public function getOriginY();
}

abstract class abstractCircle implements circleInterface {

	protected $_originX = 0;
	protected $_originY = 0;

	protected $_radiusPointX = 0;
	protected $_radiusPointY = 0;


	/**
	 * @method	setOriginXY() sets the _originX & _originY for
	 *			the circle object
	 */
	public function setOriginXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$this->_originX = $x;
		$this->_originY = $y;
	}

	/**
	 * @method	getX() returns the final _radiusPointX in the
	 *			stack (the one that will be used as the origin of
	 *			one drawing arm)
	 */
	public function getX()
	{
		return $this->_radiusPointX;
	}

	/**
	 * @method	getY() like getX() but for the Y value
	 */
	public function getY()
	{
		return $this->_radiusPointY;
	}

	/**
	 * @method	getOriginX() returns the _originX of this
	 *			circleManager object
	 */
	public function getOriginX()
	{
		return $this->_originX;
	}

	/**
	 * @method	getOriginY() returns the _originY of this
	 *			circleManager object
	 */
	public function getOriginY()
	{
		return $this->_originY;
	}
}