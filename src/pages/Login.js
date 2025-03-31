import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, register, logout, token } = useAuth();
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({
        email: "",
        username: "",
        password: "",
        name: { firstname: "", lastname: "" },
        address: { city: "", street: "", number: 0 },
        phone: ""
    });

    // Handle input change for login form
    const handleLoginChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle input change for register form
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit login form
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(credentials.username, credentials.password);
        navigate("/");
    };

    // Submit register form
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        await register(registerData);
        setShowRegister(false); // Switch to login after successful registration
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {showRegister ? "Register" : "Login"}
                </h2>

                {showRegister ? (
                    // Registration Form
                    <form onSubmit={handleRegisterSubmit}>
                        <input name="email" type="email" placeholder="Email"
                            className="w-full p-2 border mb-2" onChange={handleRegisterChange} required />
                        <input name="username" type="text" placeholder="Username"
                            className="w-full p-2 border mb-2" onChange={handleRegisterChange} required />
                        <input name="password" type="password" placeholder="Password"
                            className="w-full p-2 border mb-2" onChange={handleRegisterChange} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                            Register
                        </button>
                        <p className="text-center mt-2 text-sm">
                            Already have an account? 
                            <button className="text-blue-600 underline" onClick={() => setShowRegister(false)}>
                                Login
                            </button>
                        </p>
                    </form>
                ) : (
                    // Login Form
                    <form onSubmit={handleLoginSubmit}>
                        <input name="username" type="text" placeholder="Username"
                            className="w-full p-2 border mb-2" onChange={handleLoginChange} required />
                        <input name="password" type="password" placeholder="Password"
                            className="w-full p-2 border mb-2" onChange={handleLoginChange} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                            Login
                        </button>
                        <div>
                          <p><span>username:</span>johnd</p>
                          <p><span>password:</span>m38rmF$</p>
                        </div>
                        <p className="text-center mt-2 text-sm">
                            Don't have an account? 
                            <button className="text-blue-600 underline" onClick={() => setShowRegister(true)}>
                                Register
                            </button>
                        </p>
                    </form>
                )}

                {token && (
                    <button
                        onClick={logout}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;
