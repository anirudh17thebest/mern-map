import "./register.css";
import { useState } from "react";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

const Register = ({ setShowRegister }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRegister = {
      username: username,
      email: email,
      password: password,
    };
    try {
      await axios.post("/users/register", newRegister);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        JordanPin
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="rbutton">
          Register
        </button>
        {success && <span className="successMessage">You can Login Now</span>}
        {error && <span className="errorMessage">Something went wrong</span>}
      </form>
      <Cancel className="cancel" onClick={() => setShowRegister(false)} />
    </div>
  );
};

export default Register;
