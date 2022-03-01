import express from 'express'

function scoreRouter(database) {
  const router = express.Router()
  const { getScores, createScores, deleteScores } = database
  /* GET users listing. */
  router.get('/', async function (req, res) {
    try {
      const response = await getScores()
      res
        .status(200)
        .json({ message: 'We are sending the scores', payload: response })
    } catch (error) {
      console.error(error.message)
    }
  })

  router.post('/', async function (req, res) {
    const percentage = 0
    const { topic, score, outOf } = req.body
    if (topic !== '' && !isNaN(score) && !isNaN(outOf)) {
      try {
        const response = await createScores(topic, score, outOf, percentage)
        res.json({ message: 'We created a new score', payload: response })
      } catch (error) {
        res.status(500).json({ error: error })
      }
    } else {
      res.status(400).json({ message: 'Try again with the correct data' })
    }
  })

  router.delete('/:id', async function (req, res) {
    const { id } = req.params
    if (!isNaN(id)) {
      try {
        const response = await deleteScores(id)
        res.json({ message: 'We deleted your score', payload: response })
      } catch (error) {
        console.error(error.message)
      }
    } else {
      res.json({ message: `Please insert a correct id` })
    }
  })
  return router
}
export default scoreRouter
