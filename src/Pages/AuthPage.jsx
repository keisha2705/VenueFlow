import { useState } from "react";
import SignIn from "../Components/SignIn";
import Signup from "../Components/SignUp";

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