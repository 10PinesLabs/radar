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
    if (this.hasVotes()) {
      let mean = 0;
      if (this.axisValues.length !== 0) {
        const sum = this.sumValues();
        mean = parseFloat((sum / this.axisValues.length).toFixed(2));
      }
      return mean;
    } else {
      return 'No posee votos';
    }
  }

  private hasVotes() {
    return this.axisValues.length > 0;
  }

  private sumValues() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = this.axisValues.reduce(reducer, 0);

    return sum;
  }

  private assertValidAxisValues(axisValues) {
    if (this.valuesMoreThanFiveOrLessThanZero(axisValues)) {
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
