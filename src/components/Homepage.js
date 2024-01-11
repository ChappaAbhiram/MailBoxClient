import { Fragment } from "react";
import SendEmail from "./Email/SendEmail";
const Homepage = ()=>{
    return(
        <Fragment>
           <p>Welcome to mail box client</p> 
            <SendEmail />
        </Fragment>
    )
}
export default Homepage;