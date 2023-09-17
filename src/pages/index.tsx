import { isAxiosError } from 'axios';
import { Layout, Typography, Button, Space, message } from 'antd';
import service from '@/services';

export default function Home() {
  const handleClick = async () => {
    try {
      const res = await service.get('/api/hello');
      // message.info(res.data);
      message.open({
        icon: null,
        type: 'info',
        content: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Space align='center' direction='vertical'>
        <Typography.Title level={3}>메인페이지</Typography.Title>
        <Button type='primary' onClick={handleClick}>
          Hello
        </Button>
      </Space>
    </Layout>
  );
}
