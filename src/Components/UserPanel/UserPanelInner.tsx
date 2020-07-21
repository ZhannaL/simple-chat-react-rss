import React, { useState } from 'react';
import style from './userPanel.module.css';
import Wrapper from '../Wrapper/Wrapper';
import { TextField, Button, Paper } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { User } from '../../Redusers/User/types';
import { useUpdateUser } from '../../Redusers/User/userActions';

const UserPanelInner = ({ user }: { user: User }) => {
  const [userName, setUserName] = useState(user.name);
  const updateUser = useUpdateUser();
  return (
    <Wrapper className={style.usersWrapper}>
      <Paper className={style.list}>
        <TextField
          className={style.input}
          type='text'
          value={userName}
          placeholder='username'
          onChange={(event) => setUserName(event.target.value)}
        />
        <Button
          aria-label='update-name'
          disabled={userName.length === 0}
          onClick={() => updateUser(userName)}
          className={style.buttonUpdate}
          variant='contained'
          color='primary'
          size='small'
          startIcon={<SaveIcon />}
        >
          Update
        </Button>
      </Paper>
    </Wrapper>
  );
};

export default UserPanelInner;
