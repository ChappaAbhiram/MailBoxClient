import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import {Form, Button } from 'react-bootstrap';
import classes from './SendEmail.module.css'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Fragment, useState } from 'react'

const SendEmail = () => {

    const [editorState , setEditorState] = useState(()=> EditorState.createEmpty() )

    const [email,setEmail]=useState('');
    const [subject,setSubject]=useState('');

    const EmailchangeHandler=(e)=>{
        setEmail(e.target.value);
    }

const SubjectchangeHandler=(e)=>{
    setSubject(e.target.value);
}

    const editorHandler=(editorState)=>{
       setEditorState(editorState)
    //    console.log(editorState.getCurrentContent().getPlainText(),'editorState');

    }
    const submitHandler=(e)=>{
        e.preventDefault();
        const senderemailunchanged=localStorage.getItem('email');
        const sender = senderemailunchanged.replace(/[@.]/g,'');
        const receiver=email.replace(/['@','.']/g,'');
       console.log(sender,receiver);
       fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/sent/${sender}.json`,{
        method:'POST',
        body:JSON.stringify({
            sentTo : email,
            subject:subject,
            message:editorState.getCurrentContent().getPlainText()
        }),
        headers:{
            'Content-Type':'application/json'
        }
       }).then((res)=>{
        if(!res.ok){
            alert(res.error.message)
        }else{
            console.log('successfull');
        }
       })
       fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${receiver}.json`,{
        method:'POST',
        body:JSON.stringify({
            from : senderemailunchanged,
            subject:subject,
            message:editorState.getCurrentContent().getPlainText(),
            dot:true
        }),
        headers:{
            'Content-Type':'application/json'
        }
       }).then((res)=>{
        if(!res.ok){
            alert(res.error.message)
        }else{
            console.log('successfull');
        }
       })
    }
  return (
    <Fragment>
        <div className={classes.main}>
        <Form className={`${classes.To}`} onSubmit={submitHandler} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>To</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={EmailchangeHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" value={subject} onChange={SubjectchangeHandler} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>

<div className={classes.editor}>
    <Editor 
            editorState={editorState}
            onEditorStateChange={editorHandler}
            />
</div>
    </div>

    </Fragment>
  )
}

export default SendEmail;