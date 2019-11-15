import camelCase from '@utils/helpers/camelCase';

describe('The camelCase helper function', () => {
  it('should covert a string to camel case', () => {
    expect(camelCase('Activo is cool')).toEqual('activoIsCool');
    expect(camelCase('Activo Is cool')).toEqual('activoIsCool');
    expect(camelCase('activo is Cool')).toEqual('activoIsCool');
  });
});
