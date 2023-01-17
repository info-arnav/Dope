import axios from "axios";
import Head from "next/head";
import * as jose from "jose";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const auth = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    axios
      .post("/api/login", { username: username, password: password })
      .then(async (e) => {
        if (e.data.error == true) {
          setError("Some error occured, please try again.");
        } else if (e.data.loggedIn == false) {
          setError("Invalid credentials");
        } else if (loggedIn == true) {
          const secret = new TextEncoder().encode(
            "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
          );
          const alg = "HS256";
          const jwt = await new jose.SignJWT({ data: e.data.data.username })
            .setProtectedHeader({ alg })
            .sign(secret);
          localStorage.setItem("user", jwt);
          window.location = "/";
        } else {
          setError("Some error occured, please try again.");
        }
      });
    setDisabled(false);
  };
  return (
    <>
      <center>
        <form className="credntials" onSubmit={auth}>
          <p className="title">Login</p>
          <input
            placeholder="User ID"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          ></input>
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          <p>{error}</p>
          <button action="submit" disabled={disabled}>
            Login
          </button>
        </form>
      </center>
    </>
  );
}
