import makeApp from './app.js'
import request from 'supertest'
import { jest } from '@jest/globals'

const database = {
  getScores: jest.fn(),
  createScores: jest.fn(),
  deleteScores: jest.fn(),
}

const app = makeApp(database)

describe('testing scores GET route with mock DB', function () {
  //TEST GETTING ALL SCORES//
  it('getScores should be called once', async function () {
    const response = await request(app)
      .get('/scores')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(database.getScores).toHaveBeenCalledTimes(1) /////here (min 6:53)
  })
  it('api should return object with message in it', async function () {
    const response = await request(app).get('/scores')
    expect(response.body.message).toBeDefined()
  })
  it('api should return object with message in it', async function () {
    const response = await request(app).get('/scores')
    expect(response.body.message).toBeDefined()
  })
})

describe('testing scores POST route with mock DB', function () {
  //TEST POST REQUEST//
  it('api should return status 200 & json object', async function () {
    const response = await request(app)
      .post('/scores')
      .send({
        topic: 'test',
        score: 8,
        outOf: 13,
      })
      .expect(200)
      .expect('Content-Type', /json/)
  })
  it('api should return status 400', async function () {
    const response = await request(app)
      .post('/scores')
      .send({
        topic: 'test',
        score: 'test',
        outOf: 13,
      })
      .expect(400)
  })
  it('api should return status 400', async function () {
    const reqBody = [{ topic: 'test' }, { score: 6 }, { outOf: 13 }, {}]
    for (const body of reqBody) {
      const response = await request(app).post('/scores').send(body).expect(400)
    }
  })
})
