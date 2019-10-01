import express = require('express');
import path = require('path');
import config from './../configs/config.app';

const app = express();
const portNumber = config.client.port;
const sourceDir = './build/client';

app.use(express.static(sourceDir));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(portNumber, () => {
  console.log(`Cleint web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});