# whirliDoodle

whirliDoodle is a robot/machine that draws patterns based on how two drawing arms connected at the "pen" end and connected to sparate rotating disks at the other end. It basically creates a physical representation of algorithmic art. The physical configuration of the wheels and arms in relation to each other and the drawing table combined with the speed and direction of the rotation form the parameters of the algorithm.

It is inspired by [Drawing Machine II](https://www.youtube.com/watch?v=BG9e06IWAxE) and [drawing machine maios 3](https://www.youtube.com/watch?v=rukYhTylK_M) (and others - see bottom for more links).

This project will contain both the driver code for the physical machine and the code for a virtual machine to make testing various configurations much faster.


## Parameters:
*	drawing space [x, y]
*	drawing table rotation speed (negative = counter-clockwise)
*	boom configuration (two arms):
	*	straight (symetrical/asymetrical)
	*	scissor:
		*	symetrical arms:
			*	symetrical pivot offset
			*	asymetrical pivot offset
		*	asymetrical arms
			*	symetrical pivot offset
			*	asymetrical pivot offset
		*	everything asymetrical [primary arm length|secondary arm lenght|pivot offset]
	*	T (single boom at right angles off connector attached to each wheel)
	*	Y (first long boom attached to wheel at base with pen on the other end. Second short boom connected to long boom at a point along the first boom's length and wheel at the other end.)
*	Wheels:
	*	base offset from drawing table
	*	wheel radius
	*	rotation speed (negative = counter-clockwise)
	*	distance form other wheel
	*	second wheel:
		*	wheel radius
		*	rotation speed (negative = counter-clockwise)

# Objects

There are Five basic object used to build the whirliDoodle:
1.	incrementManager
2.	circleShape (and - when I get the maths right an ellipse)
3.	circleManager that handles stacked circles and getting the top most radius point out
4.	boom which handles applying the movement of the circles to the pen
5.	whirliDoodleModel which brings everything together and makes it work.

incrementManager are used in all other objects as a way of getting dynamic change for various values without having to worry the client object about what's going on. They are also the only object that will be used in both the emulator and the physical whirliDoodle robot/machine.

## incrementManager
The incrementManager handles stuff like changing the rate of rotation or expanding/contracting the radius. They have multiple modes of operation.

There are three implementations of incrementManager:

1.	__fixed__: always gives out the same output value.
2.	__decay__: where the output value is multiplied by a decimal (normally between 0 & 1 but could be outside this range)
3.	__ease__: (_Not yet implemented_) output value oscillates between a minimum and maximum value
	*	as it moves from the mid-point to a limit, the steps get smaller and
	*	as it moves from the limit to the mid-point, the steps get larger.

### Cumulative
Each implementation has three additional _Cumulative_ modes:

1.	__infinite__: output accumulates infinitely
2.	__reset__: when output reaches maximum, it's reset to minimum
3.	__oscillate__: when output reaches limit, the step value is reversed so the output moves towards the opposite limit.


## circleInterface
Provides a common interface for different kinds of objects that basically rotate a point on a circle/elippse

## circleShape
_uses circleInterface_

It has two implementations:
*	__circle__ which (unsurprisingly) does calculations based on a circle shape
*	__ellipse__ (currently no idea how to manage this mathematically/programatically) the same as circle but based on ellipse shapes.

### in the emulator:
circleShape handles the fundimental trigonometry used by the emulator for rotating XY coordinates around a centre.

### for the arduino:
circleShape handles controlling the motors for rotation and radius.

## circleManager
_uses circleInterface_

circleManager handles making multiple circles work as a single object. circleShape objects are added to it in a stack then the radius point is rotated for every point circle in the stack. Because circleShape and circleManager both share circleInterface, they are interchangable. circleManager allows the emulator to increase complexity without burdening the rest of the code with that complexity.

## boom
Boom objects use the output from circleManager/circleShape objects to calculate the position of a "Pen" on the "drawing table". There are four implementations of boomInterface:

1.	__V__ or __straight__ boom where there are two booms one end of each boom is connected to a circleManager object and the other is connected to it's other boom
2.	__X__ or __scissor__ boom which has a scissor or x configuration with and additional pair of booms connected at one end to each other and at the other to the primary scissor booms.
3.	__T__ boom which has a short boom that connects both circleManagers to gether with a long boom extending at right angles from a point along the first boom to the "Pen"
4.	__Y__ boom which has one long boom that connects from a circleManager object to the "Pen" and a short boom that connects the other circleManager to a point somewhere along the length of the long boom

## whirliDoodleModel
The whirliDoodleModel is bascially an assebmly of two circleManager objects, a boom object (and optionally) a drawing table object (usually a circleShape object). It's output is the X/Y coordinates of the "Pen" on the drawing table.


## Videos that inspired whirliDoodle

* 	[Drawing Machine II](https://www.youtube.com/watch?v=BG9e06IWAxE)
* 	[drawing machine maios 3](https://www.youtube.com/watch?v=rukYhTylK_M)
* 	[drawing machine maios 9](https://www.youtube.com/watch?v=akI78l1gXkU)
* 	[Maios 7 2a](https://www.youtube.com/watch?v=nnPEJYOR9nM)
* 	[kunstmaschine maios 5 ](https://www.youtube.com/watch?v=W5mE010nZKA)
* 	[Meccano guilloch&eacute; drawing machine](https://www.youtube.com/watch?v=Csf-62DfY48)
* 	[drawing machine ](https://www.youtube.com/watch?v=2DjvtjgRdGA)
*	[Master Guillocheur &ndash; M&eacute;tiers D'Art &ndash;  Vacheron Constantin](https://www.youtube.com/watch?v=gbQgvNlVf2c) (not quite the same thing but interesting and pssibly useful idea for working with porcelain)
