import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { store } from 'Redusers/Store';
import { UserPanel } from 'Components/UserPanel';
import { rtlRender } from 'testUtils/testProvider';
import { State } from 'Redusers/rootReducer';

const TestComponentUserName = () => {
  const user = useSelector((state: State) => state.user);
  if (!user) return null;
  return <span data-testid='test-userName'>{user.name}</span>;
};

describe('UserPanel', () => {
  it('should change user name in redux ', () => {
    const { getByTestId, getByPlaceholderText, getByLabelText } = rtlRender(
      <Provider store={store}>
        <TestComponentUserName></TestComponentUserName>
        <UserPanel></UserPanel>
      </Provider>
    );

    expect(getByTestId('test-userName').innerHTML).toBe('guest');

    const input = getByPlaceholderText('username');
    fireEvent.change(input, { target: { value: 'myNewName' } });

    const button = getByLabelText('update-name');
    fireEvent.click(button);

    expect(getByTestId('test-userName').innerHTML).toBe('myNewName');
  });
});
