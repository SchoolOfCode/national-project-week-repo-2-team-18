import query from '../connection.js'
const sqlString =
  'CREATE TABLE IF NOT EXISTS scores(id SERIAL PRIMARY KEY, topic TEXT, score INT,date TIMESTAMP DEFAULT NOW(), outOf INT, percentage INT)'

async function createScoresTable() {
  const res = await query(sqlString)
  console.log('TAble Created', res)
}
createScoresTable()
