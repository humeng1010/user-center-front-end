import React from 'react';
import {StarTwoTone, LikeOutlined, MessageFilled} from '@ant-design/icons';
import {List, Tag} from 'antd';
import ArticleListContent from '../ArticleListContent';
import type {ListItemDataType} from '../../data.d';
import styles from './index.less';

const Articles: React.FC = () => {
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({icon, text}) => (
    <span>
      {icon} {text}
    </span>
  );

  // 获取tab列表数据
  // const {data: listData} = useRequest(() => {
  //   return queryFakeList({
  //     count: 30,
  //   });
  // });
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      // dataSource={listData?.list || []}
      dataSource={[{
        id: "1",
        star: 100,
        owner: "root",
        title: "测试内容:由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        avatar: "http://wuluwulu.cn/upload/2023/04/IMG_9228.JPG",
        cover: "",
        content: "",
        status: "success",
        percent: 10,
        logo: "",
        href: "#",
        updatedAt: Date.now(),
        createdAt: Date.now(),
        subDescription: "由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        description: "测试数据",
        activeUser: 10,
        newUser: 5,
        like: 100,
        message: 10,
        members: []
      }, {
        id: "1",
        star: 100,
        owner: "root",
        title: "测试内容:由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        avatar: "http://wuluwulu.cn/upload/2023/04/IMG_9228.JPG",
        cover: "",
        content: "",
        status: "success",
        percent: 10,
        logo: "",
        href: "#",
        updatedAt: Date.now(),
        createdAt: Date.now(),
        subDescription: "由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        description: "测试数据",
        activeUser: 10,
        newUser: 5,
        like: 100,
        message: 10,
        members: []
      }, {
        id: "1",
        star: 100,
        owner: "root",
        title: "测试内容:由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        avatar: "http://wuluwulu.cn/upload/2023/04/IMG_9228.JPG",
        cover: "",
        content: "",
        status: "success",
        percent: 10,
        logo: "",
        href: "#",
        updatedAt: Date.now(),
        createdAt: Date.now(),
        subDescription: "由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        description: "测试数据",
        activeUser: 10,
        newUser: 5,
        like: 100,
        message: 10,
        members: []
      }, {
        id: "1",
        star: 100,
        owner: "root",
        title: "测试内容:由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        avatar: "http://wuluwulu.cn/upload/2023/04/IMG_9228.JPG",
        cover: "",
        content: "",
        status: "success",
        percent: 10,
        logo: "",
        href: "#",
        updatedAt: Date.now(),
        createdAt: Date.now(),
        subDescription: "由于该项目是单纯的用户中心模块，不涉及到其他内容，目的就是只需要开发一次就可以多次使用。该处可自己根据实际业务进行扩展用户相关的业务功能",
        description: "测试数据",
        activeUser: 10,
        newUser: 5,
        like: 100,
        message: 10,
        members: []
      },]}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" icon={<StarTwoTone/>} text={item.star}/>,
            <IconText key="like" icon={<LikeOutlined/>} text={item.like}/>,
            <IconText key="message" icon={<MessageFilled/>} text={item.message}/>,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>提示</Tag>
                <Tag>关于</Tag>
                <Tag>业务</Tag>
              </span>
            }
          />
          <ArticleListContent data={item}/>
        </List.Item>
      )}
    />
  );
};

export default Articles;
