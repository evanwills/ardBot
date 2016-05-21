# whirliDoodle

whirliDoodle is a robot/machine that draws patterns based on how two drawing arms connected at the "pen" end and connected to sparate rotating disks at the other end. It basically creates a physical representation of algorithmic art. The configuration the physical configuration of the wheels and arms in relation to each other and the drawing table combined with the speed and direction of the rotation for the parameters of the algorithm.

It is inspired by [Drawing Machine II](https://www.youtube.com/watch?v=BG9e06IWAxE) and [drawing machine maios 3](https://www.youtube.com/watch?v=rukYhTylK_M) (and others - see bottom for more links).

This project will contain both the driver code for the physical machine and the code for a virtual machine to make testing various configurations much faster.


##Parameters:
*	drawing space [x, y]
*	drawing table rotation speed (negative = counter-clockwise)
*	drawing arms configuration (two arms):
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


## Videos that inspired ardBot

* 	[Drawing Machine II](https://www.youtube.com/watch?v=BG9e06IWAxE)
* 	[drawing machine maios 3](https://www.youtube.com/watch?v=rukYhTylK_M)
* 	[drawing machine maios 9](https://www.youtube.com/watch?v=akI78l1gXkU)
* 	[Maios 7 2a](https://www.youtube.com/watch?v=nnPEJYOR9nM)
* 	[kunstmaschine maios 5 ](https://www.youtube.com/watch?v=W5mE010nZKA)
* 	[Meccano guilloch&eacute; drawing machine](https://www.youtube.com/watch?v=Csf-62DfY48)
* 	[drawing machine ](https://www.youtube.com/watch?v=2DjvtjgRdGA)
*	[Master Guillocheur &ndash; M&eacute;tiers D'Art &ndash;  Vacheron Constantin](https://www.youtube.com/watch?v=gbQgvNlVf2c) (not quite the same thing but interesting and pssibly useful idea for working with porcelain)