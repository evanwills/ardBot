#ifndef IncrementManager2_h
#define IncrementManager2_h


// ========================================================
// START: IncrementManager Interface






public interface IIncrementManager {

public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	virtual void updateStep();

	/// returns the current step value
	virtual double getStep() = 0;

	/// returns the number of steps the increment manager has done
	virtual int getStepCount() = 0;

	/// returns the current increment value
	virtual double getIncrement() = 0;

	/// returns the current cumulative value
	virtual double getCumulative() = 0;

	/// returns the previous step
	virtual double getLastStep() = 0;

	bool isCumulative();
	bool isInfinite();
	bool doesOscillate();

	virtual double getMin();
	virtual double getMax();

	/// checks whether the object's step, min & max are less than or greater
	/// than those passed in TRUE if the object's values are within the
	/// supplied min & max. FALSE otherwise
	virtual bool withinMinMax(double min, double max) = false;



protected:
	/// the current value of step.
	double _step = 0;
	unsigned int = 0;

	bool _isCumulative = false;
	bool _isInfinite = false;
	bool _doesOscillate = false;

	void _correctMinMax( double &min, double &max);

};





//  END:  IncrementManager Interface
// ========================================================
// START: IncrementDecorator Abstract





public class AIncrementDecorator : public IIncrementManager {
public:
	unsigned int getStepCount();

protected:
	// the incrementManager to be decorated. (could be another decorator)
	IIncrementManager incMgr;
	/// the value step was last loop.
	double _lastStep = 0;

};





//  END:  IncrementDecorator Abstract
// ========================================================
// START: IncrementManager





public class IncrementManager : public IIncrementManager {
public:
	IncrementManager(double step);
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// returns the number of steps the increment manager has done
	unsigned int getStepCount();

	/// returns the current increment value
	double getIncrement();

	/// returns the previous step
	double getLastStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();

	bool withinMinMax(double min, double max);

private:
	/// the current value of step.
	unsigned int _stepCount = 0;
};





//  END:  IncrementManager
// ========================================================
// START: IncrementDecoratorAccumulate





public class IncrementDecoratorAccumulate : public AIncrementDecorator {
public:
	IncrementDecoratorAccumulate( IIncrementManager incMan );
	IncrementDecoratorAccumulate( IIncrementManager incMan , double preset );
	void updateStep();
	double getStep();
	double getIncrement();
	double getLastStep();
	bool withinMinMax();
	double getMin();
	double getMax();

protected:
	/// the total value of all the steps so far
	double _cumulative = 0;

	bool _isCumulative = true;
	bool _isInfinite = true;

};





//  END:  IncrementDecoratorAccumulate
// --------------------------------------------------------
// START: IncrementDecoratorAccumulatorReset





public class IncrementDecoratorAccumulatorReset : public AIncrementDecorator {
public:
	IncrementDecoratorAccumulatorReset(IIncrementManager incMan, IIncrementManager min , IIncrementManager max);
	IncrementDecoratorAccumulatorReset(IIncrementManager IncMan, IIncrementManager min , IIncrementManager max, double preset);
	void updateStep();

	double getStep();
	double getIncrement();

	bool withinMinMax(double min, double max);

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();


protected:
	double _cumulative = 0;
	IIncrementManager _min = 0;
	IIncrementManager _max = 0;
	bool _isCumulative = true;
	void _setCorrectMinMax(double min, double max);
};





//  END:  IncrementDecoratorAccumulatorReset
// ========================================================
// START: IncrementDecoratorAccumulatorOscillate


public class IncrementDecoratorAccumulatorOscillate : public IncrementDecoratorAccumulatorReset {
public
	void updateStep();

	double getStep();
};


//  END:  IncrementDecoratorAccumulatorOscillate
// ========================================================
// START: IncrementDecoratorDecay

public class IncrementDecoratorDecay : public AIncrementDecorator {
public:
	IncrementDecoratorDecay(IIncrementManager incMan, double decayFactor);
	double updateStep();
	double getStep();

	bool withinMinMax(double min, double max);

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();
	double getIncrement();

private:
	double decayValue = 1;
};


//  END:  IncrementDecoratorDecay
// ========================================================
#endif