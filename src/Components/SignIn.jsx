import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/SignIn.css";

function Signin({ showSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
 
  const handleLogin = async (event) => {
    event.preventDefault();

        if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

     try {
        // logingin with firebase:
    const userCredential = await signInWithEmailAndPassword( auth, email, password);

    // getting the firebase UID
    const uid = userCredential.user.uid;

    // sending the UID to the backend to get the user role and other info
    const response = await fetch(`http://localhost:3000/users/${uid}`);
    const data = await response.json();
    if (!response.ok) {
     throw new Error(data.message);
    }
    // Save user information using a token so that backend has prove the user is logged in by firebase
     const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));

     alert("Welcome Back!!")
        if(data.role === "user"){
            navigate("/user")
        }else if(data.role === "manager"){
            navigate("/manager")
        }else if(data.role === "superAdmin"){
            navigate("/superAdmin")
        }
            // console.log(data);              
     }catch (error) {
        alert(error.message)
    }
}
    return (
        <>
       <div className="login-container">
    <div className="login-right">
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} name="email" onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Login</button>
            <p> Don't have an account? <span onClick={showSignup}> Sign Up</span> </p>
           <button type="button" onClick={() => navigate("/forgot-password")}> Forgot Password?</button>
        </form>
    </div>

    <div className="login-left">
        <h2> Welcome <br/>Back </h2>
    </div>
 </div>
    </>
);
}

export default Signin