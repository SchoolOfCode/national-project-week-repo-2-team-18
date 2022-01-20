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
  const { topic, score, outOf, percentage } = req.body
  if(topic !== '' &&
  !isNaN(score) &&
  score !== '' &&
  !isNaN(outOf) &&
  outOf !== '' &&
  !isNaN(percentage) &&
  percentage !== '' && score < outOf){
    try {
      const response = await createScores(topic, score, outOf, percentage)
      res.json({ message: 'We created a new score', payload: response })
    } catch (error) {
      console.error(error.message)
    }
  }else {
  res.json({
    message: 'Try again with the correct data' 
  })
}
  
})

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  if(!isNaN(id)){
    try {
    
      const response = await deleteScores(id)
      res.json({ message: 'We deleted your score', payload: response })
    } catch (error) {
      console.error(error.message)
    }

  }else {
    res.json({
      message: `Please insert a correct id` 
    })
  }
  
})

export default router
