import { useState } from "react";
import SignIn from "../Components/SignIn";
<<<<<<< HEAD
import SignUp from "../Components/SignUp";
=======
import Signup from "../Components/SignUp";
>>>>>>> d59dc7ed8172377f8d8386de5608eaa99c7736cd

function AuthPage() {
 const [showSignup, setShowSignup] = useState(true);
 return (
    <>
      {showSignup ? (
<<<<<<< HEAD
         <SignUp showLogin={() => setShowSignup(false)}/>): (
=======
         <Signup showLogin={() => setShowSignup(false)}/>): (
>>>>>>> d59dc7ed8172377f8d8386de5608eaa99c7736cd
         <SignIn showSignup={() => setShowSignup(true)}/>)
      }
    </>
);
}

export default AuthPage