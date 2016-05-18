<?php
// ==================================================================
// START: stepper

interface stepperInterface
{
	public function updateStep();
	public function getStep();
	public function getCumulativeStep();
	public function getLastStep();
//	public function preLoop($loops);
	public function getMin();
	public function getMax();
	public function setCumlativeMinMax( $min , $max );
	public function withinMinMax( $min , $max );
}


abstract class stepper implements stepperInterface
{
	protected $_step;
	protected $_min;
	protected $_max;
	protected $_lastStep;
	protected $_stepCumulative;
	protected $_cumulativeMin;
	protected $_cumulativeMax;
	protected $_doCumulative = false;
	protected $_doCumulativeMinMax = false;
	abstract protected function _updateStep();
	abstract protected function _updateStepAcumulate();
	abstract protected function _updateStepAcumulateResetAtMax();

	public function updateStep()
	{
		if( $this->_doCumulative == true ) {
			if( $this->_doCumulativeMinMax == true ) {
				return $this->_updateStepAcumulateResetAtMax();
			} else {
				return $this->_updateStepAcumulate();
			}
		} else {
			return $this->_updateStep();
		}
	}

	public function getStep()
	{
		if( $this->_doCumulative == false ) {
			return $this->_step;
		} else {
			return $this->_stepCumulative;
		}
	}

	public function getCumulativeStep()
	{
		return $this->_stepCumulative;
	}

	public function getLastStep()
	{
		return $this->_lastStep;
	}
//	public function preLoop($loops);

	public function getMin()
	{
		return $this->_min;
	}

	public function getMax()
	{
		return $this->_max;
	}

	public function setCumlativeMinMax( $min , $max )
	{
		if( !is_numeric($min) || !is_numeric($max) )
		{
			// throw
		}
		$this->_doCumulative = true;
		if( $min < $max ) {
			$this->_cumulativeMin = $min;
			$this->_cumulativeMax = $max;
			$this->_doCumulativeMinMax = true;
		}
	}

	public function withinMinMax( $min , $max )
	{
		if( !is_numeric($min) || !is_numeric($max) )
		{
			// throw
		}
		$tmp;
		if( $min > $max ) {
			$tmp = $min;
			$min = $max;
			$max = $tmp;
		}

		if( $this->_step > $max || $this->_step < $min || $this->_min < $min || $this->_max >= $max || $this->_max <= $min ) {
			return false;
		}
		return true;
	}
}

class stepperFixed extends stepper
{
	protected function _updateStep()
	{
		// do nothing
		return $this->_step;
	}

	protected function _updateStepAcumulate()
	{
		$this->_stepCumulative += $this->_step;
		return $this->_stepCumulative;
	}

	protected function  _updateStepAcumulateResetAtMax()
	{
		$this->_stepCumulative += $this->_step;
		if( $this->_stepCumulative >= $this->_CumulativeMax ) {
			$this->_stepCumulative = $this->_cumulativeMin + ( $this->_stepCumulative - $this->_cumulativeMax );
		}
		return $this->_stepCumulative;
	}

	public function __construct( $step )
	{
		if( !is_numeric($step) )
		{
			// throw
		}
		$this->_step = $step;
		$this->_min = $step;
		$this->_max = $step;
	}
}

class stepperLinier extends stepper
{
	protected $_increment;


	public function __construct( $step , $increment , $min , $max ) {
		if( $min > $max ) {
			$this->_min = $max;
			$this->_max = $min;
		} else {
			$this->_max = $max;
			$this->_min = $min;
		}
		$this->_step = $step;
		$this->_increment = $increment;
		$this->getStep();
	}

	protected function _doMinMax($input) {
		if( $input > $this->_max ) {
			// bounce _step off max
			$this->_step = $this->_max - ( $input - $this->_max );
			$this->_increment = -$this->_increment;
		} else if( $input < $this->_min ) {
			// bounce _step off min
			$this->_step = $this->_min + ( $this->_min - $input );
			$this->_increment = -$this->_increment;
		}
	}

	protected function _updateStep() {
		$this->_lastStep = $this->_step;
		$this->_step += $this->_increment;
		return $this->_doMinMax( $this->_step );
	}

	protected function _updateStepAcumulate() {
		$this->_lastStep = $this->_step;
		$this->_step += $this->_increment;
		$this->_stepCumulative += $this->_step;

		return $this->_doMinMax( $this->_stepCumulative );
	}

	protected function _updateStepAcumulateResetAtMax() {
		$this->_stepCumulative += $this->_step;
		if( $this->_stepCumulative > $this->_CumulativeMax ) {
			$this->_stepCumulative = $this->_cumulativeMin + ( $this->_stepCumulative - $this->_cumulativeMax );
		}
		return $this->_stepCumulative;
	}

//	public function preLoop($loops)
//	{
//		$step = _step;
//		if( loops < 0 ) {
//			step = -step;
//		}
//
//		for( loops ; loops >= 0 ; loops -= 1 ) {
//			getStep();
//		}
//	}
}

//class stepperCircular extends stepper {
//}

//class stepperEliptic extends stepper {
//}

//  END:  stepper
// ==================================================================
