// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

// This is currently unused, but here as a stub / example for when we're ready for the first serverless function
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
