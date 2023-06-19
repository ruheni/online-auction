import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DepositForm } from './form';

describe('Deposit Form', () => {
  it('should enter amount and click on deposit button', async () => {
    render(<DepositForm />);
    const depositButton = screen.getByRole('button', { name: 'Deposit' });
    expect(depositButton).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/Amount/), '234.23');

    const mockDepositHandler = jest.fn();

    depositButton.addEventListener('click', mockDepositHandler);

    await userEvent.click(depositButton);

    expect(mockDepositHandler).toHaveBeenCalledTimes(1);

    //...
  });

  it('displays error message when amount is 0', async () => {
    render(<DepositForm />);
    const depositButton = screen.getByRole('button', { name: 'Deposit' });
    expect(depositButton).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/Amount/), '0');

    await userEvent.click(depositButton);

    const errorMessage = screen.getByText(
      'Amount must be a number greater than 0'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message when amount is invalid', async () => {
    render(<DepositForm />);
    const depositButton = screen.getByRole('button', { name: 'Deposit' });
    expect(depositButton).toBeInTheDocument();

    // not a valid number.
    await userEvent.type(screen.getByLabelText(/Amount/), '0.five');

    await userEvent.click(depositButton);

    const errorMessage = screen.getByText('Invalid');
    expect(errorMessage).toBeInTheDocument();
  });
});
