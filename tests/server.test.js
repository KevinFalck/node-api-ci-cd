const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

describe('Server Routes', () => {
    let originalDbContent;

    beforeAll(() => {
        originalDbContent = fs.readFileSync(DB_PATH, 'utf8');
    });

    afterAll(() => {
        fs.writeFileSync(DB_PATH, originalDbContent, 'utf8');
    });

    test('GET /about should render correctly', async () => {
        const response = await request(app).get('/about');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Welcome to Whispering!');
    });

    test('GET /api/whispers should return all whispers', async () => {
        const response = await request(app).get('/api/whispers');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/whispers should create a whisper', async () => {
        const newWhisper = { content: 'Integration test whisper', author: 'IntTester' };
        const response = await request(app)
            .post('/api/whispers')
            .send(newWhisper);
        expect(response.statusCode).toBe(201);
        expect(response.body.content).toBe(newWhisper.content);
    });

    test('GET /status should return 200', async () => {
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('API is running');
    });
});
