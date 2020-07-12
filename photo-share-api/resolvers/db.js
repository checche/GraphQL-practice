exports.users = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "gPlake", name: "Glen Plake" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" },
];

exports.photos = [
  {
    id: 1,
    name: "photo 1",
    description: "description 1",
    category: "ACTION",
    githubUser: "gPlake",
    created: "3-28-1977",
  },
  {
    id: 2,
    name: "photo 2",
    description: "description 2",
    category: "SELFIE",
    githubUser: "sSchmidt",
    created: "1-2-1985",
  },
  {
    id: 3,
    name: "photo 3",
    description: "description 3",
    category: "LANDSCAPE",
    githubUser: "sSchmidt",
    created: "2018-04-15T19:09:57.308Z",
  },
];

exports.tags = [
  { photoID: 1, userID: "gPlake" },
  { photoID: 2, userID: "sSchmidt" },
  { photoID: 2, userID: "mHattrup" },
  { photoID: 2, userID: "gPlake" },
];
