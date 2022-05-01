const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
   
  try {
    const results = await fetch(url);
    const data = await results.json();
  
    if (!query) {
      throw new Error('You must provide an url');
    }
    return data;
  } catch (error) {
    console.log(`Algo deu errado :( \n${error.message}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}