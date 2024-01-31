import axios, { AxiosResponse } from 'axios';
import { IUser } from './IUser';

export default class PostService {
  static async indexPost(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
  static async authUserPost(
    username: string,
    password: string,
  ): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users', {
      params: {
        username: username,
        website: password,
      },
    });
  }
}
