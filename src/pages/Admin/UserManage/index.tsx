import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {Button, Image, message} from 'antd';
import {
  changeUserStatusById,
  deleteUserInfoById, enableAdminRole,
  enableUserStatusById,
  searchUsers
} from "@/services/ant-design-pro/api";


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '昵称',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => {
      let avatar = record.avatarUrl
      // 如果头像路径不是http:// 或者https:// 开头的，则需要处理
      if (!(avatar?.startsWith('http://') || avatar?.startsWith('https://'))) {
        // avatar = avatar?.slice(avatar?.lastIndexOf('/') + 1)
        avatar = `/api/common/download?name=${avatar}`
      }
      return <Image src={avatar} width={80} style={{borderRadius: "50%"}}/>
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      1: {
        text: '男',
      },
      0: {
        text: '女',
      },
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Success',
      },
      1: {
        text: '禁用',
        status: 'Error',
      },
    }

  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Default',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },

    }

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'showTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => {

      return [
        <Button type={'primary'} danger={true} size={'small'} disabled={record.userRole === 1}
                key="delete"
                onClick={async () => {
                  if (confirm("确认要删除吗？")) {
                    const res = await deleteUserInfoById(record.id as number)
                    if (res.code === 200) {
                      message.success(res.message, 2);
                      action?.reload(true)
                    } else {
                      message.error(res.message, 2)
                    }
                  }

                }}
        >
          删除
        </Button>,
        <Button type={'primary'} danger={true} size={'small'} disabled={record.userRole === 1}
                key="status"
                onClick={async () => {
                  if (confirm("确认要禁用该用户吗？")) {
                    const res = await changeUserStatusById(record.id as number)
                    if (res.code === 200) {
                      message.success(res.message, 2);
                      action?.reload()
                    } else {
                      message.error(res.message, 2)
                    }
                  }

                }}
        >
          禁用
        </Button>,
        <Button type={'primary'} size={'small'} disabled={record.userRole === 1}
                key="status"
                onClick={async () => {
                  if (confirm("确认要启用该用户吗？")) {
                    const res = await enableUserStatusById(record.id as number)
                    if (res.code === 200) {
                      message.success(res.message, 2);
                      action?.reload()
                    } else {
                      message.error(res.message, 2)
                    }
                  }

                }}
        >
          启用
        </Button>,
        <Button type={'primary'} size={'small'} disabled={record.userRole === 1}
                key="admin"
                onClick={async () => {
                  if (confirm("确认要给该用户授权管理员吗？")) {
                    const res = await enableAdminRole(record.id as number)
                    if (res.code === 200) {
                      message.success(res.message, 2);
                      action?.reload()
                    } else {
                      message.error(res.message, 2)
                    }
                  }

                }}
        >
          授权管理员
        </Button>,

      ]
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers(params);
        return {
          data: userList.data.records,
          total: userList.data.total,
          success: userList.code === 200
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户管理"

    />
  );
};
