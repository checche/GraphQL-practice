const { photos } = require("./db");

module.exports = {
  totalPhotos: () => photos.length,
  allPhotos: () => photos,
};
