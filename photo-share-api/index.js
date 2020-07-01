const { ApolloServer } = require('apollo-server');

const typeDefs = `
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
  }

  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }

`;

let id = 0;

const users = [
  { githubLogin: 'mHattrup', name: 'Mike Hattrup' },
  { githubLogin: 'gPlake', name: 'Glen Plake' },
  { githubLogin: 'sSchmidt', name: 'Scot Schmidt' },
];

const photos = [
  {
    id: 1,
    name: 'photo 1',
    description: 'description 1',
    category: 'ACTION',
    githubUser: 'gPlake',
  },
  {
    id: 2,
    name: 'photo 2',
    description: 'description 2',
    category: 'SELFIE',
    githubUser: 'sSchmidt',
  },
  {
    id: 3,
    name: 'photo 3',
    description: 'description 3',
    category: 'LANDSCAPE',
    githubUser: 'sSchmidt',
  },
];

const tags = [
  { photoID: 1, userID: 'gPlake' },
  { photoID: 2, userID: 'sSchmidt' },
  { photoID: 2, userID: 'mHattrup' },
  { photoID: 2, userID: 'gPlake' },
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: id += 1,
        ...args.input,
      };

      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: (parent) => users.find((user) => user.githubLogin === parent.githubUser),
    taggedUsers: (parent) => tags
      .filter((tag) => tag.photoID === parent.id)
      .map((tag) => tag.userID)
      .map((userID) => users.find((u) => u.githubLogin === userID)),
  },
  User: {
    postedPhotos: (parent) => photos.filter((photo) => photo.githubUser === parent.githubLogin),
    inPhotos: (parent) => tags
      .filter((tag) => tag.userID === parent.id)
      .map((tag) => tag.photoID)
      .map((photoID) => photos.find((p) => p.id === photoID)),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphWL Service running on ${url}`));
