export const enum CONSTANTS {
  BASE_URL_API = 'https://edu.kumpan.ru/api',
}
export const enum AUTH {
  LOGIN = '/auth/login',
  RECOVERY_PASSWORD_STEP_1 = '/auth/recovery-pass-start',
  RECOVERY_PASSWORD_STEP_2 = '/auth/recovery-pass-check-code',
  RECOVERY_PASSWORD_STEP_3 = '/auth/recovery-pass-finish',
  LOGOUT = '/auth/logout',
}
export const enum USER {
  INFO = '/user',
  ROLE = '/user/role',
  ROLE_LIST = '/user/role-list',
  ADD_ROLE = '/user/add-role',
  ROLE_DETAIL = '/user/role-detail/{roleId}',
}
export const enum DOCUMENT {
  GET_LIST = '/document/get-list/{roleId}',
  GET_LIST_MATRIX = '/document/get-list-matrix/',
  ADD = '/document/add',
  READ = '/document/read',
  UPDATE_ROLE = '/document/update-role',
}
export const enum CONTENT {
  PAGES = '/content/pages',
  PAGE_CODE = '/content/page/{pageCode}',
}

export const enum ROLES {
  ADMIN = "1",
}

export const enum BASE_URL {
  BASE = "https://edu.kumpan.ru",
}

export const enum NOTIFICATION {
  GET_LIST = '/notification/get-list',
  READ = '/notification/read',

}