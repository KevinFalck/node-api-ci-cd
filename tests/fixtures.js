const whispers = [
    { id: 1, content: "First test whisper", author: "TestUser1", createdAt: new Date().toISOString() },
    { id: 2, content: "Second test whisper", author: "TestUser2", createdAt: new Date().toISOString() }
];

const existingId = 1;
const inventedId = 999;

module.exports = {
    whispers,
    existingId,
    inventedId
};
