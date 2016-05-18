# ardBot (Anal-Retentive Doodle Bot)

ardBot is a robot/machine that draws patterns based on how two drawing arms connected at the "pen" end and connected to sparate rotating disks at the other

It is inspired by [Drawing Machine II](https://www.youtube.com/watch?v=BG9e06IWAxE) and [drawing machine maios 3](https://www.youtube.com/watch?v=rukYhTylK_M)

##Parameters:
*	drawing table rotation speed (negative = counter-clockwise)
*	drawing arms configuration:
	*	straight (symetrical/asymetrical)
	*	scissor:
		*	symetrical arms:
			*	symetrical pivot offset
			*	asymetrical pivot offset
		*	asymetrical arms
			*	symetrical pivot offset
			*	asymetrical pivot offset
		*	everything asymetrical [primary arm length|secondary arm lenght|pivot offset]
	*	T (single boom off connector attached to each wheel)
*	Wheels:
	*	base offset from drawing table
	*	wheel radius
	*	rotation speed (negative = counter-clockwise)
	*	distance form other wheel
	*	second wheel:
		*	wheel radius
		*	rotation speed (negative = counter-clockwise)

