INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 2),
("Mike", "Chan", 2, 3),
("Ashley", "Rodriguez", 3, 4),
("Kevin", "Tupik", 4, 5),
("Malia", "Brown", 5, 6),
("Sarah", "Lourd", 6, 7),
("Tom", "Allen", 7, 5);
INSERT INTO roles (title, salary, department_id)
VALUES
("Sales", 100000, 1),
("Engineering", 150000, 2),
("Finance", 125000, 4),
("Legal", 225000, 7);
INSERT INTO departments (name)
VALUES
("Sales"),
("Engineering"),
("Finance");