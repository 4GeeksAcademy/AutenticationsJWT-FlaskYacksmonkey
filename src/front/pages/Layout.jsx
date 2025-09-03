import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <div
      className="layout-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main
        className="layout-content"
        style={{
          flex: 1,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
