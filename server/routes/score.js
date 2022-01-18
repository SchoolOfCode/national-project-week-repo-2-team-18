import express from 'express'
import { getScores, createScores, deleteScores } from '../models/index.js'
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const response = await getScores()
    res.json({ message: 'We are sending the scores', payload: response })
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/', async function (req, res) {
  try {
    const { topic, score, outOf, percentage } = req.body
    const response = await createScores(topic, score, outOf, percentage)
    res.json({ message: 'We created a new score', payload: response })
  } catch (error) {
    console.error(error.message)
  }
})

router.delete('/:id', async function (req, res) {
  try {
    const { id } = req.params
    const response = await deleteScores(id)
    res.json({ message: 'We deleted your score', payload: response })
  } catch (error) {
    console.error(error.message)
  }
})

export default router
