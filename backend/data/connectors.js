import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('pamelo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = db.define('users', {
  firstName: { type: Sequelize.STRING, allowNull: false, validate: { isAlpha: true } },
  lastName: { type: Sequelize.STRING, allowNull: false, validate: { isAlpha: true } },
  email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }},
  phone: { type: Sequelize.STRING, allowNull: true },
  role: { type: Sequelize.ENUM('Admin', 'Customer', 'Technician'), allowNull: false },
  location: { type: Sequelize.GEOMETRY, allowNull: true },
},{
  paranoid: true,
});

const ServiceTicket = db.define('tickets', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: { type: Sequelize.ENUM('Ongoing', 'Completed', 'Pending', 'Canceled'), allowNull: false },
  completedAt: { type: Sequelize.DATE, allowNull: true },
  price: { type: Sequelize.DECIMAL(19, 2), allowNull: false },
  note: { type: Sequelize.TEXT, allowNull: true },
});

const ServicePrice = db.define('prices', {
  price: { type: Sequelize.DECIMAL(19, 2), allowNull: false },
});

const Service = db.define('services', {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: true},
}, {
  paranoid: true,
});

User.belongsToMany(Service, { through: ServicePrice});
Service.belongsToMany(User, { through: ServicePrice});

User.belongsToMany(User, { as: 'Customer', through: ServiceTicket, foreignKey: 'technicianId', otherKey: 'customerId' });



// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    var point = {type: 'Point', coordinates: [casual.double, casual.double]};
    return User.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
      role: (casual.coin_flip ? (casual.coin_flip ? 'Customer' : 'Technician') : 'Admin'),
      email: casual.email,
      phone: casual.phone,
    });
  });
  _.times(10, () => {
      return Service.create({
        name: casual.title,
        description: casual.sentences(2),
      });
  });
});


export { Service, User };
