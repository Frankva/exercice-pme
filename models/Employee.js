const pool = require('./pool')

exports.getEmployeeId = async (email, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(getRequestEmployeeId(), [email, password]);
    const id = rows[0].employee_id;
    return id;
  } catch (e) {
    throw e;
  } finally {
    if (conn) conn.end();
  }
}

function getRequestEmployeeId() {
  return 'SELECT employee_id '
    + 'FROM employees '
    + 'NATURAL JOIN emails '
    + 'NATURAL JOIN passwords '
    + 'WHERE text=? AND hash=SHA2(?, 512);';
}
