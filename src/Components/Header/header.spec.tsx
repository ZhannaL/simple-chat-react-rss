import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('ChatBlock', () => {
  it('checked fn ', () => {
    const { queryByText } = render(<Header title='Chat' />);
    expect(queryByText(/Chat/i)).not.toBeNull();
    expect(queryByText(/Chat/i)).toBeInTheDocument();

    expect(queryByText(/Random/i)).toBeNull();
    expect(queryByText(/Random/i)).not.toBeInTheDocument();
  });
});
