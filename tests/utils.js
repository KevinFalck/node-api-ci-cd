const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');
let backup = null;

const restoreDb = () => {
    if (backup !== null) {
        fs.writeFileSync(DB_PATH, backup, 'utf8');
    }
};

const populateDb = (data) => {
    if (backup === null) {
        backup = fs.readFileSync(DB_PATH, 'utf8');
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), 'utf8');
};

module.exports = {
    restoreDb,
    populateDb
};
