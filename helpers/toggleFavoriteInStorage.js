const toggleFavoriteItemInStorage = (id) => {
  let updatedFavorites = [];

  const favoritesInStorage = JSON.parse(localStorage.getItem('favoriteItems')) || [];

  if (favoritesInStorage.includes(id)) {
    updatedFavorites = favoritesInStorage.filter((product) => product !== id);
  } else {
    updatedFavorites = [...favoritesInStorage, id];
  }

  localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
};

if (typeof module !== 'undefined') {
  module.exports = {
    toggleFavoriteItemInStorage,
  };
}
