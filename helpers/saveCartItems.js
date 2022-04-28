const saveCartItems = (cartItem) => {
  const locStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  locStorage.push(cartItem);  
  
  const saved = localStorage.setItem('cartItems', JSON.stringify(locStorage));
  
  return saved;
};

if (typeof module !== 'undefined') {
 module.exports = saveCartItems;
}
