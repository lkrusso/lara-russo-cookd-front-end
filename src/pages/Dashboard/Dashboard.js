import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <main className="dashboard">
      <button onClick={logout}>Log out</button>
    </main>
  );
}

export default Dashboard;
