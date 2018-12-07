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
    const sum = this.sumValues();
    const mean = sum / this.values.length;

    return mean;
  }

  probabilities() {
    const qtty = this.sumValues();
    const probabilities = this.values.map(value => value / qtty);

    return probabilities;
  }

  expectedValue() {
    const expectedValue = this.calculateExpectedValueOf(this.values);

    return expectedValue;
  }

  variance() {
    const expectedValue = this.expectedValue();
    const valutesToThePowOfTwo = this.values.map((value) => Math.pow(value, 2) );
    const expectedValueOfValuesToThePowOfTwo = this.calculateExpectedValueOf(valutesToThePowOfTwo);
    const variance = expectedValueOfValuesToThePowOfTwo - Math.pow(expectedValue, 2);

    return variance;
  }

  standardDeviation() {
    const variance = this.variance();
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
  }

  private calculateExpectedValueOf(values) {
    const probabilities = this.probabilities();
    let expectedValue = 0;
    values.forEach((value, index) => {
      expectedValue = value * probabilities[index] + expectedValue;
    });

    return expectedValue;
  }

  private sumValues() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = this.values.reduce(reducer, 0);

    return sum;
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
