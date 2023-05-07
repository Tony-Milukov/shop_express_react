import IUser from './userInfoRequest';

export default interface IUsersAdmin {
  count: number,
  rows: IUser[]
}
