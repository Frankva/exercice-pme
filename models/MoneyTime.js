const pool = require('./pool')

const getRequestSelect = () => {
  return 'SELECT '
    + '( '
    + '  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)))  '
    + '  FROM daily_schedules '
    + '  WHERE (daily_date=?) AND (employee_id=?) '
    + ') AS `day_hour`, '
    + '( '
    + '  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)))  '
    + '  FROM daily_schedules '
    + '  WHERE (YEAR(daily_date)=YEAR(?)) AND '
    + '  (WEEK(daily_date, 3)=week(?, 3)) AND (employee_id=?) '
    + ') AS week_hour, '
    + '( '
    + '  SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)))  '
    + '  FROM daily_schedules '
    + '  WHERE (YEAR(daily_date)=YEAR(?)) AND '
    + '  (MONTH(daily_date)=MONTH(?)) AND (employee_id=?) '
    + ') AS month_hour, '
    + '( '
    + '  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) '
    + '  FROM daily_schedules '
    + '  NATURAL JOIN employees '
    + '  NATURAL JOIN employees_is_paid_working_hours '
    + '  NATURAL JOIN working_hours '
    + '  WHERE (daily_date=?) AND (employee_id=?) '
    + ') AS day_paid,  '
    + '( '
    + '  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) '
    + '  FROM daily_schedules '
    + '  NATURAL JOIN employees '
    + '  NATURAL JOIN employees_is_paid_working_hours '
    + '  NATURAL JOIN working_hours '
    + '  WHERE (YEAR(daily_date)=YEAR(?)) AND '
    + '  (WEEK(daily_date, 3)=week(?, 3)) AND (employee_id=?) '
    + ') AS week_paid,  '
    + '( '
    + '  SELECT ROUND(SUM(TIME_TO_SEC(end_hour) - '
    + '  TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) '
    + '  FROM daily_schedules '
    + '  NATURAL JOIN employees '
    + '  NATURAL JOIN employees_is_paid_working_hours '
    + '  NATURAL JOIN working_hours '
    + '  WHERE (YEAR(daily_date)=YEAR(?)) AND '
    + '  (MONTH(daily_date)=MONTH(?)) AND (employee_id=?) '
    + ') AS month_paid; ';
}

const getDefaultMoneyTime = () => {
  return {
      dayHour: '0',
      weekHour: '0',
      monthHour: '0',
      dayPaid: '0',
      weekPaid: '0',
      monthPaid: '0'
    };
}

const formatRow = (row) => {
  return {
      dayHour: row.day_hour,
      weekHour: row.week_hour,
      monthHour: row.month_hour,
      dayPaid: row.day_paid,
      weekPaid: row.week_paid,
      monthPaid: row.month_paid
    };
}

exports.select = async ({ dailyDate, employeeId }) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(getRequestSelect(), [
      dailyDate, employeeId,
      dailyDate, dailyDate, employeeId,
      dailyDate, dailyDate, employeeId,
      dailyDate, employeeId,
      dailyDate, dailyDate, employeeId,
      dailyDate, dailyDate, employeeId
    ]);
    return formatRow(rows[0]);
  } catch (e) {
    return getDefaultMoneyTime();
  } finally {
    if (conn) conn.end();
  }
};

