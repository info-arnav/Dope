import axios from "axios";
import * as jose from "jose";
import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";

export default function Login({ username_given }) {
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    if (username_given) {
      router.push("/");
    } else {
      setPageLoad(true);
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState("");
  const [hash, setHash] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [choosePassword, setChoosePassword] = useState("");
  const reload = () => {
    router.reload(window.location.pathname);
  };
  const auth = async (e) => {
    e.preventDefault();
    setError(false);
    if (username.slice(-15) == "ug22@nsut.ac.in") {
      axios.post("/api/otp", { username: username }).then(async (e) => {
        if (e.data.error) {
          setError("Some error occured");
        } else if (e.data.registered) {
          setError("Already registered");
        } else {
          setHash(e.data.otp);
          setError(false);
          setShowOtp(true);
        }
      });
    } else {
      setError("Email not of format ug22@nsut.ac.in");
    }
    setDisabled(false);
  };
  const auth2 = async (e) => {
    e.preventDefault();
    setError(false);
    if (otp == hash) {
      setError(false);
      setChoosePassword(true);
    } else {
      setError("invalid OTP");
    }
    setDisabled(false);
  };
  const auth3 = async (e) => {
    e.preventDefault();
    setError(false);
    if (password == confirmPassword) {
      axios
        .post("/api/register", { username: username, password: password })
        .then(async (e) => {
          if (e.data.error) {
            setError("Some error occured");
          } else {
            const secret = new TextEncoder().encode(
              "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
            );
            const alg = "HS256";
            const jwt = await new jose.SignJWT({ data: e.data.username })
              .setProtectedHeader({ alg })
              .sign(secret);
            localStorage.setItem("user", jwt);
            reload();
          }
        });
    } else {
      setError("Password dont match");
    }
    setDisabled(false);
  };
  return (
    <>
      <Head
        image="https://wwww.itsdope.in/social.png"
        title="Dope - Register"
        description="Register now to update your profile and chat with people you find."
        kewrod=", register"
        url="register"
      ></Head>
      {pageLoad && (
        <center>
          {choosePassword ? (
            <form className="credntials" onSubmit={auth3}>
              <p className="title">Choose Password</p>
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
              ></input>
              <input
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                required
              ></input>
              <p>{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Register"}
              </button>
              <button onClick={reload}>Restart ?</button>
            </form>
          ) : showOtp ? (
            <form className="credntials" onSubmit={auth2}>
              <p className="title">Verify OTP</p>
              <input
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="number"
                required
              ></input>
              <p>{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Verify"}
              </button>
              <button onClick={reload}>Restart ?</button>
            </form>
          ) : (
            <form className="credntials" onSubmit={auth}>
              <p className="title">Register</p>
              <input
                placeholder="User ID"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="email"
                required
              ></input>
              <p>{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Send OTP"}
              </button>
            </form>
          )}
        </center>
      )}
    </>
  );
}
