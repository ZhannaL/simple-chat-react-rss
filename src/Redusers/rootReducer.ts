import { combineReducers, StateFromReducersMapObject } from 'redux';
import { userReducer } from './User/userReducer';
import { settingReducer } from './Settings/settingsReducer';

const reducers = {
  user: userReducer,
  setting: settingReducer,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = combinedReducer;
export type State = StateFromReducersMapObject<typeof reducers>;
