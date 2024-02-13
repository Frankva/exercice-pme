START TRANSACTION;

INSERT INTO working_hours (amount)
VALUES
(38);

INSERT INTO employees (firstname, lastname)
VALUES
('Bob', 'Maurice'),
('Admin', 'Patron');

INSERT INTO employees_is_paid_working_hours
(employee_id, working_hour_id, start_date)
VALUES
(1, 1, '2024-01-01');

INSERT INTO emails (text, employee_id)
VALUES
('a@a.a', 1);

INSERT INTO passwords (hash, employee_id)
VALUES
(SHA2('a', 512), 1);

INSERT INTO authorization_groups (name)
VALUES
('administrator');

INSERT INTO employees_belong_authorization_groups
(employee_id, authorization_group_id)
VALUES
(2, 1);
