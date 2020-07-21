import React, { ReactNode } from 'react';
import style from './wrapper.module.css';
import classnames from 'classnames';

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={classnames(className, style.wrapper)}>{children}</div>;
};

export default Wrapper;
