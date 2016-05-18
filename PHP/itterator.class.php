<?php

// ==================================================================
// START: incrementor family of Classes

/**
 * @class incrementor increments a value and returns FALSE until the
 *		  maximum is reached then resets the value to zero and
 *		  returns TRUE. if incrementor::doInc is false nothing is
 *		  incremented and incrementor::limitReached() will always
 *		  return FALSE;
 */
interface incrementorInterface
{


	/**
	 * @method incrementor constructor
	 * @param [int] incLimit when to reset the increment value
	 */
//	function __construct( $incLimit ):


	/**
	 * @method	limitReached() increments a value each time it's
	 *			called and checks that increment against a
	 *			maximum value.
	 *
	 * NOTE: if incrementor::doInc is FALSE, FALSE is always returned
	 *
	 * @return [bool] always FALSE
	 */
	public function limitReached();

}

// factroy class
class incrementor implements incrementorInterface
{
	/**
	 * @method  getInc() factory method for providing the correct
	 *			type of incrementor object
	 *
	 * @var [unsigned int] incLimit maximum times a value can be
	 *		incremented before it's reset
	 */
	static public function getInc($incLimit) {
		if( $incLimit < 0 ) {
			return new noInc($incLimit);
		} else {
			return new doInc($incLimit);
		}
	}


	public function limitReached()
	{
		return false;
	}
}
class noInc extends incrementor
{
//	protected:
	/**
	 * @method incrementor constructor
	 * @param [int] incLimit when to reset the increment value
	 */
//		noInc( $incLimit ) { }

//	public:
	/**
	 * @method	limitReached() increments a value each time it's
	 *			called and checks that increment against a
	 *			maximum value.
	 *
	 * NOTE: if incrementor::doInc is FALSE, FALSE is always returned
	 *
	 * @return [bool] always FALSE
	 */
//	public function limitReached()
//	{
//		return false;
//	}

};

class doInc extends incrementor
{

	/**
	 * @var inc the value incremented each time LimitReached is called
	 */
	private	$_inc = 0;

	/**
	 * @var max the maximum value inc can reach before it is reset
	 */
	private	$_max = 1;


	/**
	 * @method doInc constructor
	 * @param [int] incLimit when to reset the increment value
	 */
	protected function __construct( $incLimit )
	{
		if( !is_int($incLimit) )
		{
			// throw
		}
		$this->_max = $incLimit;
	}


	/**
	 * @method	limitReached() increments a value each time it's
	 *			called and checks that increment against a
	 *			maximum value.
	 *
	 * @return [bool] TRUE if the maximum number of increments was reached
	 *				  FALSE otherwise
	 */
	public function limitReached()
	{
			$output = false;

			if( $this->_inc == max ) {
				$output = true;
				$this->_inc = 0;
			} else {
				$this->_inc += 1;
			}

			return $output;
		}
};

//  END:  incrementor family of Classes
// ==================================================================