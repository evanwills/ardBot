function report (name, obj, loops) {
  'use strict'
  var a = 0
  var cumulative = 0
  console.log('\n\n\n\n\n\n\n\n\n\n\n==========================================\n\n\n\n\n\n\n\n')
  console.log(name + '.constructor.name = ', obj.constructor.name)
  console.log(name + ' = ', obj)
  console.log(obj.constructor.name + ' is instanceof IIncrementManager = ', obj instanceof IIncrementManager)
  console.log('obj.isCumulative: ', obj.isCumulative)
  console.log('obj.isInfinite: ', obj.isInfinite)
  console.log('obj.doesOscillate: ', obj.doesOscillate)
  console.log('obj.doesReset: ', obj.doesReset)

  if (loops === undefined) {
    loops = 25
  }
  for (a = 0; a < loops; a += 1) {
    try {
      obj.getStep()
    } catch (e) {
      console.log(e.message)
      return
    }

    try {
      obj.updateStep()
    } catch (e) {
      console.log(e.message)
      return
    }

    cumulative += obj.getStep()
    console.log(name + '.getStep() = ', obj.getStep())
    console.log('cumulative: ', cumulative)
  }
}

var fixedInc = new IncrementManager(2.5)
report('fixedInc', fixedInc)

//  END:  Simple
// ========================================================
// START: Cumulative

var fixedIncCumInfinite = new IncrementDecoratorCumulative(fixedInc)
report('IncrementDecoratorCumulative(IncrementManager(2.5))', fixedIncCumInfinite)

var min = new IncrementManager(0)
var max = new IncrementManager(10)
var fixedIncCumReset = new IncrementDecoratorReset(
  fixedInc,
  min,
  max
)
report('IncrementDecoratorReset(IncrementManager(2.5), 0, 10)', fixedIncCumReset)

//  END:  Cumulative
// ========================================================
// START: Reset

fixedInc = new IncrementManager(2.5)
var fixedIncCumResetPreset = new IncrementDecoratorReset(
  fixedInc,
  min,
  max,
  0.8
)

report('IncrementDecoratorReset(' + fixedInc.getStep() + ', ' + min.getStep() + ', ' + max.getStep() + ', 0.8)', fixedIncCumResetPreset)

//  END:  Reset
// ========================================================
// START: Oscillate

var fixedIncCumOscillate = new IncrementDecoratorOscillate(
  fixedInc,
  min,
  max
)

report('IncrementDecoratorOscillate(' + fixedInc.getStep() + ', ' + min.getStep() + ', ' + max.getStep() + ')', fixedIncCumOscillate)

var fixedIncCumOscillatePreset = new IncrementDecoratorOscillate(
  fixedInc,
  min,
  max,
  0.8
)

report('IncrementDecoratorOscillate(' + fixedInc.getStep() + ', ' + min.getStep() + ', ' + max.getStep() + ', 0.8)', fixedIncCumOscillatePreset)

//  END:  Oscillate
// ========================================================
// START: Decay

fixedInc = new IncrementManager(10)

var decayInc = new IncrementDecoratorDecay(fixedInc, 0.9908)

report('decayInc', decayInc)

var incCumIncDecay = new IncrementDecoratorCumulative(
  new IncrementDecoratorDecay(
    fixedInc,
    0.9908
  )
)

report('IncrementDecoratorCumulative(IncrementDecoratorDecay(' + fixedInc.getStep() + ', 0.9908))', incCumIncDecay)

//  END:  Decay
// ========================================================
// START: Decay multi

fixedInc = new IncrementManager(49)
var incDecayIncCum = new IncrementDecoratorDecay(
  new IncrementDecoratorCumulative(
    fixedInc
  ),
  0.9908
)

report('IncrementDecoratorDecay(IncrementDecoratorCumulative(' + fixedInc.getStep() + '), 0.9908)', incDecayIncCum)

max = new IncrementManager(360)

var incResetIncDecay = new IncrementDecoratorReset(
  new IncrementDecoratorDecay(
    fixedInc,
    0.9908
  ),
  min,
  max
)

report('IncrementDecoratorReset(IncrementDecoratorDecay(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + ')', incResetIncDecay)
var incDecayIncReset = new IncrementDecoratorDecay(
  new IncrementDecoratorReset(
    fixedInc,
    min,
    max
  ),
  0.9908
)

report('IncrementDecoratorDecay(IncrementDecoratorReset(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + ')', incDecayIncReset)

var incOscilIncDecay = new IncrementDecoratorOscillate(
  new IncrementDecoratorDecay(
    fixedInc,
    0.9908
  ),
  min,
  max
)

report('IncrementDecoratorOscillate(IncrementDecoratorDecay(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + ')', incOscilIncDecay)

var incDecayIncOscil = new IncrementDecoratorDecay(
  new IncrementDecoratorOscillate(
    fixedInc,
    min,
    max
  ),
  0.9908
)

report('IncrementDecoratorDecay(IncrementDecoratorOscillate(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + ')', incDecayIncOscil)

var incCumIncOscilIncDecay = new IncrementDecoratorCumulative(
  new IncrementDecoratorOscillate(
    new IncrementDecoratorDecay(
      fixedInc,
      0.9908
    ),
    min,
    max
  )
)

report('IncrementDecoratorCumulative(IncrementDecoratorOscillate(IncrementDecoratorDecay(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + '))', incCumIncOscilIncDecay)

var incCumIncDecayIncOscil = new IncrementDecoratorCumulative(
  new IncrementDecoratorDecay(
    new IncrementDecoratorOscillate(
      fixedInc,
      min,
      max
    ),
    0.9908
  )
)

report('IncrementDecoratorCumulative(IncrementDecoratorDecay(IncrementDecoratorOscillate(' + fixedInc.getStep() + ', 0.9908), ' + min.getStep() + ', ' + max.getStep() + '))', incCumIncDecayIncOscil)

//  END:  Decay multi
// ========================================================
