import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './ReadMsg.module.css';

const ReadInboxMsg = () => {
    const {id}=useParams();
    const mails=useSelector(state=>state.mail.mails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    const singleMail=mails.filter((item)=>item.id===id);
    const message=singleMail[0].message
    console.log(singleMail,'message');
    useEffect(() => {
        const fetchData = async () => {
          try {

            const existingResponse = await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}/${id}.json`);
            const existingData = await existingResponse.json();
      
        
            const updatedData = {
              ...existingData,
              dot: false
            };
      
            // PUT request to update the entire resource
            const response = await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}/${id}.json`, {
              method: 'PUT',
              body: JSON.stringify(updatedData),
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);
      
      
  return (
    <Fragment>
    <div className={classes.message}>{message}</div>
    </Fragment>
  )
}

export default ReadInboxMsg;