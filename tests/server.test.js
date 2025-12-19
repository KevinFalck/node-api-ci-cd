const supertest = require('supertest');
const app = require('../app');
const { restoreDb, populateDb } = require('./utils.js');
const { whispers, inventedId, existingId } = require('./fixtures.js');
const store = require('../store');

describe('Server', () => {
    beforeEach(() => {
        populateDb(whispers);
    });

    afterAll(() => {
        restoreDb();
    });

    describe('GET /api/v1/whisper', () => {
        it('should return an empty array when there\'s no data', async () => {
            populateDb([]); // empty the db
            const response = await supertest(app).get('/api/v1/whisper');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return all the whispers', async () => {
            const response = await supertest(app).get('/api/v1/whisper');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(whispers);
        });
    });

    describe('GET /api/v1/whisper/:id', () => {
        it.todo('should return a 404 when the whisper doesn\'t exist');
        it.todo('should return a whisper details');
    });

    describe('POST /api/v1/whisper', () => {
        it.todo('should return a 400 when the body is empty');
        it.todo('should return a 400 when the body is invalid');
        it.todo('should return a 201 when the whisper is created');
    });
});
