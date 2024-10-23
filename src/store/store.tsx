
import { makeAutoObservable } from 'mobx';
import { authStore } from './auth';
import { userStore } from './user';
import axiosInstans from '../utils/axiosInstans';
import { AUTH, CONSTANTS } from '../constants';
import { pagesContentStore } from './pagesContent';
import { documentStore } from './document';
import axios from 'axios';
import {removeToken, saveToken} from '../utils/controlToken';
import { notificationStore } from './notification';


class Store {
  auth = authStore
  user = userStore
  pagesContent = pagesContentStore
  document = documentStore
  notification = notificationStore
  token = localStorage.getItem('token') || '';
  isAuth = Boolean(localStorage.getItem('token'))

  constructor() {
    makeAutoObservable(this);
  }
  getStore() {
    return JSON.parse(JSON.stringify(this)) // return this
  }
  setToken(token: string) {
    this.token = token
  }
  async login({ login, password }: { login: string, password: string }) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${AUTH.LOGIN}`, { login, password })
      .then((res) => {
        saveToken(res.data.token)
        this.isAuth = true
      })

  }

  async logout() {
    await axiosInstans.get(`${CONSTANTS.BASE_URL_API}${AUTH.LOGOUT}`)
      .then(() => {
        removeToken()
        this.token = ''
        this.user.data = {}
        this.document.clearState()
        this.user.clearState()
        this.isAuth = false
      }).catch((e) => console.log(e))
  }
}

export const store = new Store();