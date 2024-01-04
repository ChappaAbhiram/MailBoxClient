import { render,screen ,fireEvent, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom';
import AuthForm from "./AuthForm";
import userEvent from "@testing-library/user-event";

describe("SignUp form test cases ",()=>{
    test("checks SignUp text",()=>{
        render(<AuthForm />);
        const signupText = screen.getByText("Sign Up");
        expect(signupText).toBeInTheDocument();
    })
    
    test('submit form with valid data', async () => {
        render(<AuthForm />);
    
        window.fetch = jest.fn(()=>Promise.resolve({
            json: async() => Promise.resolve({}),
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
        //   fireEvent.click(screen.getByText(/Create Account/i));
        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement)
        
        //   // Check if fetch was called
         expect(window.fetch).toHaveBeenCalled();
       
    });
      
})


  

