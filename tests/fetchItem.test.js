require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
   });
   test('Verifica se a fetch API é chamada quando a função fetchItem recebe como argumento o item "MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
   });
   test('Verifica se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const itemId = 'MLB1615760527';
    const url = `https://api.mercadolibre.com/items/${itemId}`;
    await fetchItem(itemId);
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith(url);
   });
    test('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async() => {
      expect.assertions(1);
      const data = await fetchItem('MLB1615760527');
      expect(data).toMatchObject(item);
    });
   test('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
     await fetchItem();
    } catch (error) {
     expect(error).toEqual(new Error('You must provide an url'))
    }
   });
  
});
