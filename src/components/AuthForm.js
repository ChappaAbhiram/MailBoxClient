import { useState, useRef } from 'react';
import  "./AuthForm.css"
const AuthForm = () => {
    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
//   const [isLoading,setIsLoading] = useState(false);

  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    let url;
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs";
    if(enteredPassword!==confirmPassword){
        alert("Passwords missmatch");
        // setIsLoading(false);
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
        //   setIsLoading(false);
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
            console.log("User Successfully Signed up");
            alert("User Successfully Signed up");
  })
  .catch(err=>{
    alert(err.message);
  });
}
  return (
    // <section className={classes.auth}>
    <section className = "auth-form">
      {/* <h1>{isLogin ? 'Login' : !forgotPassword ? 'Sign Up' : ''}</h1> */}
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        {/* <div className={classes.control}> */}
        <div>
          {/* {!forgotPassword && <label htmlFor='email'>Your Email</label>}
          {forgotPassword && <label htmlFor='email'>Enter Your Registered email</label>} */}
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        {/* {!forgotPassword && (<div className={classes.control}> */}
        {/* <div className={classes.control}> */}
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {/* {!isLogin && !forgotPassword && (<div className={classes.control}> */}
        <div>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmpassword'
            required
            ref={confirmPasswordRef}
          />
        </div>

        {/* <div className={classes.actions}> */}
        <div>
          {/* {!isLoading && !forgotPassword && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {!isLoading && !forgotPassword && isLogin && <button className={classes.toggle} onClick={forgotpasswordHandler}>'Forgot password'</button>}
          {!isLoading && forgotPassword && <button onClick = {sendLinkHandler}>Send Link</button>}
          {isLoading && <p>Sending Request.....</p>} */}
          <button>Create Account</button>
          {/* <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin && !forgotPassword ? 'Create new account' : 'Login with existing account'}
          </button> */}
        </div>
      </form>
    </section>

  );
}
export default AuthForm;