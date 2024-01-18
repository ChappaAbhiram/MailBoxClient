import AuthForm from "./components/AuthForm";
import Inbox from "./components/Email/Inbox";
import SendEmail from "./components/Email/SendEmail";
import Homepage from "./components/Homepage";
import SentBox from "./components/Email/SentBox";
import ReadMsg from "./components/Email/ReadMsg";
import { useSelector } from "react-redux";
import { Route,Routes,BrowserRouter } from "react-router-dom";

function App() {
  const isAuth=useSelector(state=>state.auth.isAuthenicate)
  console.log(isAuth);
  return (
    <BrowserRouter>
   
    <Routes>
      {/* <h2>Let's get started!</h2> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/homepage" element={isAuth ? <Homepage /> : <AuthForm />}></Route>
      <Route path='/send' element={isAuth ? <SendEmail /> : <AuthForm />} />
      <Route path='/inbox' element={isAuth ? <Inbox /> : <AuthForm />} />
      <Route path='/sentbox' element={isAuth ? <SentBox /> : <AuthForm />} />
      <Route path='/message/:id' element={isAuth ? <ReadMsg /> : <AuthForm />} /> 
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
