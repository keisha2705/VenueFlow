import { useState } from "react";
import SignIn from "../Components/SignIn";
import Signup from "../Components/Signup";

function AuthPage() {
 const [showSignup, setShowSignup] = useState(true);
 return (
    <>
      {showSignup ? (
         <Signup showLogin={() => setShowSignup(false)}/>): (
         <SignIn showSignup={() => setShowSignup(true)}/>)
      }
    </>
);
}

export default AuthPage