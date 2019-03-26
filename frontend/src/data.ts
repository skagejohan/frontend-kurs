import { getRemoteData, StatusChangeHandler } from './remoteData';

export interface User {
  id: number;
  full_name: string;
  company: string;
}

export const get = (onChange: StatusChangeHandler<User[]>) =>
  getRemoteData('http://localhost:3001/users', onChange);
