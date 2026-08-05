import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>

            <form onSubmit={handleResetPassword}>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit"> Send Reset Email </button>
            </form>
        </div>
    );
}

export default ForgotPassword