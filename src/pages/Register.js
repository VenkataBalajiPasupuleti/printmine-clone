import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        name: { firstname: "", lastname: "" },
        address: { city: "", street: "", number: 0 },
        phone: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(userData);
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Email"
                        className="w-full p-2 border mb-2" onChange={handleChange} />
                    <input name="username" type="text" placeholder="Username"
                        className="w-full p-2 border mb-2" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password"
                        className="w-full p-2 border mb-2" onChange={handleChange} />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
