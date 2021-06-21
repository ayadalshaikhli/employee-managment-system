DROP DATABASE IF EXISTS employee_managmentDB;
CREATE database employee_managmentDB;

use employee_managmentDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(30) NOT NULL,
  salary decimal(10,2) NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int DEFAULT NULL,
  manager_id int DEFAULT NULL
); 



