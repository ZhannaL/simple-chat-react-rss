import React from 'react';
import style from './header.module.css';
import Typography from '@material-ui/core/Typography';

const Header = ({ title }: { title: string }) => {
  return (
    <header className={style.logo}>
      <Typography color='primary' variant='h1' gutterBottom>
        {title}
      </Typography>
    </header>
  );
};

export default Header;
