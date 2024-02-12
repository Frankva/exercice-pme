const pool = require('./pool')

const getRequestInsert = () => {
  return 'INSERT INTO daily_schedules '
    + '(daily_date, start_hour, end_hour, employee_id) '
    + 'VALUES '
    + '(?, ?, ?, ?) '
    + 'ON DUPLICATE KEY UPDATE '
    + 'daily_date=VALUES(daily_date), '
    + 'start_hour=VALUES(start_hour), '
    + 'end_hour=VALUES(end_hour), '
    + 'employee_id=VALUES(employee_id) '
};

exports.insert = async ({ dailyDate, startHour, endHour, employeeId }) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(getRequestInsert(),
      [dailyDate, startHour, endHour, employeeId]);
  } catch (e) {
    throw e;
  } finally {
    if (conn) conn.end();
  }
};

const getRequestSelect = () => {
  return ' SELECT start_hour, end_hour '
    + ' FROM daily_schedules '
    + ' WHERE (daily_date=?) AND (employee_id=?); ';
};

exports.select = async ({ dailyDate, employeeId }) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(getRequestSelect(), [dailyDate, employeeId]);
    return {
      startHour: rows[0].start_hour,
      endHour: rows[0].end_hour
    }
  } catch (e) {
    console.log(e);
    return {
      startHour: '00:00',
      endHour: '00:00'
    }
  } finally {
    if (conn) conn.end();
  }
};
