import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TestSocketProvider } from 'testUtils/testSocket';
import { Provider } from 'react-redux';
import { store } from 'Redusers/Store';
import { SendMessage } from 'Components/SendMessage';
import { ChatBlock } from 'Components/ChatBlock';
import { getShortTime } from './ChatBlockHelpers';

const time = new Date('October 1, 1992 23:15:30').getTime();

describe('ChatBlock', () => {
  it('Should get short time (hours and minuts)', () => {
    expect(getShortTime(time)).toBe('23:15');
  });

  it('should exist new message ', () => {
    const { queryByText, getByPlaceholderText, getByLabelText } = render(
      <Provider store={store}>
        <TestSocketProvider>
          <ChatBlock></ChatBlock>
          <SendMessage></SendMessage>
        </TestSocketProvider>
      </Provider>
    );

    const input = getByPlaceholderText('Enter your message here ...');
    fireEvent.change(input, { target: { textContent: 'hello, test!' } });
    const button = getByLabelText('send-button');
    fireEvent.click(button);

    expect(queryByText('hello, test!')).toBeInTheDocument();
  });
});
