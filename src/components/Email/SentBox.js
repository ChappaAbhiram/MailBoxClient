import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { inboxAction } from '../EmailStore/EmailReducer';
import classes from './SentBox.module.css'

const SentBox = () => {
    const dispatch=useDispatch();
    const mailInInbox=useSelector(state=>state.mail.mails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    let data=[];

    useEffect(()=>{
        const fetchDaata=async()=>{
            const reponse=await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/sent/${myEmail}.json`);
            const mailData=await reponse.json();
            console.log('useEffectcalled', mailData);
            for(let key in mailData){
                data=[{id:key,...mailData[key]},...data]
            }

            dispatch(inboxAction.updateInbox(data))

        }
        fetchDaata();
    },[])
    console.log(data,'data');
  return (
    <div className={classes.main}>
       {mailInInbox.length>0 ?
  (<div className={classes.row}>
        { mailInInbox.map((item)=>(
            <div className={classes.row1} key={item.id}>
            <div className={classes.user}>To :- {item.sentTo}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.msg}>
                <NavLink to={`/message/${item.id}`}>message</NavLink>
            </div>
            </div>))}
        </div>) : <p>Sentbox is empty</p>}
    </div>
  )
}

export default SentBox