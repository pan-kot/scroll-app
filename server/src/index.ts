import express from 'express';

import { port } from './config';

import advisors from './routes/advisors';
import languages from './routes/languages';

const app = express();

app.get('/healthcheck', (_, res) => {
  res.status(200).send('OK');
});

app.use('/advisors', advisors);
app.use('/languages', languages);

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
