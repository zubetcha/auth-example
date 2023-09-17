import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { refresh, sign } from '@/utils/jwt';
import { setUserLoggedIn } from '@/utils/data';
import type { User } from './join';

const filePath = `${process.cwd()}/public/data.json`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send('필수값 누락');
      }

      const { notFound, accessToken, refreshToken } = setUserLoggedIn(username);

      if (notFound) {
        return res.status(405).send('존재하지 않는 유저입니다.');
      }

      return res
        .status(200)
        .setHeader(
          'Set-Cookie',
          `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
            Date.now() + 60 * 60 * 24 * 1000 * 3
          ).toUTCString()}; HttpOnly`
        )
        .setHeader('Authorization', accessToken)
        .send('Success');
  }
}
