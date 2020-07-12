const { photos } = require("./db");

let id = photos.length;

module.exports = {
  postPhoto(parent, args) {
    const newPhoto = {
      id: (id += 1),
      ...args.input,
      created: new Date(),
    };

    photos.push(newPhoto);
    return newPhoto;
  },
};
