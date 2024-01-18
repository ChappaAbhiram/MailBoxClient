import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { inboxAction } from '../EmailStore/EmailReducer';
import classes from './SentBox.module.css';
import { useState } from 'react';

const SentBox = () => {
    const dispatch=useDispatch();
    // const mailInbox=useSelector(state=>state.mail.mails);
    const [reRender,setreRender]=useState(true);
    const mailSentBox = useSelector(state=>state.mail.sendMails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    let data=[];
    const deleteHandler=async(id)=>{
        const response= await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/sent/${myEmail}/${id}.json`,{
            method:'DELETE'
        })  
        const deleteData=await response.json();
        setreRender((prev)=>!prev)
        console.log(deleteData);
        }

    useEffect(()=>{
        const fetchDaata=async()=>{
            const reponse=await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/sent/${myEmail}.json`);
            const mailData=await reponse.json();
            console.log('useEffectcalled', mailData);
            for(let key in mailData){
                data=[{id:key,...mailData[key]},...data]
            }

            dispatch(inboxAction.updateSentbox(data))
          console.log(mailSentBox,'mailSentbox');

        }
        fetchDaata();
    },[reRender])
    console.log(data,'data');
  return (
    <div className={classes.main}>
       {mailSentBox.length>0 ?
  (<div className={classes.row}>
        { mailSentBox.map((item)=>(
            <div className={classes.row1} key={item.id}>
            <div className={classes.user}>To :- {item.sentTo}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.msg}>
                <NavLink to={`/sentboxmessage/${item.id}`}>{'{message}'}</NavLink>
                {/* {item.message} */}
            </div>
            <div className={classes.delete}>
                <button onClick={()=>{deleteHandler(item.id)}}>Delete</button>
            </div>
            </div>))}
        </div>) : <p>Sentbox is empty</p>}
    </div>
  )
}

export default SentBox