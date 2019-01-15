import { minMax } from './dataType.interfaces';




// ========================================================
// START: IncrementManager Interface




abstract class IIncrementManager {

	protected _step : number = 0;
  protected _int : number = 0;

	protected _isCumulative: boolean = false;
	protected _isInfinite: boolean = false;
	protected _doesOscillate: boolean = false;

	/// makes increment change (if it can)
	/// must be called once for every loop
	public abstract updateStep() : number;

	/// returns the current step value
	public abstract getStep() : number;

	/// returns the number of steps the increment manager has done
	public abstract getStepCount() : number;

	/// returns the current increment value
	public abstract getIncrement() : number;

	/// returns the current cumulative value
	public abstract getCumulative() : number;

	/// returns the previous step
	public abstract getLastStep() : number;

	public isCumulative() : boolean { return this._isCumulative; }
	public isInfinite() : boolean { return this._isInfinite; }
	public doesOscillate() : boolean { return this._doesOscillate; }

	public abstract getMin() : number;
	public abstract getMax() : number;

	/// checks whether the object's step, min & max are less than or greater
	/// than those passed in TRUE if the object's values are within the
	/// supplied min & max. FALSE otherwise
  public abstract withinMinMax(min: number, max: number) : boolean;

	protected _correctMinMax( min: number, max: number) : minMax {
    if( min > max ) {
      return {
        min: max,
        max: min
      }
  	} else {
      return {
        min: min,
        max: max
      }
    }
  }
}




//  END:  IncrementManager Interface
// ========================================================
// START: IncrementDecorator Abstract




abstract class AIncrementDecorator extends IIncrementManager {
  // the incrementManager to be decorated. (could be another decorator)
  protected _incMgr: IIncrementManager
  // the value step was last loop.
  protected _lastStep: number = 0;

  public getStepCount() : number {
    return this._incMgr.getStepCount();
  }

}




//  END:  IncrementDecorator Abstract
// ========================================================
// START: IncrementManager




export class IncrementManager extends IIncrementManager {
  protected _stepCount : number = 0;

  public constructor(initialValue: number) {
    super();
    this._step = initialValue;
  }
	// makes increment change (if it can)
	// must be called once for every loop
	public updateStep() {
    this._stepCount += 1;
    return this._step;
  }

  public getStep() : number { return this._step; }
  public getStepCount() : number { return this._stepCount }
  public getIncrementedStep() : number { return this._step; }

	// returns the current increment value
  public getIncrement() : number { return this._step; }

	// returns the current cumulative value
	public getCumulative() : number { return this._step; }

	// returns the previous step
	public getLastStep() : number { return this._step; }

	// returns the minimum value the step/increment/cumulative can be
	public getMin() : number { return this._step; }

	// returns the maximum value the step/increment/cumulative can be
	public getMax() : number { return this._step; }

	public withinMinMax(min: number, max: number): boolean {
    const minMax = this._correctMinMax(min,max);

    if (this._step >= minMax.min && this._step <= minMax.max) {
      return true;
    } else {
      return false;
    }
  }
}




//  END:  IncrementManager
// ========================================================
// START: IncrementDecoratorAccumulate




export class IncrementDecoratorAccumulate extends AIncrementDecorator {
  // the total value of all the steps so far
  protected _cumulative : number = 0;

  protected _isCumulative : boolean = true;
  protected _isInfinite : boolean = true;

	public constructor ( incMan : IIncrementManager , preset : number = 0) {
    super();
    this._incMgr = incMan
    this._cumulative = preset;
  }

	public updateStep() : number {
    this._lastStep = this._cumulative;
    this._cumulative += this._incMgr.updateStep();
    return this._cumulative;
  }

  public getStep() : number { return this._cumulative; }

  public getIncrement() : number { return this._incMgr.getStep(); }


	// returns the current cumulative value
	public getCumulative() : number { return this._cumulative; }

  public getLastStep() : number { return this._lastStep; }

  public withinMinMax(min: number, max: number) : boolean { return true; }

  public getMin() : number {
    // this requires much more thought (and might be impossible to work out)
    return this._cumulative;
  }

  public getMax() : number {
    // this requires much more thought (and might be impossible to work out)
    return this._cumulative;
  }
}




//  END:  IncrementDecoratorAccumulate
// --------------------------------------------------------
// START: IncrementDecoratorAccumulatorReset



class IncrementDecoratorAccumulatorReset extends AIncrementDecorator {

	protected _cumulative :number  = 0;
	protected _min:IIncrementManager;
	protected _max:IIncrementManager;

