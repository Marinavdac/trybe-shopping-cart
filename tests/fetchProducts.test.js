require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
 test('Verifica se fetchProducts é uma função', () => {
  expect(typeof fetchProducts).toBe('function');
 });
 test('Verifica se a fetch API é chamada quando a função fetchProducts é chamada com o parâmetro "computador"', async () => {
  expect.assertions(1);
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
 });
 test('Verifica se ao chamar a função fetchProducts com o parâmetro computador, o endpoint correto é chamado', async () => {
  const query = 'computador';
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  await fetchProducts(query);
  expect.assertions(1);
  expect(fetch).toHaveBeenCalledWith(url);
 });
  test('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async() => {
    expect.assertions(1);
    const data = await fetchProducts('computador');
    console.log('data', data);
    expect(data).toMatchObject(computadorSearch);
  });
  test('Verifica se o retorno da função fetchProducts com o argumento "camisa" é uma estrutura de dados distinta do objeto computadorSearch', async() => {
    expect.assertions(1);
    const data = await fetchProducts('camisa');
    expect(data).not.toEqual(computadorSearch);
 });
 test('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  try {
   await fetchProducts();
  } catch (error) {
   expect(error).toEqual(new Error('You must provide an url'))
  }
 });
});