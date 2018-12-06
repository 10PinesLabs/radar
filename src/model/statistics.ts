export class Statistics {
  axisValues: Object;
  values: number[];

  constructor(axisValues: Object) {
    this.assertValidAxisValues(axisValues);
    this.axisValues = axisValues;
    this.values = this.parseAxisValuesToArray(axisValues);
  }

  axisValuesObjToArray() {
    return this.values;
  }

  median() {
    const m = Math.floor(this.values.length / 2);
    const median = this.values[m];

    return median;
  }

  mean() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = this.values.reduce(reducer, 0);
    const mean = sum / this.values.length;

    return mean;
  }

  standardDeviation() {
    const mean = this.mean();
    const reducer = (accumulator, currentValue) => accumulator + Math.pow(currentValue - mean, 2);
    const sum = this.values.reduce(reducer, 0);
    const variance = sum / this.values.length;
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
  }

  private parseAxisValuesToArray(axisValues: Object) {
    const axisValuesArray = [];
    [1, 2, 3, 4, 5].forEach(field => axisValuesArray.push(axisValues[field]) );
    return axisValuesArray;
  }

  private assertValidAxisValues(axisValues: Object) {
    const areNonValidAxisValues = this.isEmptyObject(axisValues) ||
                                  this.isObject(axisValues) ||
                                  !this.areValidAxisValues(axisValues) ||
                                  this.areValuesLessThanZero(axisValues);

    if (areNonValidAxisValues) {
      throw new Error('Valores de arista invalidos');
    }
  }

  private isEmptyObject(axisValues: Object): boolean {
    return Object.keys(axisValues).length === 0;
  }

  private isObject(axisValues: Object): boolean {
    return axisValues.constructor !== Object;
  }

  private areValidAxisValues(axisValues: Object): boolean {
    return axisValues.hasOwnProperty('1') && axisValues.hasOwnProperty('2') && axisValues.hasOwnProperty('3')
      && axisValues.hasOwnProperty('4') && axisValues.hasOwnProperty('5');
  }

  private areValuesLessThanZero(axisValues) {
    return axisValues[1] < 0 || axisValues[2] < 0 || axisValues[3] < 0 || axisValues[4] < 0 || axisValues[5] < 0;
  }
}
