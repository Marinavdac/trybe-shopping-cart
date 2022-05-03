const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
 test('Verifica se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;', async () => {
  saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 });
 test('Verifica se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', async () => {
  const saveCartList = saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem('cartItems', saveCartList)).toHaveBeenCalledTimes(1);
 });
});
