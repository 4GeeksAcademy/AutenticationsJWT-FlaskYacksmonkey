import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rocketImg from "../assets/img/rocketYellow.jpg";
import "../styles/Private.css";

export const Private = () => {
    const [msg, setMsg] = useState("");
    const [isFlying, setIsFlying] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/auth");
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.msg) {
                    setMsg(data.msg);
                } else {
                    navigate("/auth");
                }
            })
            .catch(() => navigate("/auth"));
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/auth");
    };

    const handleLaunch = () => {
        setIsFlying(true);
        setTimeout(() => setIsFlying(false), 2000); // Reset animation
    };

    return (
        <div className="dashboard">
            <main className="main-panel">
                <h1>Bienvenido a tu Panel 🚀</h1>
                <p>{msg}</p>

                <div className="rocket-container">
                    <img
                        src={rocketImg}
                        alt="Rocket"
                        className={`rocket ${isFlying ? "fly" : ""}`}
                    />
                    <button onClick={handleLaunch} className="launch-btn">Despegar</button>
                </div>

                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </main>
        </div>
    );
};
