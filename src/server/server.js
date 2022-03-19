import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import boardsRouter from './routes/board';

const PORT = config.port;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

app.use('/api/boards', boardsRouter);

app.listen(PORT, () => {
  console.log('Node server started running');
});
