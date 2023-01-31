import Head from "../components/head";
import * as jose from "jose";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login({ username_given }) {
  const [disabled, setDisabled] = useState(false);
  const reload = () => {
    router.push(window.location.pathname);
  };
  useEffect(() => {
    if (username_given) {
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
    fetch(
      Capacitor.isNativePlatform()
        ? "https://www.itsdope.in/api/login"
        : "/api/login",
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ username: username, password: password }),
      }
    )
      .then((e) => e.json())
      .then(async (e) => {
        if (e.error == true) {
          setError("Some error occured, please try again.");
          setDisabled(false);
        } else if (e.loggedIn == false) {
          setError("Invalid credentials");
          setDisabled(false);
        } else if (e.loggedIn == true) {
          const secret = new TextEncoder().encode(
            "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
          );
          const alg = "HS256";
          const jwt = await new jose.SignJWT({ data: e.data })
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
        image="/social.jpg"
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
            <p className="error-1">{error}</p>
            <button action="submit" disabled={disabled}>
              {disabled ? "Loading...." : "Login"}
            </button>
            <p>
              <Link href="/register">Not yet registered ? Register Now</Link>
            </p>
          </form>
        </center>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
