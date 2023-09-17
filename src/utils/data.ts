import fs from 'fs';

import { refresh, sign } from './jwt';
import type { JoinReq } from '@/types/auth';
import type { User } from '@/pages/api/auth/join';

const filePath = `${process.cwd()}/public/data.json`;

export const createUser = ({ username, password }: Omit<JoinReq, 'passwordConfirm'>) => {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const jsonData = JSON.parse(data);

  jsonData.users.push({ id: Date.now().toString(), username, password, refreshToken: null });

  const jsonString = JSON.stringify(jsonData);

  fs.writeFileSync(filePath, jsonString, 'utf-8');
};

export const setUserLoggedIn = (username: string) => {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const jsonData = JSON.parse(data);
  const index = jsonData.users.findIndex((user: User) => user.username === username);

  if (!jsonData.users.length || index < 0) {
    return {
      notFound: true,
      accessToken: '',
      refreshToken: '',
    };
  }

  const refreshToken = refresh(username);
  const accessToken = sign(username);
  const user = jsonData.users[index];

  jsonData.users.splice(index, 1, { ...user, refreshToken });

  const jsonString = JSON.stringify(jsonData);

  fs.writeFileSync(filePath, jsonString, 'utf-8');

  return {
    notFound: false,
    accessToken,
    refreshToken,
  };
};
