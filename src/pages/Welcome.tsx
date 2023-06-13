import {PageContainer} from '@ant-design/pro-components';
import {Alert, Card, Typography} from 'antd';
import React from 'react';


const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎访问用户中心，您可以查看和修改个人的信息'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用,点击浏览procomponents.ant.design开发文档
          </a>
        </Typography.Text>
        <pre/>
        <Typography.Text strong style={{fontSize: "20px"}}>
          该项目为用户中心模块,
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
export default Welcome;
