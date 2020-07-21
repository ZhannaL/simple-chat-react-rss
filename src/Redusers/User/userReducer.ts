import { UPDATE_USER } from './userActions';

type UserState = { name: string };

let user = localStorage.getItem('user');
let defaultName = user ? JSON.parse(user).name : 'guest';

const defaultUserState = { name: defaultName };

export const userReducer = (
  state: UserState = defaultUserState,
  action: any
): UserState => {
  switch (action.type) {
    case UPDATE_USER:
      if (!state) return state;
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
};
