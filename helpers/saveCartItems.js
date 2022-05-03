const saveCartItems = (id) => {
  const locStorage = JSON.parse(localStorage.getItem('cartItems')) || [];

  locStorage.push(id);
  
  const saved = localStorage.setItem('cartItems', JSON.stringify(locStorage));

  return saved;
};

if (typeof module !== 'undefined') {
 module.exports = saveCartItems;
}
