import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import "../Styling/SignIn.css";

function SignIn({ showSignup }) {
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
            // Login with Firebase
            const userCredential = await signInWithEmailAndPassword( auth, email, password);
            // Get Firebase uid
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

            alert("Welcome Back!");

            if (data.role === "user") {
                navigate("/user");
            } else if (data.role === "manager") {
                navigate("/manager");
            } else if (data.role === "superAdmin") {
                navigate("/superAdmin");
            }

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="logo">
                    <h3>EVNTR</h3>
                </div>

                <h2>
                    WELCOME
                    <br />
                    BACK
                </h2>

                <p>
                    Welcome to Venue Flow where you can book a seat,
                    book a ticket and safely receive your ticket.
                </p>
            </div>

            <div className="login-right">
                <form onSubmit={handleLogin}>
                    <h1>LOGIN</h1>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="eg. Zach123@gmail.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="eg. Zach1234567"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button type="submit">Login</button>

                    <p>
                        Don't have an account?{" "}
                        <span onClick={showSignup}>Sign Up</span>
                    </p>

                    <button type="button" onClick={() => navigate("/forgot-password")}>
                        Forgot Password?
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;