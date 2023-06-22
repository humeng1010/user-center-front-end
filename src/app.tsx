import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import {LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import type {RequestConfig} from "@@/plugin-request/request";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
// 白名单 不需要登陆的路径
const WHITE_LIST = [registerPath, loginPath]
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * 全局请求前缀
 */
export const request: RequestConfig = {
  timeout: 5000,
  prefix: "/api"
  // prefix: process.env.NODE_ENV === 'production' ? 'http://wuluwulu.cn:8081/api' : '/api'
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.BaseResponse<API.CurrentUser> | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录或者注册页，则不需要获取当前登陆的用户
  if (WHITE_LIST.includes(history.location.pathname)) {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    }
  }
  // 如果不是登录页面，执行 再次检查登录状态
  if (history.location.pathname !== loginPath) {
    try {
      const {data: currentUser, code} = await queryCurrentUser()
      if (code === 40100) {
        // 未登录的状态码
        history.push(loginPath);
      }

      const avatarUrl = currentUser?.avatarUrl
      // 如果不是是互联网上的图片需要处理读取数据库获取
      if (!(avatarUrl?.startsWith('http://') || avatarUrl?.startsWith('https://'))) {
        // 否则调用后端接口获取服务器上的图片
        // 首先处理路径获取文件名
        // const temp = avatarUrl?.lastIndexOf("/")
        // @ts-ignore
        // const filename = avatarUrl?.slice(temp + 1)
        const afterHandlerUser = {...currentUser, avatarUrl: `/api/common/download?name=${avatarUrl}`}

        return {
          fetchUserInfo,
          currentUser: afterHandlerUser,
          settings: defaultSettings,
        }
      }

      return {
        fetchUserInfo,
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push(loginPath);
    }

  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;

      if (WHITE_LIST.includes(location.pathname)) {
        return
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        // eslint-disable-next-line react/jsx-key
        <a href={"https://github.com/humeng1010/user-center-front-end"} target="_blank" rel="noreferrer">
          <LinkOutlined/>
          <span>GitHub仓库</span>
        </a>,

      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme={true}
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
