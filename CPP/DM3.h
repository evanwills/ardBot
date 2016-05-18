// https://www.arduino.cc/en/Reference/APIStyleGuide
// https://www.arduino.cc/en/Reference/StyleGuide
// https://www.arduino.cc/en/Hacking/LibraryTutorial

#ifndef MD3_h
#define MD3_h

class boomInterface
{
	public:
		virtual void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY );

		virtual double getX();

		virtual double getY();
}


class boomAbstract : boomInterface {
	protected:
		stepper * _firstBoom;
		stepper * _secondBoom;
		double _endX = 0;
		double _endY = 0;

	public:
		double getX() {
			return _endX;
		}

		double getY() {
			return _endY;
		}
}


#endif