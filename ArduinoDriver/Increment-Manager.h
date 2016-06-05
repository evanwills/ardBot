#ifndef IncrementManager_h
#define IncrementManager_h


// ========================================================
// START: IncrementManager






class IncrementManager {

public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	virtual void updateStep();

	/// returns the current step value
	virtual double getStep();

	/// returns the current increment value
	virtual double getIncrement();

	/// returns the current cumulative value
	virtual double getCumulative();

	/// returns the previous step
	virtual double getLastStep();

	/// returns the minimum value the step/increment/cumulative can be
	virtual double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	virtual double getMax();

	/// presets the cumulative value
	virtual void presetCumulative( double preset );

	virtual bool isCumulative();
	virtual bool isInfinite();

	/// checks whether the object's step, min & max are less than or greater
	/// than those passed in TRUE if the object's values are within the
	/// supplied min & max. FALSE otherwise
	virtual bool withinMinMax(double min, double max);


protected:
	/// the value step was last loop.
	double _lastStep = 0;

	/// the value step is to change by every step
	double _increment = 0;

	bool _isCumulative = false;
	bool _isInfinite = false;

	void _correctMinMax( double min, double, max);
}







//  END:  IncrementManager
// ========================================================
// START: IncrementFixed






class IncrementFixed : public IncrementManager {
public:
	static IncrementFixed incrementFixedFactory( double step, unsigned int cumulativeMode = 0 , double min = 0 , double max = 0 );

	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// returns the current increment value
	double getIncrement();

	/// returns the current cumulative value
	double getCumulative();

	/// returns the previous step
	double getLastStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();

	/// presets the cumulative value
	void presetCumulative();

	/// checks whether the object's step, min & max are less than or greater
	/// than those passed in TRUE if the object's values are within the
	/// supplied min & max. FALSE otherwise
	bool withinMinMax(double min, double max);


protected:
	IncrementFixed( double step );

	void _correctMinMax( double min, double, max);
}


// --------------------------------------------------------


class IncFixedCumInfinite : IncrementFixed {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// presets the cumulative value
	void presetCumulative();

protected:
	IncFixedCumInfinite( double step );

	/// the total value of all the steps so far
	double _cumulative = 0;

	bool _isCumulative = true;
}


// --------------------------------------------------------


class IncFixedCumReset : IncrementFixed {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();


protected:
	IncFixedCumReset( double step , double min , double max );

	void _fixMinMax();

	/// the total value of all the steps so far
	double _min = 0;
	double _max = 0;
	bool _isInfinite = true;
}


// --------------------------------------------------------


class IncFixedCumOscillate : IncFixedCumReset {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();


protected:
	IncFixedCumOscillate( double step , double min , double max );

	/// the total value of all the steps so far
	double _cumulative = 0;
	bool _isInfinite = true;
}







//  END:  IncrementFixed
// ========================================================
// START: IncrementDecay






class IncrementDecay : public IncrementFixed {
public:
	static IncrementDecay incrementDecayFactory( double step, bool cumulative = false , double min = 0 , double max = 0 , bool oscillate = false);

	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// returns the current increment value
	double getIncrement();

	/// returns the current cumulative value
	double getCumulative();

	/// returns the previous step
	double getLastStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();

	/// presets the cumulative value
	void presetCumulative();

	/// checks whether the object's step, min & max are less than or greater
	/// than those passed in TRUE if the object's values are within the
	/// supplied min & max. FALSE otherwise
	bool withinMinMax(double min, double max);

protected:
	_decayFactor = 0;
	IncrementDecay( double step, double decayFactor );
}


// --------------------------------------------------------


class IncDecayCumInfinite : IncrementDecay {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// presets the cumulative value
	void presetCumulative();

protected:
	IncDecayCumInfinite( double step );

	/// the total value of all the steps so far
	double _cumulative = 0;

	bool _isCumulative = true;
}


// --------------------------------------------------------


class IncFixedCumReset : IncrementFixed {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();


protected:
	IncDecayCumReset( double step , double min , double max );

	void _genericInit()

	/// the total value of all the steps so far
	double _min = 0;
	double _max = 0;
	bool _isInfinite = true;
}


// --------------------------------------------------------


class IncDecayCumOscillate : IncDecayCumReset {
public:
	/// makes increment change (if it can)
	/// must be called once for every loop
	void updateStep();

	/// returns the current step value
	double getStep();

	/// returns the minimum value the step/increment/cumulative can be
	double getMin();

	/// returns the maximum value the step/increment/cumulative can be
	double getMax();

	/// presets the cumulative value
	void presetCumulative();


protected:
	IncDecayCumOscillate( double step );

	/// the total value of all the steps so far
	double _cumulative = 0;
	bool _isInfinite = true;
}







//  END:  IncrementDecay
// ========================================================
// START: IncrementEase






/*
class IncrementEase : public IncrementFixed {

}
*/






//  END:  IncrementEase
// ========================================================

#endif