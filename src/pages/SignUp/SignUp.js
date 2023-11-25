import "./SignUp.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (
      !form.username.value ||
      !form.password.value ||
      !form.confirm_password.value
    ) {
      setError("Please ensure all fields of the form are filled out");
      return;
    }

    if (form.password.value !== form.confirm_password.value) {
      setError("Please ensure passwords are matching");
      return;
    }

    try {
      await axios.post("http://localhost:5050/api/auth/register", {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      setSuccess("Successfully signed up! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
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
        <div className="field">
          <label htmlFor="confirm_password" className="field__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="field__input"
          />
        </div>
        <button className="signup__button">Sign up</button>

        {error && <div className="signup__message">{error}</div>}
        {success && <div className="success__message">{success}</div>}
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
