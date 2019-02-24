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
    let mean = 0;
    if (this.axisValues.length !== 0) {
      const sum = this.sumValues();
      mean = parseFloat((sum / this.axisValues.length).toFixed(2));
    }

    return mean;
  }

  probabilities() {
    const probabilities = [1, 2, 3, 4, 5].map(value => this.quantityOfAparitions(value) / this.axisValues.length);

    return probabilities;
  }

  expectedValue() {
    const probabilities = this.probabilities();
    const valuesPerPosition = this.valuesPerPosition();

    let expectedValue = 0;
    valuesPerPosition.forEach((value, index) => {
      expectedValue = value * probabilities[index] + expectedValue;
    });

    return expectedValue.toFixed(2);
  }

  private quantityOfAparitions(value: number) {
    let quantity = 0;
    this.axisValues.forEach(axisValue => {
      if (value === axisValue) {
        quantity++;
      }
    });

    return quantity;
  }

  private valuesPerPosition() {
    const valuesPerPosition = [];
    [1, 2, 3, 4, 5].forEach(value => valuesPerPosition.push(this.quantityOfAparitions(value)));
    return valuesPerPosition;
  }

  private sumValues() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = this.axisValues.reduce(reducer, 0);

    return sum;
  }

  private assertValidAxisValues(axisValues) {
    const areNonValidAxisValues = this.isEmpty(axisValues) || this.valuesMoreThanFiveOrLessThanZero(axisValues);

    if (areNonValidAxisValues) {
      throw new Error('Valores de arista invalidos');
    }
  }

  private isEmpty(axisValues) {
    return axisValues.length === 0;
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
