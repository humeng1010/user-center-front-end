import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history, Link} from 'umi';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Register: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    // 校验密码
    const {userPassword, checkPassword} = values
    if (userPassword !== checkPassword) {
      message.error("两次输入的密码不一致");
      return
    }

    try {
      // 注册
      const userId = await register(values);
      if (userId.data) {
        const defaultRegisterSuccessMessage = '注册成功！3秒后跳转到登录页';
        message.success(defaultRegisterSuccessMessage, 3);
        setTimeout(() => {
          history.push('/user/login');
        }, 3000)
      } else {
        throw new Error(`register error id = ${userId.data}`)
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{searchConfig: {submitText: '注册'}}}
          logo={<img alt="logo" src="/logo.ico"/>}
          title="User Center Register Module"
          subTitle={'用户中心注册模块'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'输入账户和密码进行注册'}/>
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的账户和密码'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入您的账户,不小于4位，且不含特殊字符'}
                rules={[
                  {
                    required: true,
                    message: '账户是必填项！',
                  },
                  {
                    min: 4,
                    type: "string",
                    message: '密码长度不能少于4位'
                  },
                  {
                    pattern: new RegExp("^[a-zA-z]\\w{3,15}$"),
                    message: '字母、数字、下划线组成，字母开头，4-16位'
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能少于8位'
                  }
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能少于8位'
                  }
                ]}
              />
            </>
          )}

          <Link
            style={{
              float: 'right',
              marginBottom: 24,

            }}
            to={"/user/login"}
            rel="noreferrer"
          >
            已有账户? 去登录
          </Link>

        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
