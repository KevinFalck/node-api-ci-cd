const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

const readDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return [];
    }
};

const writeDb = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing to database:', error);
        return false;
    }
};

const getAllWhispers = () => readDb();

const getWhisperById = (id) => {
    const whispers = readDb();
    return whispers.find(w => w.id === parseInt(id));
};

const createWhisper = (whisper) => {
    const whispers = readDb();
    const newWhisper = {
        id: whispers.length > 0 ? Math.max(...whispers.map(w => w.id)) + 1 : 1,
        ...whisper,
        createdAt: new Date().toISOString()
    };
    whispers.push(newWhisper);
    writeDb(whispers);
    return newWhisper;
};

const updateWhisper = (id, updatedData) => {
    const whispers = readDb();
    const index = whispers.findIndex(w => w.id === parseInt(id));
    if (index !== -1) {
        whispers[index] = { ...whispers[index], ...updatedData, id: parseInt(id) };
        writeDb(whispers);
        return whispers[index];
    }
    return null;
};

const deleteWhisper = (id) => {
    const whispers = readDb();
    const filtered = whispers.filter(w => w.id !== parseInt(id));
    if (filtered.length !== whispers.length) {
        writeDb(filtered);
        return true;
    }
    return false;
};

module.exports = {
    getAllWhispers,
    getWhisperById,
    createWhisper,
    updateWhisper,
    deleteWhisper
};
