const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

app.get('/api/:date_string', (req, res) => {
  const dateString = req.params.date_string;

  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    const dateObject = new Date(dateString);

    if (dateObject.toString() === 'Invalid Date') {
      res.json({ error: 'Invalid Date' });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
