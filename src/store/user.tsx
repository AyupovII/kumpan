
// import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { CONSTANTS, NOTIFICATION, ROLES, USER } from '../constants';
import axios from '../utils/axiosInstans';
import { INotification, IRole, IUser } from '../types';
import { saveToken } from '../utils/controlToken';

class UserStore {
  data: IUser = {}
  roles: IRole[] = []
  rolesList: IRole[] = []
  isAdmin: boolean = false
  token: string = localStorage.getItem('token') || '';

  constructor() {
    makeAutoObservable(this);
  }
  clearState() {
    this.data = {}
    this.roles = []
    this.rolesList = []
    this.isAdmin = false
  }

  async getUser() {
    await axios.get(`${CONSTANTS.BASE_URL_API}${USER.INFO}`)
      .then((res) => {
        this.data = res.data.data
        saveToken(res.data.token)
      })
  }

  async getRoles() {
    await axios.get(`${CONSTANTS.BASE_URL_API}${USER.ROLE}`).then((res) => {
      this.roles = res.data.data
      saveToken(res.data.token)
    }).then(() => {
      if (this.roles.find((role) => role.id === ROLES.ADMIN)) {
        this.isAdmin = true
      }
      else {
        this.isAdmin = false
      }
    })
  }

  async getRolesAll() {
    await axios.get(`${CONSTANTS.BASE_URL_API}${USER.ROLE_LIST}`).then((res) => {
      this.rolesList = res.data.data;
      saveToken(res.data.token)
    })
  }

  async getRoleDetail(roleId: string) {
    const { data: { data } } = await axios.get(`${CONSTANTS.BASE_URL_API}${USER.ROLE_DETAIL.replace('{roleId}', roleId)}`)
      .then((res) => {
        saveToken(res.data.token)
        return res
      })
    return data
  }

  async addRole(name: string, file: File) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${USER.ADD_ROLE}`,
      { name, file }).then((res) => saveToken(res.data.token))
  }

}

export const userStore = new UserStore();