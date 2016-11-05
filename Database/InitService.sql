-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
INSERT INTO Users
(id, email, password, role, firstName, lastName, phone, whenRegistered)
VALUES (2, "cust1@11.com", "password", 0, "I am", "customer1", 123456789, NOW());

INSERT INTO Users
(id, email, password, role, firstName, lastName, phone, whenRegistered)
VALUES (3, "cust2@11.com", "password", 0, "I am", "customer2", 123456789, NOW());

INSERT INTO Users
(id, email, password, role, firstName, lastName, phone, whenRegistered)
VALUES (4, "tech1@11.com", "password", 1, "I am", "technician1", 123456789, NOW());

INSERT INTO Users
(id, email, password, role, firstName, lastName, phone, whenRegistered)
VALUES (5, "tech2@11.com", "password", 1, "I am", "technician2", 123456789, NOW());
-- -----------------------------------------------------
-- Table services
-- -----------------------------------------------------
INSERT INTO Services
(id,serviceName)
VALUES (1, "Home Wireless Support");

INSERT INTO Services
(id,serviceName)
VALUES (2, "Smart phone screen Replacement");

INSERT INTO Services
(id,serviceName)
VALUES (3, "Laptop screen replacement");

INSERT INTO Services
(id,serviceName)
VALUES (4, "Business network setup");

INSERT INTO Services
(id,serviceName)
VALUES (5, "Keyboard replacement");

INSERT INTO Services
(id,serviceName)
VALUES (6, "Battery replacement");
-- -----------------------------------------------------
-- Table services offer
-- -----------------------------------------------------
INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (1, 1, 200.00, 0, NOW(),4);

INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (2, 2, 70.00, 0, NOW(),4);

INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (3, 3, 40.00, 0, NOW(),4);

INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (4, 1, 180.00, 0, NOW(),5);

INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (5, 2, 60.00, 0, NOW(),5);

INSERT INTO ServicesOffer
(id,serviceId,amount, status,timestamp,technicianId)
VALUES (6, 6, 30.00, 0, NOW(),5);

