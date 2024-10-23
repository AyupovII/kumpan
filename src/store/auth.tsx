
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { AUTH, CONSTANTS } from '../constants';

class AuthStore {

  constructor() {
    makeAutoObservable(this);
  }
  
  async recoveryPasswordStep1(email: string) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${AUTH.RECOVERY_PASSWORD_STEP_1}`, {
      email
    })
  }

  async recoveryPasswordStep2(userId: string, passwordRecoveryCode: string) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${AUTH.RECOVERY_PASSWORD_STEP_2}`, {
      userId, passwordRecoveryCode
    })
  }

  async recoveryPasswordStep3(userId: string, passwordRecoveryCode: string, password: string) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${AUTH.RECOVERY_PASSWORD_STEP_3}`, {
      userId, passwordRecoveryCode, password
    })
  }
}

export const authStore = new AuthStore();