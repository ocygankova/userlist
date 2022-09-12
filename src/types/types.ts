export interface IUser {
  id: number;
  name: string;
  username: string;
}

export interface IUserAlbum {
  id: number;
  title: string;
}

export interface IUserPost {
  id: number;
  title: string;
  body: string;
}

export interface IUserTodo {
  id: number;
  title: string;
  completed: boolean;
}
