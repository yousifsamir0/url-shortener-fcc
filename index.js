require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./database/config.js');
const {
  findByOriginalURL,
  createNewUrl,
  findByshortnedURL,
} = require('./models/url.services.js');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:[0-9]+)?(\/.*)?$/;
// Your first API endpoint
app.post('/api/shorturl', async (req, res) => {
  const urlParam = req.body.url;
  const jsonRes = {
    original_url: null,
    short_url: null
  }

  if (!urlRegex.test(urlParam)) {
    return res.status(400).json({ error: 'invalid url' })
  }
  const url = await findByOriginalURL(urlParam);
  if (url) {

    console.log('already found and returned')
    jsonRes.original_url = url.original_url;
    jsonRes.short_url = url.short_url;
    return res.json(jsonRes);
  }
  const newUrl = await createNewUrl({
    original_url: urlParam,
  })
  if (!newUrl) {
    return res.status(500).json({ message: 'something went wrong !' })
  }
  jsonRes.original_url = newUrl.original_url;
  jsonRes.short_url = newUrl.short_url;
  return res.json(jsonRes)
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrlParam = req.params.short_url;
  const url = await findByshortnedURL(shortUrlParam);
  if (!url) {
    return res.status(404).json({ error: 'not found' })
  }
  return res.status(307).redirect(url.original_url);
})



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  connectDB();
});
