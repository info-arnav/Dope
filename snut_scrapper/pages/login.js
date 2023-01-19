import axios from "axios";
import Head from "../components/head";
import * as jose from "jose";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login({ username_given }) {
  const reload = () => {
    router.reload(window.location.pathname);
  };
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    if (username_given) {
      router.push("/");
    } else {
      setPageLoad(true);
    }
  }, []);
  const router = useRouter();
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
          sssss;
          setError("Some error occured, please try again.");
        } else if (e.data.loggedIn == false) {
          setError("Invalid credentials");
        } else if (e.data.loggedIn == true) {
          const secret = new TextEncoder().encode(
            "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
          );
          const alg = "HS256";
          const jwt = await new jose.SignJWT({ data: e.data.data })
            .setProtectedHeader({ alg })
            .sign(secret);
          localStorage.setItem("user", jwt);
          reload();
        } else {
          setError("Some error occured, please try again.");
        }
      });
    setDisabled(false);
  };
  return (
    <>
      <Head
        title="Dope - Login"
        description="Login now to update your profile and chat with people you find."
        kewrod=", login"
        url="login"
      ></Head>
      {pageLoad && (
        <center>
          <form className="credntials" onSubmit={auth}>
            <p className="title">Login</p>
            <input
              placeholder="User ID"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="email"
              required
            ></input>
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
            ></input>
            <p>{error}</p>
            <button action="submit" disabled={disabled}>
              {disabled ? "Loading...." : "Login"}
            </button>
          </form>
        </center>
      )}
    </>
  );
}
