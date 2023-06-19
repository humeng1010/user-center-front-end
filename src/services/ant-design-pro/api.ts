// @ts-ignore
/* eslint-disable */
import {request} from 'umi';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/out-login */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<string>>('/user/out-login', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 搜索用户 GET /api/user/search */
export async function searchUsers(params = {}, options?: { [key: string]: any }) {
  return request<API.BaseResponse<any>>('/user/search', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取服务器本地的用户头像 GET /api/common/download */
export async function getLocalServerUserAvatar(params = {}, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/common/download', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 根据ID更新用户信息 PUT /api/user/update */
export async function updateUserInfoById(data = {}, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/user/update', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 根据ID删除用户信息 DELETE /api/user/{id} */
export async function deleteUserInfoById(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>(`/user/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 根据ID禁用用户 PUT /api/user/{id} */
export async function changeUserStatusById(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>(`/user/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}


/** enableUserStatusById PUT /api/user/enable/{id} */
export async function enableUserStatusById(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>(`/user/enable/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/**  PUT /api/user/enable-admin/{id} */
export async function enableAdminRole(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>(`/user/enable-admin/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}
