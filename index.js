require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const urlParser = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

let urlDatabase = [];

app.post('/api/shorturl', function (req, res) {
  const originalUrl = req.body.url;

  let url;
  try {
    url = new URL(originalUrl);
  } catch (_) {
    return res.json({ 'error': 'invalid url' })
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return res.json({ 'error': 'invalid url' })
  }

  dns.lookup(url.hostname, function (err) {
    if (err) {
      return res.json({ 'error': 'invalid url' });
    } else {
      const shortUrl = urlDatabase.length + 1;
      urlDatabase.push({
        'original_url': url.href,
        shortUrl
      });
      res.json({ 'original_url': url.href, 'short_url': shortUrl });
    }
  })
})

app.get('/api/shorturl/:shortUrl', function (req, res) {
  const shortUrl = parseInt(req.params.shortUrl, 10);

  if (isNaN(shortUrl)) {
    return res.json({ 'error': 'invalid url' })
  }

  const urlEntry = urlDatabase.find(entry => entry.shortUrl == shortUrl);

  if (urlEntry) {
    res.redirect(urlEntry.originalUrl);
  } else {
    res.json({ 'error': 'No short URL found for the given input' });
  }
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
