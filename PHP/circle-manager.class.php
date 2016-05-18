<?php

// ==================================================================
// How it should work:
//		1.
//		2.	for each child,
//		2.a.	get radiusPointX & radiusPointY
//		2.b.	rotate radiusPointX & radiusPointY around current
//				orginX & orginY
//		2.c.	send new radiusPointX & radiusPointY back to child
//		3.	repeat steps 1 - 3 for each child

// ==================================================================
// START: circleManager family

// circleManager class objects manage recursively rotating the
// radiusPointX & Y of each circle in the stack relative to the
// origin of the current circle.

// Not sure how this needs to be coded but... the _radiusPointX,
// _circle->_radiusPointX, _childCircle->_originX and
// _childCircle->_circle->_originX should all share the same pointer.
// The same goes for the _radiusPointY

abstract class circleManager extends abstractCircle
{
	protected $_circle;
	protected $_depth = 0;


	/**
	 * @method	depthOK() is used to varify that the stack of
	 *			circles is OK. By OK, I mean that the last circle is
	 *			a singleCircle object and that no multiCircle objects
	 *			were added after it.
	 *
	 * This method should be called after all the circleManager
	 * objects have been initialised.
	 *
	 * NOTE: Because of the way multiCircle is setup, it should
	 *		 be OK to use a stack even if the output of depthOK()
	 *		 is FALSE. If depthOK() is FALSE, just run fixDepth().
	 */
	abstract public function depthOK();

	/**
	 * @method	fixDepth() is used to varify that the stack of
	 *			circles is OK. If not, then fix the depth value
	 *
	 * This method should be called after all the circleManager
	 * objects have been initialised.
	 *
	 * NOTE: Because of the way multiCircle is setup, it should
	 *		 be OK to use a stack even if the output of depthOK()
	 *		 is FALSE.
	 */
	abstract public function fixDepth();

	/**
	 * @method	setChildCircle() adds another circleManager
	 *			object to the top of the stack
	 */
	abstract public function setChildCircle( circleManager $childCircle );

	/**
	 * @method	setRadiusPointXY() sets the radius point at a
	 *			given depth after the XY points have been rotated
	 *			by lower circleManager object
	 *
	 * @param [double] x the X coordinate of the radius point
	 * @param [double] y the Y coordinate of the radius point
	 * @param [unsigned in] depth how far from the top of the
	 *			stack the radius point should be set
	 */
	abstract public function setRadiusPointXY( $x , $y , $depth );

	/**
	 * @method	getCircleShape() returns the circleShape object
	 *			used at a given depth;
	 */
	abstract public function getCircleShape( $depth );

	/**
	 * @method getDepth() returns the level in the stack that the
	 *					circle is at
	 *					e.g. if there are 5 circles in the stack
	 *						 and this one was added fourth, it's
	 *						 depth would be 1
	 */
	abstract public function getDepth();
	/**
	 * @method	getRadiusPointX() returns the _radiusPointX
	 *			coordinate at a given depth
	 */
	abstract public function getRadiusPointX( $depth );

	/**
	 * @method	getRadiusPointY() like getRadiusPointX() but for
	 *			the Y value
	 */
	abstract public function getRadiusPointY( $depth );

}



class singleCircle extends circleManager
{

	public function __construct( abstractCircleShape $circle )
	{
		$this->_circle = $circle;
	}

	public function getDepth()
	{
		return $this->_depth;
	}

	public function depthOK()
	{
		return true;
	}

	public function fixDepth() { }

	public function setChildCircle( circleManager $childCircle )
	{
		// do nothing singleCirclePoint objects have no child
	}

	public function setRadiusPointXY( $x , $y , $depth )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		if( !is_int($depth) )
		{
			// throw
		}

		$this->_radiusPointX = $x;
		$this->_radiusPointY = $y;
	}

	public function setOriginXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$this->_OriginX = $x;
		$this->_OriginY = $y;
		$this->_circle->setOriginXY($x,$y);
	}

	public function initXY( $x , $y )
	{
		debug($x,$y);
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$this->setOriginXY( $x , $y );
		$this->_circle->initXY( $x , $y );
		$this->_radiusPointX = $this->_circle->getX();
		$this->_radiusPointY = $this->_circle->getY();
	}

	/**
	 * @method	rotate() rotates its own radius points
	 */
	public function rotate()
	{
		$this->_circle->setOriginXY( $this->_originX , $this->_originY );
		$this->_circle->rotateXY( $this->_radiusPointX , $this->_radiusPointY );
		$this->_radiusPointX = $this->_circle->getX();
		$this->_radiusPointY = $this->_circle->getY();
	}

	public function getAngleStep( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		return $this->_circle->getAngleStep($depth);
	}

	public function getRadiusPointX( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		return $this->_radiusPointX;
	}

	public function getRadiusPointY( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		return $this->_radiusPointY;
	}

	public function getCircleShape($depth)
	{
		return $this->circle;
	}
	public function rotateXY( $x , $y )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		$this->circle->rotateXY($x,$y);
		// need to do something here. Can't think what right now.
	}
}

