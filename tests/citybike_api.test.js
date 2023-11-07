const db = require('../db/index')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
describe('The database is running with all the proper data', () => {

  test('The backend service is online', async () => {
    const res = await api.get('/')
    expect(res.status).toBe(200)
  })

  describe('/api/stations endpoint tests', () => {
    test('Stations are returned as json', async () => {
      const res = await api.get('/api/stations')
      expect(res.status).toBe(200)
      expect(res.header['content-type']).toMatch(/application\/json/)
    })
    test('All stations are returned', async () => {
      const res = await api.get('/api/stations')
      expect(res.body).toHaveLength(helper.totalStationsCount)
    })
    test('A specific station is within the returned stations', async () => {
      const res = await api.get('/api/stations/')
      expect(res.body).toContainEqual({
        id: helper.specificStation.details.id,
        station_name: helper.specificStation.details.station_name
      })
    })
  })

  describe('Specific station endpoint tests', () => {
    test('Specific station can be viewed with the correct information', async () => {
      const res = await api.get(`/api/stations/${helper.specificStation.details.id}`)
      expect(res.body[0]).toEqual(
        expect.objectContaining(helper.specificStation.details)
      )
    })
    test('Nonexistent id returns 404 not found', async () => {
      const res = await api.get('/api/stations/9999')
      expect(res.status).toBe(404)
      expect(res.body.error).toBe('Station couldn\'t be found.')
    })
    test('Malformatted id returns 400 bad request', async () => {
      const res = await api.get('/api/stations/wrongid')
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Malformatted id.')
    })
    test('SQL Injection attempt will result 400 bad request', async () => {
      const res = await api.get('/api/stations/105 OR 1=1')
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Malformatted id.')
    })
  })

  describe('Journeys for a specific station endpoint tests', () => {
    test('Show all journeys started from a specific station', async () => {
      const res = await api.get(`/api/stations/${helper.specificStation.details.id}/departures`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(helper.specificStation.departuresCount)
    })
    test('Show all journeys stopped on a specific station', async () => {
      const res = await api.get(`/api/stations/${helper.specificStation.details.id}/returns`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(helper.specificStation.returnsCount)
    })
    test('Specific journey is in all journeys departed from a specific station', async () => {
      const res = await api.get(`/api/stations/${helper.specificStation.details.id}/departures`)
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(helper.specificStation.sampleDepartureJourney)
        ])
      )
    })
    test('Specific journey is in all journeys returned from a specific station', async () => {
      const res = await api.get(`/api/stations/${helper.specificStation.details.id}/returns`)
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(helper.specificStation.sampleReturnJourney)
        ])
      )
    })
  })
})


afterAll(async () => {
  db.pool.end()
})