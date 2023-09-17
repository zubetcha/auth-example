import React from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { Typography, Space, Form, Input, Button, Layout, message } from 'antd';

import service from '@/services';
import AuthAPI from '@/services/auth';

import type { LoginReq } from '@/types/auth';
import type { FormType } from '@/types/form';

const LoginPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>();

  const onSubmit = async (data: LoginReq) => {
    try {
      const res = await AuthAPI.login(data);

      if (res.status === 200) {
        // 로그인 성공처리
        console.log(res);
        const accessToken = res.headers.authorization;

        // accessToken 을 잘 꺼내서 어딘가로 저장시키기 or
        localStorage.setItem('accessToken', accessToken);

        // axios의 인스턴스 기본 정보에 설정
        service.defaults.headers.common['Authorization'] = accessToken;

        message.success('로그인 성공').then(() => router.push('/'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const forms: FormType<LoginReq>[] = [
    {
      name: 'username',
      label: '아이디',
      Component: Input,
    },
    {
      name: 'password',
      label: '비밀번호',
      Component: Input.Password,
    },
  ];
  return (
    <Layout>
      <Space align='center' direction='vertical' style={{ margin: '20px auto' }}>
        <Typography.Title level={3}>로그인</Typography.Title>
        <Form labelCol={{ span: 8 }} onFinish={handleSubmit(onSubmit)}>
          {forms.map(({ name, label, Component }) => (
            <Form.Item key={name} name={name} label={label}>
              <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Component {...field} status={!!errors[name] ? 'error' : undefined} />}
              />
              {errors[name] && <Typography.Text type='danger'>This is required.</Typography.Text>}
            </Form.Item>
          ))}
          <Space align='center' direction='vertical' style={{ width: '100%' }}>
            <Button type='primary' htmlType='submit'>
              로그인
            </Button>
          </Space>
        </Form>
      </Space>
    </Layout>
  );
};

export default LoginPage;
