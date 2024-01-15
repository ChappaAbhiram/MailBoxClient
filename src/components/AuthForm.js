import { useState, useRef } from 'react';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from './EmailStore/authreducer';

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setSignIn] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let confirmPassword;
    if (!isSignIn) {
      confirmPassword = confirmPasswordRef.current.value;
    }

    let url;
    if (isSignIn) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs';
    }

    if (!isSignIn && enteredPassword !== confirmPassword) {
      alert('Passwords mismatch');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
else{
     if(isSignIn){
      setIsLoading(false);
      localStorage.setItem('token',data.idToken);
      localStorage.setItem('email',enteredEmail);
      dispatch(authAction.login());
      navigate('/homepage');
     }
     else{
      alert("User Successfully Signed up");
      history('/',{replace : true});
     }
}
    } catch (error) {
      alert(error.message);
    }
  };

  const forgotpasswordHandler = (e) => {
    e.preventDefault();
    setForgotPassword(true);
  };

  const sendLinkHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add logic for sending reset link
  };

  const switchAuthModeHandler = () => {
    setForgotPassword(false);
    setSignIn(!isSignIn);
  };

  return (
    <section className="auth-form">
      <h1>{isSignIn ? 'Login' : !forgotPassword ? 'Sign Up' : ''}</h1>
      <form onSubmit={submitHandler}>
        <div>
          {!forgotPassword && <label htmlFor="email">Your Email</label>}
          {forgotPassword && <label htmlFor="email">Enter Your Registered email</label>}
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        {!forgotPassword && (
          <div>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
        )}
        {!isSignIn && !forgotPassword && (
          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type="password" id="confirmpassword" required ref={confirmPasswordRef} />
          </div>
        )}
        <div>
          {!isLoading && !forgotPassword && (
            <button className={isSignIn ? 'primary' : 'secondary'}>
              {isSignIn ? 'Login with your account' : 'Create Account'}
            </button>
          )}
          {!isLoading && !forgotPassword && isSignIn && (
            <button className="secondary" onClick={forgotpasswordHandler}>
              Forgot password
            </button>
          )}
          {!isLoading && forgotPassword && (
            <button className="primary" onClick={sendLinkHandler}>
              Send Link
            </button>
          )}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type="button"
            className="tertiary"
            onClick={switchAuthModeHandler}
          >
            {isSignIn && !forgotPassword ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
