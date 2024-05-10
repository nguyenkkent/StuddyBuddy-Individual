import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/pages/Login';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../hooks/useAuthContext', () => ({
    useAuthContext: () => ({
      dispatch: jest.fn(),
    }),
  }));

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });
});