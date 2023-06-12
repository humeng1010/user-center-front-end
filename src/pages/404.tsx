import {Button, Result} from 'antd';
import React from 'react';
import {history} from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={
      <p>
        Sorry, the page you visited does not exist.
        <br/>
        对不起您访问的页面不存在
      </p>
    }
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回到首页
      </Button>
    }
  />
);

export default NoFoundPage;
