import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Registration from '../components/pages/Registration';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useAuthContext', () => ({
  useAuthContext: () => ({
    dispatch: jest.fn(),
  }),
}));

describe('Registration Component', () => {
  it('renders without crashing', () => {
    useNavigate.mockReturnValue(jest.fn());
    render(<Registration />);
  });
});