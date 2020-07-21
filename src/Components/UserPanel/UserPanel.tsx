import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../Redusers/rootReducer';

import UserPanelInner from './UserPanelInner';

const UserPanel = () => {
  const user = useSelector((state: State) => state.user);
  if (!user) return null;
  return <UserPanelInner user={user}></UserPanelInner>;
};

export default UserPanel;
