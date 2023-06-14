import React from 'react';
import {List} from 'antd';
import {useModel} from "@@/plugin-model/useModel";

type Unpacked<T> = T extends (infer U)[] ? U : T;

// const passwordStrength = {
//   strong: <span className="strong">强</span>,
//   medium: <span className="medium">中</span>,
//   weak: <span className="weak">弱 Weak</span>,
// };

const SecurityView: React.FC = () => {
  const {initialState} = useModel('@@initialState')
  const {currentUser} = initialState || {}

  const getData = () => [
    // {
    //   title: '账户密码',
    //   description: (
    //     <>
    //       当前密码强度：
    //       {passwordStrength.medium}
    //     </>
    //   ),
    //   actions: [<a key="Modify">修改</a>],
    // },
    {
      title: '密保手机',
      description: `已绑定手机：${currentUser?.phone}`,
      // actions: [<a key="Modify">修改</a>],
    },
    {
      title: '备用邮箱',
      description: `已绑定邮箱：${currentUser?.email}`,
      // actions: [<a key="Modify">修改</a>],
    },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          // <List.Item actions={item.actions}>
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description}/>
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
