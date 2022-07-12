// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const isNumber = require("is-number");
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  /** @type Date */
  let date;
  const paramsDate = req.params.date;

  if (!paramsDate) {
    date = new Date();
  } else {
    if (isNumber(paramsDate)) {
      date = new Date();
      date.setTime(+paramsDate);
    } else {
      date = new Date(paramsDate);
    }

    if (!date.getTime()) {
      return res.json({ error: "Invalid Date" });
    }
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
