import Cookies from 'js-cookie';
import pinia from '../store';
import { useUser } from '../store/modules/user.js';

const TokenKey = 'loginToken';
const TenantKey = 'userTenant';
const PassWordKey = 'Password';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  useUser(pinia).$reset();
  return Cookies.remove(TokenKey);
}

export function getTenant() {
  return Cookies.get(TenantKey);
}

export function setTenant(token) {
  return Cookies.set(TenantKey, token);
}

export function removeTenant() {
  return Cookies.remove(TenantKey);
}

export function getPassword() {
  return Cookies.get(PassWordKey);
}

export function setPassword(data) {
  // cookie保存一年，根据需求修改
  return Cookies.set(PassWordKey, data, { expires: 365 });
}

export function removePassword() {
  return Cookies.remove(PassWordKey);
}