class multiCircle extends singleCircle
{
	private $_childCircle = null;


	public function setChildCircle( circleManager $childCircle ) {
		$this->_depth += 1;
		if( $this->_childCircle ===  null ) {
			$this->_childCircle = $childCircle;
			$this->_childCircle->initXY( $this->_radiusPointX , $this->_radiusPointY );
		} else {
			$this->_childCircle->setChildCircle($childCircle);
		}
	}

	/**
	 * @method	rotate() rotates its own radius points as
	 *			well as those of all its children. It also sets
	 *			the _originX & _originY of its direct child
	 *			manager
	 */
	public function rotate() {
		$tmpDepth = $this->_depth;
		$radiusPointX = 0;
		$radiusPointY = 0;

		$this->_circle->setOriginXY( $this->_originX , $this->_originY );

		for( $tmpDepth ; $tmpDepth >= 0 ; $tmpDepth -= 1 )
		{

			$radiusPointX = $this->_childCircle->getRadiusPointX( $tmpDepth );
			$radiusPointY = $this->_childCircle->getRadiusPointY( $tmpDepth );

			$this->_circle->rotateXY( $radiusPointX , $radiusPointY );

			$this->_childCircle->setRadiusPointXY( $this->_circle->getX() , $this->_circle->getY() , $tmpDepth );
		}

		$this->_circle->rotate();

		$this->_radiusPointX = $this->_circle->getX();
		$this->_radiusPointY = $this->_circle->getY();

		$this->_childCircle->setOriginXY( $this->_radiusPointX , $this->_radiusPointY );
		$this->_childCircle->rotate();
	}


	/**
	 * @method	depthOK() checks whether the hierarchy of nested
	 *			circles is correct
	 */
	public function depthOK()
	{
		$output = false;
		if( $this->_childCircle === null )
		{
			if( $this->_depth === 0 )
			{
				$output = true;
			}
		}
		else
		{
			if( $this->_childCircle->getDepth() + 1 === $this->_depth )
			{
				$output = true;
			}
		}
		// this looks OK lets see whether the child is OK
		return $output;
	}

	/**
	 * @method	fixDepth() cmakes sure the hierarchy of nested
	 *			circles is correct
	 */
	public function fixDepth()
	{
		if( $this->_childCircle === null )
		{
			$this->_depth = 0;
		}
		else
		{
			$this->_childCircle->fixDepth();
			$this->_depth = $this->_childCircle->getDepth() + 1;
		}
	}

	public function setRadiusPointXY( $x , $y , $depth )
	{
		if( !is_numeric($x) || !is_numeric($y) )
		{
			// throw
		}
		if( !is_int($depth) )
		{
			// throw
		}
		$depth -= 1;
		if( $depth === $this->_depth )
		{
			$this->_radiusPointX = $x;
			$this->_radiusPointY = $y;
			// the radius point of this circle is the origin of the child
			$this->_childCircle->setOriginXY( $x , $y );
		}
		else
		{
			$this->_childCircle->setRadiusPointXY( $x , $y , $depth );
		}
	}

	public function getAngleStep( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		$depth -= 1;
		if( $depth == $this->_depth )
		{
			return $this->_circle->getAngleStep();
		}
		else
		{
			return $this->_childCircle->getAngleStep($depth);
		}
	}


	public function getRadiusPointX( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		$depth -= 1;
		if( $depth == $this->_depth || $this->_childCircle === null )
		{
			return $this->_radiusPointX;
		}
		else
		{
			return $this->_childCircle->getRadiusPointX( $depth );
		}
	}

	public function getRadiusPointY( $depth )
	{
		if( !is_int($depth) )
		{
			// throw
		}
		$depth -= 1;
		if( $depth == $this->_depth || $this->_childCircle === null )
		{
			return $this->_radiusPointY;
		}
		else
		{
			return $this->_childCircle->getRadiusPointY( $depth );
		}
	}


	public function getX() {
		if( $this->_childCircle === null )
		{
			return $this->_radiusPointX;
		}
		else
		{
			return $this->_childCircle->getX();
		}
	}

	public function getY() {
		if( $this->_childCircle === null )
		{
			return $this->_radiusPointY;
		}
		else
		{
			return $this->_childCircle->getY();
		}
	}
}

//  END: circleManager
// ==================================================================
