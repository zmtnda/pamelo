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
VALUES (4, "tech@11.com", "password", 1, "I am", "technician", 123456789, NOW());

INSERT INTO Users
(id, email, password, role, firstName, lastName, phone, whenRegistered)
VALUES (5, "tech2@11.com", "password", 1, "I am", "technician2", 123456789, NOW());

-- -----------------------------------------------------
-- Table services
-- -----------------------------------------------------
INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (1, "Home Wireless Support", 200.00, 0, NOW(),4);

INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (2, "Screen Replacement ", 70.00, 0, NOW(),4);

INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (3, "Battery Replacement ", 40.00, 0, NOW(),4);

INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (4, "Home Wireless Support", 180.00, 0, NOW(),5);

INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (5, "Screen Replacement ", 60.00, 0, NOW(),5);

INSERT INTO Services
(id,serviceName,amount, status,timestamp,technicianId)
VALUES (6, "Battery Replacement ", 30.00, 0, NOW(),5);

