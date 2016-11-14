import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    user: (root, args) => {
      return { firstName: args.firstName }
    },
  }),
  User: () => ({
    firstName: () => casual.firstName,
    lastName: () => casual.lastName,
  }),
  Service: () => ({
    name: () => casual.title,
    description: () => casual.sententces(3),
  })
};

export default mocks;
