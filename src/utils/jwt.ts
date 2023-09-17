import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export const sign = (username: string) => {
  return jwt.sign({ id: username }, secret, {
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: '1m', // 유효기간
  });
};

export const verify = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      username: decoded.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const refresh = (username: string) => {
  return jwt.sign({ id: username }, secret, {
    algorithm: 'HS256',
    expiresIn: '14d', // 유효기간
  });
};

export const refreshVerify = (token: string) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};
