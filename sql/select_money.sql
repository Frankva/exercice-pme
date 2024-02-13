SELECT
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (daily_date='2024-02-09') AND (employee_id=1)
) AS `day_hour`,
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (YEAR(daily_date)=YEAR('2024-02-09')) AND
  (WEEK(daily_date, 3)=week('2024-02-09', 3)) AND (employee_id=1)
) AS week_hour,
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (YEAR(daily_date)=YEAR('2024-02-09')) AND
  (MONTH(daily_date)=MONTH('2024-02-09')) AND (employee_id=1)
) AS month_hour,
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (daily_date='2024-02-09') AND (employee_id=1)
) AS day_paid, 
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (YEAR(daily_date)=YEAR('2024-02-09')) AND
  (WEEK(daily_date, 3)=week('2024-02-09', 3)) AND (employee_id=1)
) AS week_paid, 
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (YEAR(daily_date)=YEAR('2024-02-09')) AND
  (MONTH(daily_date)=MONTH('2024-02-09')) AND (employee_id=1)
) AS month_paid;


SELECT
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (daily_date=?) AND (employee_id=?)
) AS `day_hour`,
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (YEAR(daily_date)=YEAR(?)) AND
  (WEEK(daily_date, 3)=week(?, 3)) AND (employee_id=?)
) AS week_hour,
(
  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour))) 
  FROM daily_schedules
  WHERE (YEAR(daily_date)=YEAR(?)) AND
  (MONTH(daily_date)=MONTH(?)) AND (employee_id=?)
) AS month_hour,
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (daily_date=?) AND (employee_id=?)
) AS day_paid, 
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (YEAR(daily_date)=YEAR(?)) AND
  (WEEK(daily_date, 3)=week(?, 3)) AND (employee_id=?)
) AS week_paid, 
(
  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
  FROM daily_schedules
  NATURAL JOIN employees
  NATURAL JOIN employees_is_paid_working_hours
  NATURAL JOIN working_hours
  WHERE (YEAR(daily_date)=YEAR(?)) AND
  (MONTH(daily_date)=MONTH(?)) AND (employee_id=?)
) AS month_paid;

SELECT ROUND(SUM(TIME_TO_SEC(end_hour) -
TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2)
FROM daily_schedules
NATURAL JOIN employees
NATURAL JOIN employees_is_paid_working_hours
NATURAL JOIN working_hours
WHERE (YEAR(daily_date)=YEAR(?)) AND
(MONTH(daily_date)=MONTH(?)) AND (employee_id=?)
