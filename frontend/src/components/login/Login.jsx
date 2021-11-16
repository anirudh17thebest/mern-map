import "./login.css";
import { useState } from "react";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLogin = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post("/users/login", newLogin);
      myStorage.setItem("user", res.data.username);
      setShowLogin(false);
      setCurrentUser(res.data.username);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="llogo">
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
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="lbutton">
          Login
        </button>
        {error && <span className="lerrorMessage">Wrong Credentials</span>}
      </form>
      <Cancel className="lcancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
