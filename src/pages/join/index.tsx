import React from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { Typography, Space, Form, Input, Button, Layout, message } from 'antd';

import AuthAPI from '@/services/auth';

import type { JoinReq } from '@/types/auth';
import type { FormType } from '@/types/form';

const JoinPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinReq>();

  const onSubmit = async (data: JoinReq) => {
    try {
      const res = await AuthAPI.join(data);
      // 로그인 페이지로 이동
      console.log(res);
      message.success('회원가입 성공').then(() => router.push('/login'));
    } catch (error) {
      console.log(error);
    }
  };

  const forms: FormType<JoinReq>[] = [
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
    {
      name: 'passwordConfirm',
      label: '비밀번호 재입력',
      Component: Input.Password,
    },
  ];

  return (
    <Layout>
      <Space align='center' direction='vertical' style={{ margin: '20px auto' }}>
        <Typography.Title level={3}>회원가입</Typography.Title>
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
              회원가입
            </Button>
          </Space>
        </Form>
      </Space>
    </Layout>
  );
};

export default JoinPage;
