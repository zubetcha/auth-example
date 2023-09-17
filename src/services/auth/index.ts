import service from '@/services';

import type { LoginReq, JoinReq } from '@/types/auth';

const AuthAPI = {
  login: (data: LoginReq) => service.post('/api/auth/login', data),
  join: (data: JoinReq) => service.post('/api/auth/join', data),
  refresh: () => service.get('/api/auth/token'),
};

export default AuthAPI;
