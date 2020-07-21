import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'Redusers/Store';
import AppMUI from 'AppMUI';
import { WindowSizeContextProvider } from 'hooks/WindowSizeContext';

const App = () => {
  return (
    <Provider store={store}>
      <WindowSizeContextProvider>
        <AppMUI></AppMUI>
      </WindowSizeContextProvider>
    </Provider>
  );
};

export default App;
