import { Statistics } from '../model/statistics';

describe('Statistics', () => {
  let statistics: Statistics;

  it('new Statistics throws error if the array is empty', () => {
    expect(tryCreateNewStatisticsWithEmptyArray).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('new Statistics throws error if the array does not contains numbers between 1 to 5', () => {
    expect(tryCreateNewStatisticsWithArrayWithInvalidNumbers).toThrowError(Error, 'Valores de arista invalidos');
  });

  it('axisValuesObjToArray with the right object returns the array with the values of each field', () => {
    const axisValues = [1, 2, 3, 4, 5];
    const arrayValues = [1, 1, 1, 1, 1];
    statistics = new Statistics(axisValues);

    expect(statistics.axisValuesObjToArray()).toEqual(arrayValues);
  });

  it('The mean value is the sum of all values divided by the length of them', () => {
    const axisValues = [1, 1, 1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5];
    const mean = 3.15;
    statistics = new Statistics(axisValues);

    expect(statistics.mean()).toBe(mean);
  });

  it('Can get the probabilities of the axis values', () => {
    const axisValues = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    const axisProbabilities = [ 1 / 15 , 2 / 15, 3 / 15, 4 / 15, 5 / 15 ];
    statistics = new Statistics(axisValues);

    const answerProbabilities = statistics.probabilities();
    answerProbabilities.forEach((probability, index) => expect(probability).toBeCloseTo(axisProbabilities[index]));
  });

  it('Can get the expectedValue of the axis values', () => {
    const axisValues = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    const expectedValue = 11 / 3;
    statistics = new Statistics(axisValues);

    expect(statistics.expectedValue()).toBeCloseTo(expectedValue);
  });

  function tryCreateNewStatisticsWithEmptyArray() {
    const emptyArray = [];
    return new Statistics(emptyArray);
  }

  function tryCreateNewStatisticsWithNonObject() {
    const nonObj = 3;
    return new Statistics(nonObj);
  }

  function tryCreateNewStatisticsWithArrayWithInvalidNumbers() {
    const invalidNumbersArray = [-1, 6, 3];
    return new Statistics(invalidNumbersArray);
  }

  function tryCreateNewStatisticsWithValueLessThanZero() {
    const nonValidObj = { 1: -5, 2: 3, 3: 1, 4: 9, 5: 3 };
    return new Statistics(nonValidObj);
  }
});
