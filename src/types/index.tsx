/////////////document
export interface IDocument {
    id: string;
    name: string;
    read: boolean;
    url: string;

}
export interface IDocumentList {
    sectionId: number;
    sectionName: string;
    documents?: IDocument[]
}
export interface IRoleIdList extends IDocument {
    roleIdList: string[]
}

export interface IDocumentListMatrix {
    sectionId: string;
    sectionName: string;
    documents: IRoleIdList[];
}

////////////pagesContent
export interface IContent {
    code?: number;
    name?: string;
}

export interface IPageContent {
    name?: string,
    code?: string,
    description?: string,
    pictureUrl?: string,
    videoUrl?: string
}

//////////user
export interface IUser {
    id?: number;
    email?: string;
    lastName?: string;
    name?: string;
}
export interface IRole {
    id: string;
    name: string;
    pictureUrl?: string;
}
export interface INotification {
    id: string,
    text: string,
    documentId: string,
    roleId: string,
    date: string,
    read: boolean,

}