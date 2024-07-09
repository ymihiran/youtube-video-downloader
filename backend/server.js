// server.js
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/download', async (req, res) => {
    const videoURL = req.query.url;
    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(videoURL, { format: 'mp4' }).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
