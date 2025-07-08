
const odbc = require('odbc');

async function executeQuery(dsn, user, password, sql, lastRun) {
  const connection = await odbc.connect(`DSN=${dsn};UID=${user};PWD=${password}`);
  const statement = sql.replace(':lastRun', `'${lastRun}'`);
  const result = await connection.query(statement);
  await connection.close();
  return result;
}

module.exports = { executeQuery };
