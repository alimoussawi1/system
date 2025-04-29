import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure db is your Firestore instance
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Step 1: Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;
            localStorage.setItem("uid", user.uid);

            // Step 2: Get Firebase ID token
            const token = await user.getIdToken();
            localStorage.setItem("token", token);

            // Step 3: Get full user data from Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();

                localStorage.setItem("access", userData.access || "");
                localStorage.setItem("fullName", userData.businessName);
                localStorage.setItem("signature", userData.signature || "");
                localStorage.setItem("signatureTimestamp", userData.signatureTimestamp || "");
                localStorage.setItem("isAdmin", userData.email === "amoussawi02@gmail.com" ? "true" : "false");
            } else {
                console.error("User document not found in Firestore.");
                setError("User data not found.");
                setLoading(false);
                return;
            }

            // Step 4: Redirect to dashboard
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password.");
        }

        setLoading(false);
    };

    const handleForgotPassword = async () => {
        if (!username) {
            setError("Please enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, username);
            toast.success("Password reset email sent! Check your inbox.");
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Failed to send password reset email.");
            toast.error("Failed to send password reset email.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 h-full">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="text-right mb-4">
                        <button
                            type="button"
                            className="text-[#5842aa] text-sm hover:underline"
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-[#02afde] text-white py-2 rounded-lg hover:bg-[#5842aa]"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4 flex justify-center items-center gap-1">
                    <p className="text-sm text-gray-600">Don't have a business account?</p>
                    <Link to="/partner">
                        <p className="text-[#5842aa] text-sm font-bold hover:underline cursor-pointer">
                            Get Started
                        </p>
                    </Link>
                </div>


            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
