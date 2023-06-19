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
        <Typography.Text strong style={{fontSize: "18px"}}>
          该项目为用户中心模块,该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。
          可自己根据实际业务进行扩展用户相关的业务功能。
        </Typography.Text>
        <Typography.Text>
          <h4>前端</h4>
          <p>主要运用阿里 Ant Design 生态：</p>
          <ul>
            <li>HTML + CSS + Javascript 三件套</li>
            <li>React 开发框架</li>
            <li>Ant Design Pro 项目模板</li>
            <li>Ant Design 端组件库</li>
            <li>Umi开发框架</li>
            <li>Umi Request 请求库</li>
          </ul>
          <h4>后端</h4>
          <ul>
            <li>Java 编程语言</li>
            <li>Spring + SpringVVC + SpringBoot 框架</li>
            <li>MyBatis + MyBatis Plus 数据访问框架</li>
            <li>MvSQL 数据库</li>
            <li>JUnit 单元测试库</li>
            <li>Sa-Token 轻量级安全框架</li>
          </ul>

        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
export default Welcome;
