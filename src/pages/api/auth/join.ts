// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createUser } from '@/utils/data';

export type User = {
  id: string;
  username: string;
  password: string;
  refreshToken: string | null;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { username, password, passwordConfirm } = req.body;

      if (!username || !password || !passwordConfirm) {
        return res.status(400).send('필수값 누락');
      }

      createUser({ username, password });

      return res.status(200).send('Success');
  }
}
