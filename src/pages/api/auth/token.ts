import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { refresh, refreshVerify, sign } from '@/utils/jwt';
import type { User } from './join';

const filePath = `${process.cwd()}/public/data.json`;

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        let refreshToken = req.headers.cookie
          ?.split('; ')
          .find((cookie) => cookie.includes('refreshToken'))
          ?.split('=')[1];
        if (refreshToken) {
          const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
          const jsonData = JSON.parse(data);
          const index = jsonData.users.findIndex((user: User) => user.refreshToken === refreshToken);

          if (index < 0) {
            return res.status(405).send('');
          }

          const user = jsonData.users[index];
          const { username } = user;
          // access Token 재발급
          const accessToken = sign(username);
          if (!refreshVerify(refreshToken)) {
            // 만료된 경우
            refreshToken = refresh(username);
            jsonData.users.splice(index, 1, { ...user, refreshToken });

            const jsonString = JSON.stringify(jsonData);

            fs.writeFileSync(filePath, jsonString, 'utf-8');
          }

          return res
            .setHeader(
              'Set-Cookie',
              `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
              ).toUTCString()}; HttpOnly`
            )
            .setHeader('Authorization', accessToken)
            .send({ username, accessToken });
        }
        return res.send('로그인 해주세요!');
      } catch (error) {
        res.statusCode = 405;
        return res.send(error);
      }
  }
}
