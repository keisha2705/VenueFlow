import { useState } from "react";
import "../Styling/SignUp.css";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp({showLogin}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    if(password !== confirmPassword){
      alert("Passwords are not the same.")
      return;
    }

    try {
      // this creates the firebase acc, firebase only saves the email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // saving the other info on Mongodb
      const response = await fetch("http://localhost:3000/signup", {
         method: "POST",
         headers: {"Content-Type":"application/json"},
         body : JSON.stringify({ uid: userCredential.user.uid, username, email })
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message)
      }
       alert("Welcome to the Family!");
        setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
      }catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="signup-page">
      <div className="left-side">
         <div className="Logo">
            <p><img src="./logo1.png" alt="logo" width="300" height="300" /></p>
        </div>
        <h1>WELCOME</h1>
      </div>

      <div className="right-side">
        <form className="signup-form" onSubmit={handleSignup}>
          <h1>Sign Up</h1>

          <h4>Username</h4>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>

          <h4>Email</h4>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          
          <h4>Password</h4>
          <input type="password" placeholder="Minimum of 8 characters" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <h4>Confirm Password</h4>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

          <button type="submit">sign up</button>
          <p className="login-link">Already have an account?<span onClick={showLogin}> Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
