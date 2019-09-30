import express = require('express');
import config from './../configs/config.app';

const app = express();
const portNumber = config.client.port;
const sourceDir = './build/client';

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Cleint web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});