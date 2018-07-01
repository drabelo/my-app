const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fetch = require("fetch");
app.use(express.static(path.join(__dirname, "build")));

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/url", (req, res) => {
  let token = process.env.token;

  if (req.query.token) {
    token = req.query.token;
  }

  const options = {
    headers: {
      Authorization: token
    }
  };

  fetch.fetchUrl(req.query.url, options, function(error, meta, body) {
    console.log(error);
    res.send(body.toString());
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Example app listening on port 3000!")
);
