import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate in React Router v6
import { login } from "../services/login";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Initialize navigate for navigation

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await login(username, password)

            if (response.data.success) { // Check for success in response
                // Handle successful login
                console.log(response.data);
                localStorage.setItem("token", response.data.token);  // Store JWT token
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("access", response.data.user.access);
                localStorage.setItem("signature", response.data.user.signature);  // Store signature
                localStorage.setItem("signatureTimestamp", response.data.user.signatureTimestamp);  // Store signature timestamp
                localStorage.setItem("isAdmin", response.data.user.isAdmin);


                // Redirect to admin page
                navigate("/admin/dashboard"); // Redirect to admin page using useNavigate
            } else {
                setError("Invalid username or password.");
            }
        } catch (error) {
            setError("An error occurred while logging in.");
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mb-4">
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

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    {/* <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-500 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div> */}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
