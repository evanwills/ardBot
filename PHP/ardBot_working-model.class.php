<?php

class whirliDoodleModel {
	private $_width;
	private $_height;
	private $_booms;
	private $_firstCircle;
	private $_secondCircle;
	private $_tableRotator;
	private $_x;
	private $_y;

	public function __construct( $width , $height , boomInterface $booms , circleManager $firstCircle , circleManager $secondCircle , abstractCircleShape $tableRotator )
	{
		if( !is_numeric($width) || !is_numeric($height) )
		{
			// throw
		}
		$this->_width = $width;
		$this->_height = $height;
		$this->_booms = $booms;

		$firstCircle->depthOK(true);
		$this->_firstCircle = $firstCircle;

		$firstCircle->depthOK(true);
		$this->_secondCircle = $secondCircle;
		$this->_tableRotator = $tableRotator;
	}

	public function rotate()
	{
		$this->_firstX = 0;
		$this->_firstY = 0;
		$this->_secondX = 0;
		$this->_secondY = 0;

		$this->_firstCircle->rotate();
		$this->_secondCircle->rotate();
		$this->_booms->setEndPoint( $this->_firstCircle->getX() , $this->_firstCircle->getY() , $this->_secondCircle->getX() , $this->_secondCircle->getY() );
		$this->_tableRotator->rotate( $this->_booms->getX() , $this->_booms->getY() );

		$this->_x = $this->_tableRotator->getX();
		$this->_y = $this->_tableRotator->getY();
	}

	public function getX() {
		return $this->_x;
	}

	public function getY() {
		return $this->_y;
	}

}