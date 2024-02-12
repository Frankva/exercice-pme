SELECT firstname, lastname
FROM employees;

SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR(?)) AND (employee_id=?)

SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) as year_paid
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR('2024-02-09'));

SELECT firstname, lastname, ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) as year_paid
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR('2024-02-09'));

SELECT firstname, lastname, ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) as year_paid
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR('2024-02-09'))
GROUP BY firstname, lastname;

SELECT firstname, lastname, ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) as year_paid
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR(?))
GROUP BY firstname, lastname;
