const store = require('../store');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

describe('Store Logic', () => {
    let originalDbContent;

    beforeAll(() => {
        originalDbContent = fs.readFileSync(DB_PATH, 'utf8');
    });

    afterAll(() => {
        fs.writeFileSync(DB_PATH, originalDbContent, 'utf8');
    });

    test('should get all whispers', () => {
        const whispers = store.getAllWhispers();
        expect(Array.isArray(whispers)).toBe(true);
    });

    test('should create a new whisper', () => {
        const newWhisper = { content: 'Test whisper', author: 'Tester' };
        const created = store.createWhisper(newWhisper);
        expect(created.content).toBe(newWhisper.content);
        expect(created.author).toBe(newWhisper.author);
        expect(created).toHaveProperty('id');
        expect(created).toHaveProperty('createdAt');
    });

    test('should get whisper by id', () => {
        const whispers = store.getAllWhispers();
        const first = whispers[0];
        const found = store.getWhisperById(first.id);
        expect(found.id).toBe(first.id);
    });

    test('should update a whisper', () => {
        const whispers = store.getAllWhispers();
        const first = whispers[0];
        const updated = store.updateWhisper(first.id, { content: 'Updated content' });
        expect(updated.content).toBe('Updated content');
    });

    test('should delete a whisper', () => {
        const whispers = store.getAllWhispers();
        const first = whispers[0];
        const deleted = store.deleteWhisper(first.id);
        expect(deleted).toBe(true);
        const found = store.getWhisperById(first.id);
        expect(found).toBeUndefined();
    });
});
