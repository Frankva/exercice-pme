const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'root',
     connectionLimit: 5,
     database:'pme20240131'
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from working_hours;");
    console.log(rows); //[ {val: 1}, meta: ... ]
    console.log(Number(rows[0].amount));
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

module.exports = pool;
