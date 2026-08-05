import { useState } from "react";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

function AuthPage() {
 const [showSignup, setShowSignup] = useState(true);
 return (
    <>
      {showSignup ? (
         <SignUp showLogin={() => setShowSignup(false)}/>): (
         <SignIn showSignup={() => setShowSignup(true)}/>)
      }
    </>
);
}

export default AuthPage