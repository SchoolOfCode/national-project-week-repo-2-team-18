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
  beforeEach(() => {
    database.getScores.mockReset()
  })

  //TEST GETTING ALL SCORES//
  it('getScores should be called once', async function () {
    database.getScores.mockResolvedValue('scores')
    const response = await request(app)
      .get('/scores')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(database.getScores).toHaveBeenCalledTimes(1)
    expect(response.body.payload).toBe('scores') //// min 10:44
  })
  it('getScores should have message in the body response', async function () {
    const response = await request(app).get('/scores')
    expect(response.body.message).toBeDefined()
  })
})

describe('testing scores POST route with mock DB', function () {
  beforeEach(() => {
    database.createScores.mockReset()
  })
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
  it('api should be called with topic & score', async function () {
    const body = {
      topic: 'test',
      score: 4,
      outOf: 13,
    }
    const response = await request(app).post('/scores').send(body) // I NEED CLEAN BEFORE AND AFTER EACH TEST RUN
    expect(database.createScores).toHaveBeenCalledWith('test', 4, 13, 0)
  })
  it('api should return status 400 on each call', async function () {
    const reqBody = [{ topic: 'test' }, { score: 6 }, { outOf: 13 }, {}]
    for (const body of reqBody) {
      const response = await request(app).post('/scores').send(body).expect(400)
    }
  })
  it('api should return object in payload', async function () {
    const body = {
      topic: 'test',
      score: 4,
      outOf: 13,
    }
    database.createScores.mockResolvedValue('object')
    const response = await request(app).post('/scores').send(body)
    expect(response.body.payload).toBe('object')
  })
})
