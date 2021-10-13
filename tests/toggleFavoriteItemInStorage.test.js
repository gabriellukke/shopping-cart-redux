const { toggleFavoriteItemInStorage } = require('../helpers/toggleFavoriteInStorage');

describe('toggleFavoriteItemInStorage', () => {
  it('should toggle favorite item in storage', () => {  

    // const localSaved = localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));

    
    const newItem = toggleFavoriteItemInStorage('1234567');
    const getLocal = JSON.parse(localStorage.getItem('favoriteItems'));

    expect(getLocal[0]).toEqual('1234567');
  });
});
