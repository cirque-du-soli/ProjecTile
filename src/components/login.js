import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      await axios
        .post(`${baseUrl}/auth`, {
          username,
          password,
        })
        .then((res) => {
          if (res.data == "success") {
            history("/home", { state: { id: username } });
          } else if (res.data == "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <br />

      <Link to="/regi">Don't Have an account? Sign up here!</Link>
    </div>
  );
}

export default Login;
