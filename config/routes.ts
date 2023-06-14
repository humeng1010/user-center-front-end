export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: '注册',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'HomeOutlined',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        component: './Admin/UserManage',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    name: '个人中心设置',
    icon: 'user',
    routes: [
      {
        name: '个人中心',
        path: '/account/accountcenter',
        component: './AccountCenter',
      },
      {
        name: '个人设置',
        path: '/account/accountsettings',
        component: './AccountSettings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
