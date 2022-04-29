const getSavedCartItems = () => {
  const savedItems = JSON.parse(localStorage.getItem('cartItems'));
  return savedItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
