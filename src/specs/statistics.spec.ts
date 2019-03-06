import { Statistics } from '../model/statistics';

describe('Statistics', () => {
  let statistics: Statistics;

  it('new Statistics if the array is Empty ', () => {
    statistics = new Statistics([]);

    expect(statistics.mean()).toBe('No posee votos');
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

  function tryCreateNewStatisticsWithArrayWithInvalidNumbers() {
    const invalidNumbersArray = [-1, 6, 3];
    return new Statistics(invalidNumbersArray);
  }

});
