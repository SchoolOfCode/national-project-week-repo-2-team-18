import request from 'supertest'
import app from './app.js'

describe("scores", function () {
  //TEST GETTING ALL SCORES//
  test('api should return object with the scores', async function () {
    await request(app)
      .get('/scores')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        const expected = [
          {
            date: '2022-01-20T11:04:59.424Z',
            id: 82,
            outof: 10,
            percentage: 5,
            score: 2,
            topic: 'test',
          },
        ]
        const actual = res.body
        expect(actual).toEqual({
          message: 'We are sending the scores',
          payload: expect.arrayContaining(expected),
        })
      })
  })
  //   TEST INSERT NEW SCORE WITH ERRORS
  test('api should return a json object with error message', async function () {
    await request(app)
      .post('/scores')
      .send({
        topic: 'test',
        score: 2,
        outOf: 10,
        percentage: 'test',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        const actual = res.body
        expect(actual).toStrictEqual({
          message: 'Try again with the correct data',
        })
      })
  })
  //   TEST DELETE SCORE WITH ERRORS
  test('api should return an error message', async function () {
    await request(app)
      .delete('/scores/test')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        const actual = res.body
        expect(actual).toStrictEqual({
          message: 'Please insert a correct id',
        })
      })
  })
})