import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./EmailStore/authreducer";
import { Link } from "react-router-dom";
import { inboxAction } from "./EmailStore/EmailReducer";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const unRead = useSelector((state) => state.mail.unRead);
  const myEmail = localStorage.getItem('email').replace(/['@','.']/g,'');
  
  const logoutHandler = () => {
    dispatch(authAction.logout());
    history("/", { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      let noOfUnread = 0;
      const response = await fetch(`https://mailboxclient-a7c86-default-rtdb.firebaseio.com/received/${myEmail}.json`);
      const mailData = await response.json();

      for (let key in mailData) {
        if (mailData[key].dot === true) {
          noOfUnread++;
        }
      }

      dispatch(inboxAction.updateUnread(noOfUnread));
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 7 seconds
    const intervalID = setInterval(() => {
      fetchData();
      console.log("setinterval called")
    }, 7000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Fragment>
      <p>Welcome to mail box client</p>
      <Button onClick={logoutHandler}>Logout</Button> <br />
      <Link to="/send">Compose Email</Link> <br />
      <Link to="/inbox">Inbox {unRead}</Link>
      <Link to="/sentbox">SentBox</Link>
    </Fragment>
  );
};

export default Homepage;