	public constructor ( incMan : IIncrementManager , preset : number = 0) {
    super();
    this._incMgr = incMan
    this._cumulative = preset;
  }


	public updateStep() : number {
    this._lastStep = this._cumulative;
    this._cumulative += this._incMgr.updateStep();
    return this._cumulative;
  }

  public getStep() : number { return this._cumulative; }

  public getIncrement() : number { return this._incMgr.getStep(); }


	// returns the current cumulative value
	public getCumulative() : number { return this._cumulative; }

  public getLastStep() : number { return this._lastStep; }

  public withinMinMax(min: number, max: number) : boolean {
    const minMax = this._correctMinMax(min, max);
    if(this._min.getMin() >= minMax.min && this._max.getMax() <= minMax.max) {
      return true;
    } else {
      return false;
    }
  }

  public getMin() : number {
    // this requires much more thought (and might be impossible to work out)
    return this._min.getStep();
  }

  public getMax() : number {
    // this requires much more thought (and might be impossible to work out)
    return this._max.getStep();
  }

  // protected _setCorrectMinMax(min: number, max: number)
}




//  END:  IncrementDecoratorAccumulatorReset
// ========================================================
// START: IncrementDecoratorAccumulatorOscillate




class IncrementDecoratorAccumulatorOscillate extends IncrementDecoratorAccumulatorReset {
	public updateStep() : number {
    this._cumulative += this._incMgr.updateStep();
    let min = this._min.updateStep();
    let max = this._max.updateStep();

    this._lastStep = this._cumulative;

    if (this._cumulative > max) {
      this._cumulative = min + (this._cumulative - max);
    } else if( this._cumulative < min ) {
      this._cumulative = max - (min - this._cumulative);
    }
    return this._cumulative;
  }

  public getStep() : number { return this._cumulative; }

  public getIncrement() : number { return this._step - this._lastStep; }
}




//  END:  IncrementDecoratorAccumulatorOscillate
// ========================================================
// START: IncrementDecoratorDecay




class IncrementDecoratorDecay extends AIncrementDecorator {
  private _decayValue : number = 0;
  private _decayFactor : number = 1;

	public constructor (incMan : IIncrementManager , decayFactor : number = 1) {
    super();
    this._incMgr = incMan;
    this._decayFactor = decayFactor;
    this._lastStep = incMan.getStep();
    this._step = incMan.getStep();
  }

  public updateStep() : number {
    this._lastStep = this._step;
    this._incMgr.updateStep();
    this._decayValue *= this._decayFactor;
    this._step *= this._decayValue;
    return this._step;
  }

  public getStep() : number { return this._step; }

  public withinMinMax(min: number, max: number) : boolean {
    const minMax = this._correctMinMax(min,max);
    if( this._decayFactor <= 1 && this._decayFactor >= 0 && this._incMgr.getStep() <= minMax.max && this._incMgr.getStep() >= minMax.min && minMax.min <= 0 ) {
      return true;
    } else {
      return false;
    }
  }

  /// returns the minimum value the step/increment/cumulative can be
  public getMin() : number {
    const tmp : number = this._incMgr.getStep();
    if( this._decayFactor <= 1 && this._decayFactor >= 0 ) {
      if(tmp > 0) {
        return 0;
      } else {
        return tmp;
      }
    } else if(this._decayFactor >= -1 && this._decayFactor <= 0) {
      return -tmp;
    } else if(this._decayFactor > 1) {
      return tmp;
    } else {
      // _decayFactor must be less than -1
      // throw // not sure what to do here
    }
  }

  /// returns the maximum value the step/increment/cumulative can be
  public getMax() : number {
    const tmp :number = this._incMgr.getStep();
    if (this._decayFactor <= 1 && this._decayFactor >= 0) {
      if (tmp > 0) {
        return tmp;
      } else {
        return 0;
      }
    } else if (this._decayFactor >= -1 && this._decayFactor <= 0) {
      return tmp;
    } else if(this._decayFactor > 1) {
      if (tmp < 0) {
        return tmp;
      } else {
        // throw // not sure what to do here
      }
    } else {
      // _decayFactor must be less than -1
      // throw // not sure what to do here
    }
  }
  public getIncrement() : number {
    return this._step - this._lastStep;
  }
	// returns the current cumulative value
	public getCumulative() : number { return this._step; }

  public getLastStep() : number { return this._lastStep; }
}




//  END:  IncrementDecoratorDecay
// ========================================================
