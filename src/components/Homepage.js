import { Fragment } from "react";
// import SendEmail from "./Email/SendEmail";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authAction } from "./EmailStore/authreducer";
import { Link } from "react-router-dom";

const Homepage = ()=>{
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
   dispatch(authAction.logout());
    }
    return(
        <Fragment>
           <p>Welcome to mail box client</p> 
           {/* <button onClick={logoutHandler}>logout</button> */}

<Button onClick={logoutHandler}>logout</Button> <br></br>
<Link to='/send'>Compose Email</Link> <br></br>
<Link to='/inbox'>Inbox</Link>
        </Fragment>
    )
}
export default Homepage;