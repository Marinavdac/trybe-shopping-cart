require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se a fetch API é chamada quando a função fetchProducts é chamada com o parâmetro "computador"', async () => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const data = await fetchProducts('computador');
    expect.assertions(1);
    expect(url).toHaveBeenCalledWith(data);
  });
  
});
