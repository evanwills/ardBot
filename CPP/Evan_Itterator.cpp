

// ==================================================================
// START: incrementor family of Classes

/**
 * @class incrementor increments a value and returns FALSE until the
 *		  maximum is reached then resets the value to zero and
 *		  returns TRUE. if incrementor::doInc is false nothing is
 *		  incremented and incrementor::limitReached() will always
 *		  return FALSE;
 */
class incrementorInterface
{

	protected:
		/**
		 * @method incrementor constructor
		 * @param [int] incLimit when to reset the increment value
		 */
		incrementor( int incLimit ) { }

	public:
		/**
		 * @method	limitReached() increments a value each time it's
		 *			called and checks that increment against a
		 *			maximum value.
		 *
		 * NOTE: if incrementor::doInc is FALSE, FALSE is always returned
		 *
		 * @return [bool] always FALSE
		 */
		bool limitReached() {
			return false;
		}

};

// factroy class
class incrementor : incrementorInterface
{
	public:
		/**
		 * @method  getInc() factory method for providing the correct
		 *			type of incrementor object
		 *
		 * @var [unsigned int] incLimit maximum times a value can be
		 *		incremented before it's reset
		 */
		static incrementor getInc(unsigned int incLimit) {
			if( incLimit < 0 ) {
				return noInc(incLimit);
			} else {
				return doInc(incLimit);
			}
		}
}
class noInc : incrementorInterface
{
//	protected:
		/**
		 * @method incrementor constructor
		 * @param [int] incLimit when to reset the increment value
		 */
//		noInc( int incLimit ) { }

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
//		bool limitReached() {
//			return false;
//		}

};

class doInc : incrementorInterface
{
	private:
		/**
		 * @var inc the value incremented each time LimitReached is called
		 */
		unsigned int inc = 0;
		/**
		 * @var max the maximum value inc can reach before it is reset
		 */
		unsigned int max = 1;

	protected:
		/**
		 * @method doInc constructor
		 * @param [int] incLimit when to reset the increment value
		 */
		doInc( int incLimit ) : incrementor( incLimit ){
			max = incLimit;
		}

	public:
		/**
		 * @method	limitReached() increments a value each time it's
		 *			called and checks that increment against a
		 *			maximum value.
		 *
		 * @return [bool] TRUE if the maximum number of increments was reached
		 *				  FALSE otherwise
		 */
		bool limitReached() {
			bool output = false;

			if( inc == max ) {
				output = true;
				inc = 0;
			} else {
				inc += 1;
			}

			return output;
		}
};

//  END:  incrementor family of Classes
// ==================================================================