import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import rocketImage from "../assets/img/rocketYellow.jpg";

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        nombre: "",
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleToggle = () => setIsLogin(!isLogin);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "login" : "signup";

        const body = isLogin
            ? {
                email: form.email,
                password: form.password
            }
            : {
                nombre: form.nombre,
                username: form.username,
                email: form.email,
                password: form.password
            };

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await resp.json();

            if (!resp.ok) throw new Error(data.message || "Error en la autenticación");

            if (isLogin) {
                sessionStorage.setItem("token", data.access_token);
                navigate("/private");
            } else {
                alert("Registro exitoso. Iniciá sesión.");
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="auth-container">
            
            <div className="auth-image">
                <img src={rocketImage} alt="Rocket visual" />
            </div>

            <div className="auth-form-wrapper">
                <div className={`auth-card ${isLogin ? "login" : "register"}`}>
                    {/* LOGIN */}
                    <div className="auth-side front">
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                            <button type="submit">Ingresar</button>
                        </form>
                        <p onClick={handleToggle}>¿No tienes cuenta? Registrate aquí</p>
                    </div>

                    {/* REGISTRO */}
                    <div className="auth-side back">
                        <h2>Registrarse</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                            <button type="submit">Registrar</button>
                        </form>
                        <p onClick={handleToggle}>¿Ya tienes cuenta? Iniciá sesión</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
