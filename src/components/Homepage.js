import { Fragment } from "react";
// import SendEmail from "./Email/SendEmail";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./EmailStore/authreducer";
import { Link } from "react-router-dom";
import { inboxAction } from "./EmailStore/EmailReducer";
const Homepage = ()=>{
    const dispatch = useDispatch();
    const unRead = useSelector(state=>state.mail.unRead);
    const myEmail = localStorage.getItem('email').replace(/['@','.']/g,'');
    const logoutHandler = ()=>{
   dispatch(authAction.logout());
    }
    let noOfUnread = 0;
    useEffect(()=>{
        const fetchDaata=async()=>{
            const reponse=await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}.json`);
    
            const mailData=await reponse.json();
            console.log('useEffectcalled', mailData);
            for(let key in mailData){
                // data=[{id:key,...mailData[key]},...data]
                if(mailData[key].dot===true){
                  noOfUnread++
                  // console.log(noOfUnread,'noOfUnread');
                }
            }
            console.log(noOfUnread,'noOfUnread');
    
            dispatch(inboxAction.updateUnread(noOfUnread))
    
        }
        fetchDaata();
    },[])
    return(
        <Fragment>
           <p>Welcome to mail box client</p> 
           {/* <button onClick={logoutHandler}>logout</button> */}

<Button onClick={logoutHandler}>logout</Button> <br></br>
<Link to='/send'>Compose Email</Link> <br></br>
<Link to='/inbox'>Inbox {unRead}</Link>
        </Fragment>
    )
}
export default Homepage;