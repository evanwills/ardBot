

export class IncrementManager {
  protected step: number;

  public constructor(initialValue: number) {
    this.step = initialValue;
  }
  public getStep() { return this.step; }
  public getIncrementedStep() { return this.step; }
}

export class DecayIncrement extends IncrementManager {
  protected step: number;
  private decayFactor: number;
  
  public constructor(initialValue: number, decayFactor: number) {
    super(initialValue)
    if (decayFactor < 0.25 || decayFactor > 1.75) {
      throw Error('DecayIncrement constructor expects second parameter decayFactor to be a number between 0.25 and 1.75. ' + decayFactor + ' given.');
    }
    this.step = initialValue;
    this.decayFactor = decayFactor;
  }

  public getIncrementedStep() {
    this.step *= this.decayFactor;
    return this.step;
  }
}