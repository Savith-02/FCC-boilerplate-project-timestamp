// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// http://localhost:5050/api/ endpoint
app.get("/api/", (req, res) => {
  let unix = Number(Date.now())
  let utc = new Date(unix).toUTCString()
  res.json({"unix" : unix, "utc": utc})
})

// http://localhost:5050/api/:date endpoint
app.get("/api/:date", (req, res) => {  
  const dateString = req.params.date

  // Handling a Unix timestamp input
  if(/^\d+$/.test(dateString)) {
    let date = new Date(Number(dateString))
    res.json({"unix": Nuber(dateString), utc: date.toUTCString()})
    return;
  }

  // Hnadling a date input
  // Formatting input date string if needed 
  let regex = /([ -//])(\d)([ -//])/
  let regex2 = /([ -//])(\d)$/
  let formattedDate = dateString.replace(regex, '$10$2$3').replace(regex2, '$10$2')
  let date = new Date((formattedDate))

  // Returing error json object if input data isinvalid
  if ( date == "Invalid Date" ) {
    res.json({ "error" : "Invalid Date" })
    return;
  }

  // Returning responce
  const unix = Date.parse(date)
  const utc = date.toUTCString()
  res.json({"unix" : Number(unix), "utc": utc})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
