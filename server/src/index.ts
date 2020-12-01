import express from 'express';

import { port } from './config';

const app = express();

app.get('/healthcheck', (_, res) => {
  res.status(200).send('OK');
});

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
