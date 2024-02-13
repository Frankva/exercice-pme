START TRANSACTION;

DROP DATABASE IF EXISTS pme20240131;
CREATE DATABASE pme20240131;
USE pme20240131;

CREATE TABLE employees (
    employee_id bigint auto_increment primary key,
    firstname varchar(255),
    lastname varchar(255)
);
CREATE TABLE emails (
    email_id bigint auto_increment primary key,
    text varchar(255) UNIQUE,
    employee_id bigint,
    foreign key (employee_id) REFERENCES employees (employee_id)
);
CREATE TABLE passwords (
    password_id bigint auto_increment primary key,
    hash varchar(255),
    employee_id bigint,
    foreign key (employee_id) REFERENCES employees (employee_id)
);
CREATE TABLE daily_schedules (
    daily_schedule_id bigint auto_increment primary key,
    daily_date date,
    start_hour time,
    end_hour time,
    employee_id bigint,
    foreign key (employee_id) REFERENCES employees (employee_id),
    UNIQUE INDEX (daily_date, employee_id)
);
CREATE TABLE working_hours (
    working_hour_id bigint auto_increment primary key,
    amount decimal(10, 2) UNSIGNED ZEROFILL
);
CREATE TABLE employees_is_paid_working_hours (
    employee_is_paid_working_hour_id bigint auto_increment primary key,
    employee_id bigint,
    working_hour_id bigint,
    start_date date,
    end_date date,
    foreign key (employee_id) REFERENCES employees (employee_id),
    foreign key (working_hour_id) REFERENCES working_hours (working_hour_id)
);
CREATE TABLE authorization_groups (
    authorization_group_id bigint auto_increment primary key,
    name varchar(255)
);
CREATE TABLE employees_belong_authorization_groups (
    employees_belong_authorization_group_id bigint auto_increment primary key,
    employee_id bigint,
    authorization_group_id bigint,
    foreign key (employee_id) REFERENCES employees (employee_id),
    foreign key (authorization_group_id)
    REFERENCES authorization_groups (authorization_group_id)
);
