const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith(getSavedCartItems())
  });
  test('Verifica se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    expect(localStorage.getItem('cartItems')).toHaveBeenCalledWith(getSavedCartItems());
  });
});
