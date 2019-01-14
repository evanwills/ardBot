
import { Coordinate, minMax } from './dataType.interfaces';
import { round } from './generic.pureFunctions';

export class SVGnodes {
  private oldCoordinate: Coordinate = {x: 0, y: 0};
  private xMin: number = 0;
  private xMax: number = 0;
  private yMin: number = 0;
  private yMax: number = 0;
  private xHasChanged: boolean = false;
  private yHasChanged: boolean = false;
  private firstQuadratic: boolean = false
  private allCoordinates: Coordinate[] = [];
  private decimalPlaces: number = 2;


  public getNextPathNode (newCoordinate: Coordinate, addToAll: boolean = true) : string {
    if (addToAll === true) {
      this.allCoordinates.push(newCoordinate);
    }

    if (this.oldCoordinate === null) {
      this.setMinMax(newCoordinate)
      return "M " + newCoordinate.x + ',' + newCoordinate.y + ' Q';
    } else {
      this.updateMinMax(newCoordinate);

      // Need to work out how to set up control points for quadratic
      // bezier nodes
      // See https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Curve_commands
      // for more info.
      let quadratic = '';
      if (this.firstQuadratic === false) {
        // somehow calculate quatratic control node
        quadratic += 'T';
        this.firstQuadratic = true;
      }
      const relativeCoordinate = {
        x: this.oldCoordinate.x - newCoordinate.x,
        y: this.oldCoordinate.y - newCoordinate.y
      }
      this.oldCoordinate = newCoordinate;
      return quadratic + ' ' + round(relativeCoordinate.x, this.decimalPlaces) + ',' + round(relativeCoordinate.y, this.decimalPlaces);
    }
  }

  public getNextPolylineNode (newCoordinate: Coordinate, addToAll: boolean = true) : string {
    if (addToAll === true) {
      this.allCoordinates.push(newCoordinate);
    }

    let sep = '';
    if (this.oldCoordinate === null) {
      this.setMinMax(newCoordinate)
    } else {
      this.updateMinMax(newCoordinate);
      sep = ' ';
    }

    return sep + round(newCoordinate.x, this.decimalPlaces) + ',' + round(newCoordinate.y, this.decimalPlaces);
  }

  public dimensionsHaveChanged() : boolean {
    return (this.xHasChanged === false || this.yHasChanged === false)
  }

  public getXMinMax() : minMax {
    this.xHasChanged = false;
    return {
      min: this.xMin,
      max: this.xMax
    }
  }

  public getYMinMax() : minMax {
    this.yHasChanged = false;
    return {
      min: this.yMin,
      max: this.yMax
    }
  }

  // ------------------------------------------------------
  // START: private methods

  private updateMinMax (coordinate: Coordinate) {
    if (coordinate.x > this.xMax) {
      this.xHasChanged = true;
      this.xMax = coordinate.x
    } else if (coordinate.x < this.xMin) {
      this.xHasChanged = true;
      this.xMin = coordinate.x
    }
    if (coordinate.y > this.yMax) {
      this.yHasChanged = true;
      this.yMax = coordinate.y
    } else if (coordinate.y < this.yMin) {
      this.yHasChanged = true;
      this.yMin = coordinate.y
    }
  }

  private setMinMax (coordinate: Coordinate) {
    this.xMin = coordinate.x;
    this.xMax = coordinate.x;
    this.yMin = coordinate.y;
    this.yMax = coordinate.y;
    this.oldCoordinate = coordinate;
  }

  private

  //  END:  private methods
  // ------------------------------------------------------
}
