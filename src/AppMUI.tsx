import React from 'react';
import style from './AppMUI.module.css';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Header,
  SendMessage,
  UserPanel,
  SettingsBlock,
  SettingsMobile,
  ChatBlock,
} from './Components';
import { WebSocketProvider } from 'Websocket/Websocket';
import { useTheme } from 'styles/mui-theme';
import { useWindowSize } from 'hooks/WindowSizeContext';

const AppMUI = () => {
  const theme = useTheme();
  const windowSize = useWindowSize();
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebSocketProvider>
          <div className={style.App}>
            <Header title='Chat'></Header>
            <UserPanel></UserPanel>
            <ChatBlock></ChatBlock>
            {windowSize.width <= 960 ? (
              <SettingsMobile></SettingsMobile>
            ) : (
              <SettingsBlock></SettingsBlock>
            )}

            <SendMessage></SendMessage>
          </div>
        </WebSocketProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default AppMUI;
