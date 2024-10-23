import axios from '../utils/axiosInstans';
import { makeAutoObservable } from 'mobx';
import { CONSTANTS, CONTENT } from '../constants';
import { saveToken } from '../utils/controlToken';
import { IContent, IPageContent } from '../types';


class PagesContentStore {
  listPages: IContent[] = []
  pageContent: IPageContent = {}

  constructor() {
    makeAutoObservable(this);
  }
  clearState() {
    this.listPages = []
    this.pageContent = {}
  }


  async getPages() {
    await axios.get(`${CONSTANTS.BASE_URL_API}${CONTENT.PAGES}`)
      .then((res) => {
        this.listPages = res.data.data
        saveToken(res.data.token)
      })
  }

  async getPageContent({ pageCode }: { pageCode: string }) {
    await axios.get(`${CONSTANTS.BASE_URL_API}${CONTENT.PAGE_CODE.replace('{pageCode}', pageCode)}`)
      .then((res) => {
        this.pageContent = res.data
        saveToken(res.data.token)
      })
  }

}

export const pagesContentStore = new PagesContentStore();