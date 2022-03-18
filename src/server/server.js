import express from 'express';
import * as bodyParser from 'body-parser';

import config from './config';

const PORT = config.port;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

app.listen(PORT, () => {
  console.log('Node server started running');
});
