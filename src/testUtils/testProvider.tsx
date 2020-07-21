import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { store } from 'Redusers/Store';
import { rootReducer, State } from 'Redusers/rootReducer';

const reducerInitialState: State = {
  user: { name: 'guest' },
  setting: { theme: 'light', color: '#0084ff' },
};

const rtlRender = (
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState),
  }: { initialState: State; store: ReturnType<typeof createStore> } = {
    initialState: reducerInitialState,
    store: createStore(rootReducer, reducerInitialState),
  }
) => {
  const Wrapper = ({ children }: { children?: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(ui, { wrapper: Wrapper });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { rtlRender };
