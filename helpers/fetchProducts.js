const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
   
  try {
    const result = await fetch(url);
    const data = await result.json();
    
    return data.results;
  } catch (error) {
    console.log(`Algo deu errado :( \n${error}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}