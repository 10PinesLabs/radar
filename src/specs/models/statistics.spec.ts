import { Statistics } from '../../model/statistics';

describe('Statistics', () => {
  let statistics: Statistics;

  it('new Statistics throws error if the object is empty', () => {

    expect(tryCreateNewStatisticsWithEmptyObject).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('new Statistics  throws error if the parameter is not an object', () => {

    expect(tryCreateNewStatisticsWithNonObject).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('new Statistics throws error if the object does not contains all the right fields', () => {
    // required form { 1: number, 2: number, 3: number, 4: number, 5: number }

    expect(tryCreateNewStatisticsWithNonValidObject).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('new Statistics throws error if one of the values is less than zero', () => {

    expect(tryCreateNewStatisticsWithValueLessThanZero).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('axisValuesObjToArray with the right object returns the array with the values of each field', () => {
    const axisValues = {1: 1, 2: 1, 3: 1, 4: 1, 5: 1};
    const arrayValues = [1, 1, 1, 1, 1];
    statistics = new Statistics(axisValues);

    expect(statistics.axisValuesObjToArray()).toEqual(arrayValues);
  });

  it('The median value is the one in the field number 3 of the axisValues', () => {
    const axisValues = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    const median = 1;
    statistics = new Statistics(axisValues);

    expect(statistics.median()).toBe(median);
  });

  it('The mean value is the sum of all values divided by the length of them', () => {
    const axisValues = { 1: 5, 2: 3, 3: 1, 4: 9, 5: 3 };
    const mean = 4.2;
    statistics = new Statistics(axisValues);

    expect(statistics.mean()).toBe(mean);
  });

  it('Can get the probabilities of the axis values', () => {
    const axisValues = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
    const axisProbabilities = [ 1 / 15 , 2 / 15, 3 / 15, 4 / 15, 5 / 15 ];
    statistics = new Statistics(axisValues);

    const answerProbabilities = statistics.probabilities();
    answerProbabilities.forEach((probability, index) => expect(probability).toBeCloseTo(axisProbabilities[index]));
  });

  it('Can get the expectedValue of the axis values', () => {
    const axisValues = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
    const expectedValue = 11 / 3;
    statistics = new Statistics(axisValues);

    expect(statistics.expectedValue()).toBeCloseTo(expectedValue);
  });

  it('Can get the variance of the axis values', () => {
    const axisValues = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
    const variance = 14 / 9;
    statistics = new Statistics(axisValues);

    expect(statistics.variance()).toBeCloseTo(variance);
  });

  it('Can get the stardard deviation value of the axis values', () => {
    const axisValues = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
    const standardDeviation = Math.sqrt(14 / 9);
    statistics = new Statistics(axisValues);

    expect(statistics.standardDeviation()).toBe(standardDeviation);
  });

  function tryCreateNewStatisticsWithEmptyObject() {
    const emptyObj = {};
    return new Statistics(emptyObj);
  }

  function tryCreateNewStatisticsWithNonObject() {
    const nonObj = 3;
    return new Statistics(nonObj);
  }

  function tryCreateNewStatisticsWithNonValidObject() {
    const nonValidObj = { '10': 'pines' };
    return new Statistics(nonValidObj);
  }

  function tryCreateNewStatisticsWithValueLessThanZero() {
    const nonValidObj = { 1: -5, 2: 3, 3: 1, 4: 9, 5: 3 };
    return new Statistics(nonValidObj);
  }
});
