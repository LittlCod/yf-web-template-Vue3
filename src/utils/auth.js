import Cookies from 'js-cookie';
import pinia from '../store';
import { useUser } from '../store/modules/user.js';

const TokenKey = 'loginToken';
const TenantKey = 'userTenant';

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

