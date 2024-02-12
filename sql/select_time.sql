SELECT start_hour, end_hour
FROM daily_schedules
WHERE (daily_date=?) AND (employee_id=?);

explain SELECT start_hour, end_hour
FROM daily_schedules
WHERE (daily_date='2024-02-09') AND (employee_id=1);
