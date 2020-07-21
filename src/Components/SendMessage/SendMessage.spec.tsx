import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TestSocketProvider } from 'testUtils/testSocket';
import SendMessage from './SendMessage';
import { useSocket } from 'Websocket/Websocket';
import { Message } from 'Redusers/User/types';
import { Provider } from 'react-redux';
import { store } from 'Redusers/Store';

const TestComponent = () => {
  const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);
  useSocket((message) => {
    setMessages([...message]);
  });
  if (messages.length === 0) return null;
  return (
    <>
      {messages.map((el) => (
        <span key={el.id} data-testid='test-message'>
          {el.message}
        </span>
      ))}
    </>
  );
};

describe('SendMessage', () => {
  it('should exist span with message', () => {
    const { queryByTestId, getByPlaceholderText, getByLabelText } = render(
      <Provider store={store}>
        <TestSocketProvider>
          <TestComponent></TestComponent>
          <SendMessage></SendMessage>
        </TestSocketProvider>
      </Provider>
    );

    expect(queryByTestId('test-message')).toBeNull();

    const input = getByPlaceholderText('Enter your message here ...');
    fireEvent.change(input, { target: { textContent: 'hello, test!' } });

    const button = getByLabelText('send-button');
    fireEvent.click(button);

    expect(queryByTestId('test-message')).not.toBeNull();
  });
});
