import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';  // Update the import path as necessary
import axiosClient from '../../axiosClient';  // Update the import path as necessary
import { useAuthContext } from '../../hooks/useAuthContext';  // Update the import path as necessary

// Mocking modules and hooks
jest.mock('../../axiosClient');
jest.mock('../../hooks/useAuthContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));

describe('Login Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('handles successful login', async () => {
        const mockDispatch = jest.fn();
        useAuthContext.mockImplementation(() => ({
            dispatch: mockDispatch
        }));
        axiosClient.post.mockResolvedValue({
            status: 200,
            data: { user: 'testUser' }
        });
        const utils = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = utils.getByLabelText('Email');
        const passwordInput = utils.getByLabelText('Password');
        const form = utils.getByRole('form');

        // Fill out the form
        userEvent.type(emailInput, 'user@example.com');
        userEvent.type(passwordInput, 'password');

        // Mock localStorage and sessionStorage
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn(() => "/targetRoute");
        Storage.prototype.removeItem = jest.fn();

        // Submit the form
        fireEvent.submit(form);

        await waitFor(() => {
            expect(axiosClient.post).toHaveBeenCalledWith('/api/login', {
                email: 'user@example.com',
                password: 'password'
            });
            expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ user: 'testUser' }));
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN', payload: { user: 'testUser' } });
            expect(sessionStorage.removeItem).toHaveBeenCalledWith("redirectTo");
        });
    });

    it('handles login failure', async () => {
        axiosClient.post.mockRejectedValue(new Error('Login failed'));

        const utils = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const form = utils.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith('Login failed');
        });
    });
});
