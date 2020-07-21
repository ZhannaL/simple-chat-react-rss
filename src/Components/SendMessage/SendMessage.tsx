import React, { useRef, useContext, useState } from 'react';
import { WebSocketContext } from '../../Websocket/Websocket';
import style from './sendMessage.module.css';
import { TextField, IconButton, Paper, Snackbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Wrapper from '../Wrapper/Wrapper';
import { useSelector } from 'react-redux';
import { State } from 'Redusers/rootReducer';
import { Emoji } from 'Components/Emoji';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    underline: {
      '&&&:before': {
        borderBottom: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
    },

    snackbar: {
      backgroundColor: theme.palette.background.paper,
    },
    message: {
      color: theme.palette.getContrastText(theme.palette.background.paper),
      fontWeight: 'bold',
    },
    action: {
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
  })
);

const SendMessage = () => {
  const socket = useContext(WebSocketContext);
  const user = useSelector((state: State) => state.user);
  const [currentMessage, setCurrentMessage] = useState('');

  const ref = useRef<HTMLDivElement>();
  const classes = useStyles();
  return (
    <Wrapper className={style.sendingWrapper}>
      <Paper className={style.sendingBlock}>
        <TextField
          disabled={!socket}
          inputRef={ref}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (!event.shiftKey && currentMessage.length !== 0) {
                socket?.send(
                  JSON.stringify({
                    from: user.name,
                    message: currentMessage,
                  })
                );
                setCurrentMessage('');
              }
            }
          }}
          className={style.input}
          multiline
          rowsMax={4}
          type='text'
          placeholder={
            !socket ? 'server is not available' : 'Enter your message here ...'
          }
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
        />
        <Emoji
          onEmojiSelected={(emoji) => {
            setCurrentMessage(currentMessage.concat(emoji));
          }}
        ></Emoji>
        <IconButton
          aria-label='send-button'
          disabled={currentMessage.length === 0}
          color='primary'
          onClick={() => {
            socket?.send(
              JSON.stringify({
                from: user.name,
                message: currentMessage,
              })
            );

            setCurrentMessage('');
            ref.current?.focus();
          }}
          className={style.buttonSend}
        >
          <SendIcon></SendIcon>
        </IconButton>
      </Paper>

      <Snackbar
        ContentProps={{
          classes: {
            root: classes.snackbar,
            message: classes.message,
            action: classes.action,
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={'Server is not available'}
        open={!socket}
        autoHideDuration={3000}
      />
    </Wrapper>
  );
};

export default SendMessage;
