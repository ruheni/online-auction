import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

import { LoginForm } from './form';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn().mockReturnValue('/'), // Provide the desired callback URL mock value here
  })),
}));

describe('LoginForm', () => {
  it('should enter username and password and click on login button', async () => {
    render(<LoginForm />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/Email/), 'shadcn@gmail.com');
    await userEvent.type(screen.getByLabelText(/Password/), 'shadcn');
    expect(loginButton).toBeEnabled();
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'shadcn@gmail.com',
        password: 'shadcn',
        redirect: true,
        callbackUrl: '/',
      });
    });
  });
});
