import React, { useEffect } from 'react';
import { inboxAction } from '../EmailStore/EmailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Inbox.module.css';
import { useState } from 'react';

function Inbox() {
    const mailInInbox = useSelector((state) => state.mail.mails);
  const myEmail = localStorage.getItem('email').replace(/[@.]/g, ''); // Remove single quotes around @ and .

  const dispatch = useDispatch();
  const [reRender,setreRender]=useState(true)
  const deleteHandler=async(id)=>{
    const response= await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}/${id}.json`,{
        method:'DELETE'
    })  
    const deleteData=await response.json();
    setreRender((prev)=>!prev)
    console.log(deleteData);

    }
  useEffect(() => {

    const fetchData=async()=>{
        const reponse=await fetch( `https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}.json`);
        let data = [];
        const mailData=await reponse.json();
        console.log('useEffectcalled', mailData);
        for(let key in mailData){
            data=[{id:key,...mailData[key]},...data]
        }

        dispatch(inboxAction.updateInbox(data))

    }

    fetchData();
    const intervalID = setInterval(() => {
        fetchData();
        console.log("setinterval called")
      }, 7000);
  
      // Clean up the interval when the component is unmounted
      return () => {
        clearInterval(intervalID);
      };
    }, [reRender]);
  

  return (
    <div className={classes.main}>
         {mailInInbox.length>0 ?
  (<div className={classes.row}>
            {                mailInInbox.map((item)=>(
                    <div className={classes.row1} key={item.id}>
                    <div className={classes.user}>From :- {item.from}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.msg}>
                <NavLink to={`/inboxmessage/${item.id}`} style={{textDecoration:'none'}}>{'{message}'}</NavLink>
            </div>
           {item.dot && <div className={classes.dot}>
            {/* //dot logic */}
            </div>}
            <div className={classes.delete}>
                <button onClick={()=>{deleteHandler(item.id)}}>Delete</button>
            </div>
            </div>
                ))

            }
        </div>) : <p>Inbox is empty</p>}

    </div>
     );
        }


export default Inbox;