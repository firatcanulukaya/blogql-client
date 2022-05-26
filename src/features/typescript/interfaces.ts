export interface IPost {
    title: string;
    id: string;
}

export interface IUser {
    username: string;
    id: string;
    posts: IPost[];
}