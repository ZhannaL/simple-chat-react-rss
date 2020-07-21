import React from 'react';
import style from './emoji.module.css';
import {
  IconButton,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { emoji } from './emoji';

const Emoji = ({
  onEmojiSelected,
}: {
  onEmojiSelected: (emoji: string) => unknown;
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} color='primary' onClick={handleToggle}>
        <InsertEmoticonIcon></InsertEmoticonIcon>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement='top'
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id='menu-list-grow'
              classes={{
                root: style.menulist,
              }}
            >
              {emoji.map((el) => (
                <MenuItem
                  className={style.item}
                  key={el}
                  onClick={() => onEmojiSelected(el)}
                >
                  {el}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default Emoji;
