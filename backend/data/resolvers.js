import { User, Service } from './connectors'
const resolvers = {
  Query: {
    user(_, args) {
      return User.find({ where: args });
    },
    users(_, args) {
      return User.findAll(args);
    },
    service(_, args) {
      return Service.find({ where: args });
    },
    services(_, args) {
      console.log(args);
      return Service.findAll(args);
    },
  },
  User: {
    services(user) {
      return user.getServices();
    },
  },
  Service: {
    providers(service) {
      return service.getUsers();
    },
  },
};

export default resolvers;
