
// import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { CONSTANTS, NOTIFICATION, ROLES, USER } from '../constants';
import axios from '../utils/axiosInstans';
import { INotification, IRole, IUser } from '../types';
import { saveToken } from '../utils/controlToken';

class NotificationStore {
  notificationList: INotification[] = []
  totalCount: number = 0
  unReadCount: number = 0
  limit: number = 10
  page: number = 1

  constructor() {
    makeAutoObservable(this);
  }
  clearState() {
    this.notificationList = []
    this.totalCount = 0
    this.unReadCount = 0
    this.limit = 10
    this.page = 1
  }



  async getListNotification({ limit, page }: { limit?: number, page?: number }) {
    this.limit = limit ?? this.limit
    this.page = page ?? this.page
    const params = { limit: this.limit, page: this.page }
    await axios.get(`${CONSTANTS.BASE_URL_API}${NOTIFICATION.GET_LIST}`, { params })
      .then((res) => {
        saveToken(res.data.token)
        this.notificationList = res.data.data ?? [];
        this.totalCount = res?.data?.totalCount;
        this.unReadCount = res?.data?.unReadCount;
      }
      )
  }


  async notificationRead(notificationsIdList: string[]) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${NOTIFICATION.READ}`, { notificationsIdList })
      .then((res) => {
        saveToken(res.data.token)
      }
      )
  }
}

export const notificationStore = new NotificationStore();