const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Video Info API
app.get('/api/info', async (req, res) => {
  const url = req.query.url;
  if (!ytdl.validateURL(url)) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    const info = await ytdl.getInfo(url);
    const details = {
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      duration: `${Math.floor(info.videoDetails.lengthSeconds/60)}:${info.videoDetails.lengthSeconds%60}`
    };
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
});

// Download API
app.get('/api/download', async (req, res) => {
  const { videoUrl, format_type, quality } = req.query;
  if (!ytdl.validateURL(videoUrl)) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[<>:"/\\|?*]/g,'').substring(0,80);

    if (format_type === 'mp3') {
      res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
      ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
    } else {
      res.header('Content-Disposition', `attachment; filename="${title}-${quality}.mp4"`);
      ytdl(videoUrl, { quality: quality }).pipe(res);
    }
  } catch (err) {
    res.status(500).json({ error: 'Download failed' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
