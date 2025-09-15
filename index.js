const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  if (!dateInput) {
    let date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else if (/^\d+$/.test(dateInput)) {
    let date = new Date(Number(dateInput));
    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
  } else {
    let date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
  }
});


const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

