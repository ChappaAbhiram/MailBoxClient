import React, { useEffect } from 'react';
import { inboxAction } from '../EmailStore/EmailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Inbox.module.css';

function Inbox() {
    const mailInInbox = useSelector((state) => state.mail.mails);
  const myEmail = localStorage.getItem('email').replace(/[@.]/g, ''); // Remove single quotes around @ and .

  const dispatch = useDispatch();
  let data = [];

  useEffect(() => {

    const fetchData=async()=>{
        const reponse=await fetch( `https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}.json`);

        const mailData=await reponse.json();
        console.log('useEffectcalled', mailData);
        for(let key in mailData){
            data=[{id:key,...mailData[key]},...data]
        }

        dispatch(inboxAction.updateInbox(data))

    }

    fetchData();
  }, []); // Empty dependency array to run the effect once

  console.log(data, 'data');
  console.log(mailInInbox);

  return (
    <div className={classes.main}>
         {mailInInbox.length>0 ?
  (<div className={classes.row}>
            {                mailInInbox.map((item)=>(
                    <div className={classes.row1} key={item.id}>
                    <div className={classes.user}>From :- {item.from}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.msg}>
                <NavLink to={`/message/${item.id}`} style={{textDecoration:'none'}}>{'{message}'}</NavLink>
            </div>
           {item.dot && <div className={classes.dot}>
            {/* //dot logic */}
            </div>}
            </div>
                ))

            }
        </div>) : <p>Inbox is empty</p>}

    </div>
     );
        }


export default Inbox;