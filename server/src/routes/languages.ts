import express from 'express';

import { selectAvailableLanguages } from '../repository/advisors';

const router = express.Router();

router.get('/', async (_, res) => {
  const result = await selectAvailableLanguages();

  res.status(200).send(result);
});

export default router;
