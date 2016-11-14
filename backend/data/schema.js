const typeDefinitions = `

type User {
  id: Int!
  email: String!
  firstName: String!
  lastName: String!
  phone: String
  role : Role
  location: Location
  services: [Service!]
  tickets: [ServiceTicket!]
  registered: Int! # this is stored/retrieved as a unix timestamp
}

type Location {
  latitude: Float!
  longitude: Float!
}

enum Role {
  Customer
  Technician
  Admin
}

enum ServiceState {
  Ongoing
  Completed
  Pending
  Canceled
}

type ServiceTicket {
  id: Int!
  provider: User!
  customer: User!
  service: Service!
  status: ServiceState
  note: String
  price: Float!
  createdAt: Int!
  completedAt: Int
}

type Service {
  id: Int!
  providers: [User!]
  cost: Float!
  name: String!
  description: String
}

type Query {
  service(id: Int, name: String): Service
  services(limit: Int = 10): [Service]
  user(id: Int, firstName: String): User
  users(limit: Int = 10): [User]
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
