import axios from "axios";
import Head from "../components/head";
import * as jose from "jose";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login({ username_given }) {
  const [disabled, setDisabled] = useState(false);
  const reload = () => {
    router.reload(window.location.pathname);
  };
  useEffect(() => {
    if (username_given != null && username_given) {
      router.push("/");
    }
  }, [username_given, disabled]);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          setDisabled(false);
        } else if (e.data.loggedIn == false) {
          setError("Invalid credentials");
          setDisabled(false);
        } else if (e.data.loggedIn == true) {
          const secret = new TextEncoder().encode(
            "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
          );
          const alg = "HS256";
          const jwt = await new jose.SignJWT({
            data: e.data.data,
            type: e.data.type,
          })
            .setProtectedHeader({ alg })
            .sign(secret);
          localStorage.setItem("user", jwt);
          reload();
        } else {
          setError("Some error occured, please try again.");
          setDisabled(false);
        }
      });
  };
  return (
    <>
      <Head
        image="https://www.itsdope.in/social.jpg"
        title="Dope - Login"
        description="Login now to update your profile and avail other festures."
        keword=", login"
        url="login"
      ></Head>
      {username_given != null && username_given == false ? (
        <center className="forms">
          <form className="credentials" onSubmit={auth}>
            <p className="title">Login</p>
            <input
              placeholder="User ID"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              required
            ></input>
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
            ></input>
            <p className="error-1">{error}</p>
            <button action="submit" disabled={disabled}>
              {disabled ? "Loading...." : "Login"}
            </button>
            <p>
              <Link href="/register">Not yet registered ? Register Now</Link>
              <div style={{ marginBottom: 7 }}></div>
              <Link href="/reset">Forgot Password ? Reset here</Link>
            </p>
          </form>
        </center>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
