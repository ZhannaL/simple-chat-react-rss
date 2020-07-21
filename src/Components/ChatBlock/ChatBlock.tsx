import React, { useState, useLayoutEffect, useRef } from 'react';
import style from './chatBlock.module.css';
import Paper from '@material-ui/core/Paper';
import Wrapper from '../Wrapper/Wrapper';
import { useSocket, useSocketConnect } from 'Websocket/Websocket';
import { Message } from 'Redusers/User/types';

import 'styles/Image/favicon-new-message.png';
import 'styles/Image/favicon.png';
import notification from 'styles/Media/notification.wav';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  handleFavicon,
  handleTitle,
  handleNewMessageFavicon,
  handleNewMessageTitle,
  playSound,
  getShortTime,
  newMessagePush,
} from './ChatBlockHelpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },

    thumb: {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  })
);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    handleFavicon();
    handleTitle();
  }
});

const ChatBlock = () => {
  const classes = useStyles();

  const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);
  const [flagIsNew, setFlagIsNew] = useState(false);
  const notificationAudio = new Audio(notification);
  useSocket((message) => {
    // console.log('message', message);
    if (flagIsNew) {
      setMessages([...messages, ...message.reverse()]);
    } else {
      setMessages(message.reverse());
    }
    setFlagIsNew(true);

    if (document.visibilityState !== 'visible') {
      handleNewMessageFavicon();
      handleNewMessageTitle();
      if (message.length !== 0) {
        newMessagePush(message[0].from, message[0].message);
        playSound(notificationAudio);
      }
    }
  });

  useSocketConnect(() => {
    setFlagIsNew(false);
  });

  const ref = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  return (
    <Wrapper className={style.chatWrapper}>
      <Paper className={classnames(style.list, classes.thumb)} ref={ref}>
        {messages.map((el) => (
          <div key={el.id} className={style.messageBlock}>
            <p className={style.author}> {el.from}</p>
            <div className={style.message}>
              <p className={style.timeMessage}> {getShortTime(el.time)}</p>
              <Paper className={classnames(style.text, classes.text)}>
                {el.message}
              </Paper>
            </div>
          </div>
        ))}
      </Paper>
    </Wrapper>
  );
};

export default ChatBlock;
