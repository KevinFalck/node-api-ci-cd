const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const store = require("./store");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Views
app.get("/", (req, res) => {
    res.redirect("/about");
});

app.get("/about", (req, res) => {
    const whispers = store.getAllWhispers();
    res.render("about", { whisperCount: whispers.length });
});

// API Routes
app.get("/api/whispers", (req, res) => {
    res.json(store.getAllWhispers());
});

app.get("/api/whispers/:id", (req, res) => {
    const whisper = store.getWhisperById(req.params.id);
    if (whisper) {
        res.json(whisper);
    } else {
        res.status(404).json({ error: "Whisper not found" });
    }
});

app.post("/api/whispers", (req, res) => {
    if (!req.body.content || !req.body.author) {
        return res.status(400).json({ error: "Content and author are required" });
    }
    const newWhisper = store.createWhisper(req.body);
    res.status(201).json(newWhisper);
});

app.put("/api/whispers/:id", (req, res) => {
    const updated = store.updateWhisper(req.params.id, req.body);
    if (updated) {
        res.json(updated);
    } else {
        res.status(404).json({ error: "Whisper not found" });
    }
});

app.delete("/api/whispers/:id", (req, res) => {
    const deleted = store.deleteWhisper(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Whisper not found" });
    }
});

// Utils
app.get("/status", (req, res) => {
    res.json({ status: "API is running" });
});

app.get("/version", (req, res) => {
    res.json({ version: "1.2.0" });
});

module.exports = app;
