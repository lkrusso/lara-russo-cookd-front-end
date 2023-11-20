import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/login",
        {
          username: event.target.username.value,
          password: event.target.password.value,
        }
      );

      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <div className="field">
          <label htmlFor="username" className="field__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="password" className="field__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="field__input"
          />
        </div>
        <button className="login__button">Log in</button>
        {error && <div className="login__message">{error}</div>}
      </form>

      <p>
        Need an account? <Link to="/signup">Log in</Link>
      </p>
    </main>
  );
}

export default Login;
