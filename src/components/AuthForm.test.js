import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthForm from "./AuthForm";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate,Routes, Route } from 'react-router-dom';
import Homepage from "./Homepage";

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("SignUp form test cases ", () => {
  test("checks SignUp text", () => {
    render(<MemoryRouter><AuthForm /></MemoryRouter>);
    const signupText = screen.getByText("Sign Up");
    expect(signupText).toBeInTheDocument();
  });

  test('submit form with valid data', async () => {
    render(<MemoryRouter><AuthForm /></MemoryRouter>);

    window.fetch = jest.fn(() => Promise.resolve({
      json: async () => Promise.resolve({}),
      ok: true,
    }));

    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/Your Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    const createAccountButton = screen.getByText('Create Account');
    userEvent.click(createAccountButton);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalled();
    });
  });
  test('login successful', async () => {
    render(
      <MemoryRouter>
       <AuthForm />
       <Homepage />
      </MemoryRouter>
    );

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: async () => Promise.resolve({}),
        ok: true,
      })
    );

    // If the form is not in 'Login with existing account' state, switch to that state
    const switchButton = screen.queryByRole('button', { name: /Login with existing account/i });
    if (switchButton) {
      userEvent.click(switchButton);
      // Wait for the form to update
      await waitFor(() => {
        expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Password/i)).toBeInTheDocument();
      });
    }

    // Submit the form
    const buttonElement = screen.getByRole('button', { name: /Login with your account/i });
    userEvent.click(buttonElement);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalled();
    });

    // Wait for the navigation to complete
    await waitFor(() => {
      expect(screen.getByText(/Welcome to mail box client/i)).toBeInTheDocument();
    }); // Increase the timeout if needed
  });
  
  
  
});

