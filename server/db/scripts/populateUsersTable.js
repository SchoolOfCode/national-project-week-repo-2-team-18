import query from '../connection.js'

const topic ='react'
const score = 87;
const outOf = 100
const percentage = 87


async function populateScoreTable(){
    const res = await query('INSERT INTO scores ( topic,score, outOf) VALUES ($1, $2, $3) RETURNING topic, score, outOf ', [topic, score, outOf]);
    console.log (res)
}
populateScoreTable()
