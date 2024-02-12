INSERT INTO daily_schedules
(daily_date, start_hour, end_hour, employee_id)
VALUES
(?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
daily_date=VALUES(daily_date),
start_hour=VALUES(start_hour),
end_hour=VALUES(end_hour),
employee_id=VALUES(employee_id);
