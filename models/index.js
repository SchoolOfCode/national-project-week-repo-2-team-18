import query from '../db/connection.js'

export async function getScores() {
  const scores = await query('SELECT * FROM scores;')
  return scores.rows
}

export async function createScores(topic, score, outOf, percentage) {
  const scores = await query(
    'INSERT INTO scores ( topic,score, outOf, percentage) VALUES ($1, $2, $3, $4) RETURNING topic, score, outOf, percentage ',
    [topic, score, outOf, percentage]
  )
  return scores.rows
}

export async function deleteScores(id) {
  const scores = await query('DELETE FROM scores WHERE id = $1;', [id])
  return scores.rows
}
