import "./SignUp.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5050/api/auth/register", {
        username: event.target.username.value,
        password: event.target.password.value,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
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
        <button className="signup__button">Sign up</button>

        {error && <div className="signup__message">{error}</div>}
      </form>

      <p>
        Have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>
    </main>
  );
}

export default Signup;
