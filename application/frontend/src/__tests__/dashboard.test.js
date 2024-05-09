import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';
import Dashboard from '../components/pages/Dashboard';

describe('Dashboard', () => {
  test('renders Dashboard component without crashing', () => {
    render(
      <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
        <Dashboard />
      </AuthContext.Provider>
    );
  });
});