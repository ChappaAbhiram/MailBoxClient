import AuthForm from "./components/AuthForm";
import Homepage from "./components/Homepage";
import { Route,Routes,BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
   
    <Routes>
      {/* <h2>Let's get started!</h2> */}
      <Route path="/" element={<AuthForm />} />
      <Route path="/homepage" element={<Homepage />}></Route>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
