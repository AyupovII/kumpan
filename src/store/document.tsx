
import axios from '../utils/axiosInstans';
import { makeAutoObservable } from 'mobx';
import { CONSTANTS, DOCUMENT } from '../constants';
import { IDocumentList, IDocumentListMatrix } from '../types';
import { saveToken } from '../utils/controlToken';


class DocumentStore {
  documentList: IDocumentList[] = []
  documentListMatrix?: IDocumentListMatrix[] = []
  token: string = localStorage.getItem('token') || '';

  constructor() {
    makeAutoObservable(this);
  }
  get getDocumentListMatrix() {
    return this.documentListMatrix
  }
  get listChapter() {
    return this.documentListMatrix?.map((doc) => {
      return { value: doc.sectionId, label: doc.sectionName }
    })
  }

  clearState() {
    this.documentList = []
    this.documentListMatrix = []
  }

  async getList({ roleId }: { roleId: string }) {
    await axios.get(`${CONSTANTS.BASE_URL_API}${DOCUMENT.GET_LIST.replace('{roleId}', `${roleId}`)}`)
      .then((res) => {
        this.documentList = res.data.data;
        saveToken(res.data.token)
      })
      .catch((err) => console.log(err))
  }

  async getListMatrix() {
    await axios.get(`${CONSTANTS.BASE_URL_API}${DOCUMENT.GET_LIST_MATRIX}`)
      .then((res) => {
        this.documentListMatrix = res.data.data
        saveToken(res.data.token)
      }).catch((err) => console.log(err))
  }

  async addDocument({ name, idSection, file }: { name: string, idSection: string, file: File }) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${DOCUMENT.ADD}`, {
      name,
      idSection,
      file
    })
      .then((res) => saveToken(res.data.token))
      .catch((err) => console.log(err))
  }

  async checkToRead(id: string, last?: boolean) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${DOCUMENT.READ}`, {
      id, last
    })
      .then((res) => saveToken(res.data.token))
      .catch((err) => console.log(err))
  }

  // UPDATE_ROLE
  async updateRoleDocument(id: string, roleId: string) {
    await axios.post(`${CONSTANTS.BASE_URL_API}${DOCUMENT.UPDATE_ROLE}`, {
      id,
      roleId
    })
      .then((res) => saveToken(res.data.token))
      .catch((err) => console.log(err))
  }
}

export const documentStore = new DocumentStore();