const pool = require('./pool')

const getRequestSelect = () => {
  return 'SELECT IF(authorization_group_id, TRUE, FALSE) '
    + 'FROM employees '
    + 'NATURAL JOIN employees_belong_authorization_groups '
    + 'NATURAL JOIN authorization_groups '
    + 'WHERE (name=\'administrator\') AND (employee_id=?); ';
};

exports.isAdmin = async (employeeId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(getRequestSelect(), [ employeeId ]);
    return Boolean(rows[0]);
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    if (conn) conn.end();
  }
};


const getRequestSelectList = () => {
  return 'SELECT firstname, lastname, ROUND(SUM(TIME_TO_SEC(end_hour) - '
    + 'TIME_TO_SEC(start_hour)) / 3600.0 * amount, 2) as year_paid '
    + 'FROM daily_schedules '
    + 'NATURAL JOIN employees '
    + 'NATURAL JOIN employees_is_paid_working_hours '
    + 'NATURAL JOIN working_hours '
    + 'WHERE (YEAR(daily_date)=YEAR(?)) '
    + 'GROUP BY firstname, lastname; ';
};

exports.selectList = async (dailyDate) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(getRequestSelectList(), [ dailyDate ]);
    console.log(rows);
    console.log(typeof rows);
    return rows;
  } catch (e) {
    console.log(e);
    return [];
  } finally {
    if (conn) conn.end();
  }
};
