export class Statistics {
  axisValues: number[];

  constructor(axisValues) {
    this.assertValidAxisValues(axisValues);
    this.axisValues = axisValues;
  }

  axisValuesObjToArray() {
    const values = [0, 0, 0, 0, 0];
    this.axisValues.forEach(value => values[value - 1]++ );
    return values;
  }

  mean() {
    let mean; // No le asigno un valor porque toFixed() devuelve un string
    if (this.axisValues.length !== 0) {
      const sum = this.sumValues();
      mean = (sum / this.axisValues.length).toFixed(2);
    } else {
      mean = 0;
    }

    return mean;
  }

  probabilities() {
    const qtty = this.sumValues();
    const probabilities = this.axisValues.map(value => value / qtty);

    return probabilities;
  }

  expectedValue() {
    const expectedValue = this.calculateExpectedValueOf(this.axisValues);

    return expectedValue;
  }

  private calculateExpectedValueOf(values) {
    const probabilities = this.probabilities();
    let expectedValue = 0;
    values.forEach((value, index) => {
      expectedValue = value * probabilities[index] + expectedValue;
    });

    return expectedValue.toFixed(2);
  }

  private sumValues() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = this.axisValues.reduce(reducer, 0);

    return sum;
  }

  private assertValidAxisValues(axisValues) {
    const areNonValidAxisValues = this.valuesMoreThanFiveOrLessThanZero(axisValues);

    if (areNonValidAxisValues) {
      throw new Error('Valores de arista invalidos');
    }
  }

  private valuesMoreThanFiveOrLessThanZero(axisValues) {
    let lessThanZero = false;

    axisValues.forEach(value => {
      if (0 > value || value > 5) {
        lessThanZero = true;
      }
    });
    return lessThanZero;
  }
}
