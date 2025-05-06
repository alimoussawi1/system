import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginBackground from "../assets/login.jpg";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                localStorage.setItem("plan", userData.plan || 'Essential')
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
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${LoginBackground})`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-800/70"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full max-w-4xl px-4">
                {/* Left side - branding message (hidden on mobile) */}
                <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back</h1>
                    <p className="text-lg mb-6">Access your dashboard and continue managing your business with ease.</p>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                        <p className="text-sm italic">"Streamline your operations and grow your business with our powerful tools."</p>
                    </div>
                </div>

                {/* Right side - login form */}
                <div className="w-full md:w-1/2 p-4">
                    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02afde]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="mb-2 relative">
                                <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02afde] pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>

                            <div className="text-right mb-6">
                                <button
                                    type="button"
                                    className="text-[#5842aa] text-sm hover:underline"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="w-full bg-[#02afde] hover:bg-[#5842aa] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </span>
                                    ) : (
                                        "Login"
                                    )}
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
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;