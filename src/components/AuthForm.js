import { useState, useRef } from 'react';

import  "./AuthForm.css"
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
    const history = useNavigate();
    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading,setIsLoading] = useState(false);
  const [isSignIn,setSignIn] = useState(false);
  const [forgotPassword,setForgotPassword] = useState(false);

  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let confirmPassword ;
    if(!isSignIn){
    confirmPassword = confirmPasswordRef.current.value;
    }
    
    let url;
    if(isSignIn){
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs";
    }
    else{
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs";
    }
    if(!isSignIn && enteredPassword!==confirmPassword){
        alert("Passwords missmatch");
        setIsLoading(false);
        return;
      }
    fetch(url,
        {
          method : 'POST',
          body : JSON.stringify({
            email : enteredEmail,
            password : enteredPassword,
            returnSecureToken : true
          }),
          headers : {
            'Content-Type' : 'application/json'
          }
        }
        ).then(res=>{
          setIsLoading(false);
          if(res.ok){
            return res.json();
      }
          else{
           return res.json().then(data=>{
            let errorMessage = 'Authentication failed!';
            console.log(data);
            if(data && data.error && data.error.message){
            errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
           });
          }
        }).then(data =>{
            // console.log("User Successfully Signed up");
            // alert("User Successfully Signed up");
            console.log(data);
            setIsLoading(false);
            history('/homepage');
  })
  .catch(err=>{
    alert(err.message);
  });
}
const forgotpasswordHandler = (e)=>{
    e.preventDefault();
    setForgotPassword(true);
    // dispatch(authActions.switchmode())
   }

   const sendLinkHandler = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email : emailInputRef.current.value,
        requestType : "PASSWORD_RESET"
      })
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
      else{
        return res.json().then(data=>{
          if(data && data.error && data.error.message){
            alert(`${data.error.message}`)
          }
        })
      }
    }).then(data=>{
      console.log(data);
      setIsLoading(false);
    })
   }

   const switchAuthModeHandler = () => {
    // dispatch(authActions.switchmode());
    setForgotPassword(false);
    setSignIn(!isSignIn);
  };
  return (
    // <section className={classes.auth}>
    <section className = "auth-form">
      <h1>{isSignIn ? 'Login' : !forgotPassword ? 'Sign Up' : ''}</h1>
      {/* <h1>Sign Up</h1> */}
      <form onSubmit={submitHandler}>
        {/* <div className={classes.control}> */}
        <div>
          {!forgotPassword && <label htmlFor='email'>Your Email</label>}
          {forgotPassword && <label htmlFor='email'>Enter Your Registered email</label>}
          {/* <label htmlFor='email'>Your Email</label> */}
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        {/* {!forgotPassword && (<div className={classes.control}> */}
        {/* <div className={classes.control}> */}
       {!forgotPassword && (<div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>)}
        {/* {!isLogin && !forgotPassword && (<div className={classes.control}> */}
        {!isSignIn && !forgotPassword && (<div>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmpassword'
            required
            ref={confirmPasswordRef}
          />
        </div>)}

        {/* <div className={classes.actions}> */}
        <div>
        {!isLoading && !forgotPassword && (
          <button className={isSignIn ? 'primary' : 'secondary'}>
            {isSignIn ? 'Login' : 'Create Account'}
          </button>
        )}
        {!isLoading && !forgotPassword && isSignIn && (
          <button className="secondary" onClick={forgotpasswordHandler}>
            'Forgot password'
          </button>
        )}
        {!isLoading && forgotPassword && (
          <button className="primary" onClick={sendLinkHandler}>
            Send Link
          </button>
        )}
          {isLoading && <p>Sending Request.....</p>}
          {/* <button>Create Account</button> */}
          <button
            type='button'
            // className={classes.toggle}
            className = "tertiary"
            onClick={switchAuthModeHandler}
          >
            {isSignIn && !forgotPassword ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>

  );
}
export default AuthForm;