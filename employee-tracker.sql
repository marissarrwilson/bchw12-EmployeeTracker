DROP DATABASE IF EXISTS Employee_TrackerDB;
CREATE database Employee_TrackerDB;

USE Employee_TrackerDB;

CREATE TABLE role (
    roleID INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    departmentID INT(10)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    departmentID INT(10)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INT(10),
    managerID INT(10) NULL
);
