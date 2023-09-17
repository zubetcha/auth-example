// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '@/utils/jwt';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ok, message, username } = verify(req.headers.authorization || '');

  if (!ok) {
    return res.status(401).send(message);
  }

  res.status(200).json(`hello ${username}`);
}
