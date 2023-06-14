import React from 'react';
import {message} from 'antd';
import ProForm, {ProFormSelect, ProFormText,} from '@ant-design/pro-form';

import styles from './BaseView.less';
import {useModel} from "@@/plugin-model/useModel";
import UploadAvatar from "@/pages/AccountSettings/components/UploadAvatar";


// 头像组件 方便以后独立，增加裁剪之类的功能
// const AvatarView = ({avatar}: { avatar: string }) => (
//   <>
//     <div className={styles.avatar_title}>头像</div>
//     <div className={styles.avatar}>
//       <img src={avatar} alt="avatar"/>
//     </div>
//     {/*TODO 头像上传*/}
//     <Upload showUploadList={false}>
//       <div className={styles.button_view}>
//         <Button>
//           <UploadOutlined/>
//           更换头像
//         </Button>
//       </div>
//     </Upload>
//   </>
// );

const BaseView: React.FC = () => {
  //  获取用户信息
  const {initialState, loading} = useModel('@@initialState');
  const {currentUser} = initialState || {}

  // 提交方法
  const handleFinish = async (values: API.CurrentUser) => {
    console.log(values)
    // TODO 请求后端修改信息
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {!loading && currentUser && (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...currentUser,
                gender: currentUser.gender === 1 ? '男' : '女'
              }}
            >

              <ProFormText
                width="md"
                name="username"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormSelect
                width="md"
                name="gender"
                label="性别"
                placeholder={"请选择您的性别"}
                rules={[
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                ]}
                valueEnum={{
                  0: "女",
                  1: "男"
                }}
              />

              <ProFormText
                width={"md"}
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  {
                    pattern: new RegExp("^1[3456789]\\d{9}$"),
                    message: '联系电话格式不正确'
                  }
                ]}
              />
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />

            </ProForm>
          </div>
          <div className={styles.right}>
            <UploadAvatar/>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
