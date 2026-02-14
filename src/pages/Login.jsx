import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            window.location.replace("/");
        } catch {
            alert("Invalid Credentials");
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h2>Login</h2>

                <input
                    style={input}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={input}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={button} onClick={handleLogin}>
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

const container = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6"
};

const card = {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const input = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc"
};

const button = {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
};
