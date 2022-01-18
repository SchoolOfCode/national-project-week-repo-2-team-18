import query from '../connection.js'

const topic ='react'
const score = 87;
const outOf = 100
const percentage = 87


async function populateScoreTable(){
    const res = await query('INSERT INTO scores ( topic,score, outOf, percentage) VALUES ($1, $2, $3, $4) RETURNING topic, score, outOf, percentage ', [topic, score, outOf,percentage]);
    console.log (res)
}
populateScoreTable()
