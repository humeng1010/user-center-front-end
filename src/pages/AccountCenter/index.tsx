import {ContactsOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons';
import {Card, Col, Divider, Row} from 'antd';
import React, {useState} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {useRequest} from 'umi';
import type {RouteChildrenProps} from 'react-router';

import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';

import {currentUser as queryCurrent} from '@/services/ant-design-pro/api'

import styles from './Center.less';
import type {tabKeyType} from "@/pages/AccountCenter/data";

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{fontSize: 14}}>(?)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{fontSize: 14}}>(?)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{fontSize: 14}}>(?)</span>
      </span>
    ),
  },
];

// const TagList: React.FC<{ tags: API.CurrentUser['tags'] }> = ({tags}) => {
//   const ref = useRef<Input | null>(null);
//   const [newTags, setNewTags] = useState<TagType[]>([]);
//   const [inputVisible, setInputVisible] = useState<boolean>(false);
//   const [inputValue, setInputValue] = useState<string>('');
//
//   const showInput = () => {
//     setInputVisible(true);
//     if (ref.current) {
//       // eslint-disable-next-line no-unused-expressions
//       ref.current?.focus();
//     }
//   };
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };
//
//   const handleInputConfirm = () => {
//     let tempsTags = [...newTags];
//     if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
//       tempsTags = [...tempsTags, {key: `new-${tempsTags.length}`, label: inputValue}];
//     }
//     setNewTags(tempsTags);
//     setInputVisible(false);
//     setInputValue('');
//   };
//
//   return (
//     <div className={styles.tags}>
//       <div className={styles.tagsTitle}>标签</div>
//       {(tags || []).concat(newTags).map((item) => (
//         <Tag key={item.key}>{item.label}</Tag>
//       ))}
//       {inputVisible && (
//         <Input
//           ref={ref}
//           type="text"
//           size="small"
//           style={{width: 78}}
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputConfirm}
//           onPressEnter={handleInputConfirm}
//         />
//       )}
//       {!inputVisible && (
//         <Tag onClick={showInput} style={{borderStyle: 'dashed'}}>
//           <PlusOutlined/>
//         </Tag>
//       )}
//     </div>
//   );
// };

const AccountCenter: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('articles');

  //  获取用户信息
  const {data: currentUser, loading} = useRequest(() => {
    return queryCurrent();
  });

  //  渲染用户信息
  const renderUserInfo = ({username, gender, phone}: Partial<API.CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {username}
        </p>
        <p>
          <UserOutlined
            style={{
              marginRight: 8,
            }}
          />
          {gender === 1 ? '男' : '女'}
        </p>
        <p>
          <PhoneOutlined
            style={{
              marginRight: 8,
            }}
          />
          {phone}
        </p>
      </div>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'projects') {
      return <Projects/>;
    }
    if (tabValue === 'applications') {
      return <Applications/>;
    }
    if (tabValue === 'articles') {
      return <Articles/>;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{marginBottom: 24}} loading={loading}>
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatarUrl}/>
                  <div className={styles.name}>{currentUser.username}</div>
                  <div>{currentUser?.email}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed/>
                {/*<TagList tags={currentUser.tags || []}/>*/}
                <Divider style={{marginTop: 16}} dashed/>
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  {/*<Row gutter={36}>*/}
                  {/*  /!*notice是团队 类型 对象数组*!/*/}
                  {/*  {currentUser.notice &&*/}
                  {/*    currentUser.notice.map((item) => (*/}
                  {/*      <Col key={item.id} lg={24} xl={12}>*/}
                  {/*        <Link to={item.href}>*/}
                  {/*          <Avatar size="small" src={item.logo}/>*/}
                  {/*          /!*成员*!/*/}
                  {/*          {item.member}*/}
                  {/*        </Link>*/}
                  {/*      </Col>*/}
                  {/*    ))}*/}
                  {/*</Row>*/}
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default AccountCenter;
