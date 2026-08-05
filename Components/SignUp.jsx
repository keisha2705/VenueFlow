import { useState } from "react";
import "/home/keishatyramoyo/Bookings/venueFlow/my-react-app/Styling/SignUp.css";

function SignUp() {
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

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/signin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Could not connect to the server.");
      console.log(error);
    }
  }

  return (
    <div className="signup-page">
      <div className="left-side">

         <div className="Logo">
            <p>ENVTR</p>
        </div>
        <h1>WELCOME</h1>
      </div>

      <div className="right-side">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <h4>Username</h4>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h4>Email</h4>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h4>Confirm Password</h4>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">sign up</button>

          <p className="login-link">
            Already have an account?
            <span onClick={() => navigate("/Signin")}> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
