import axios from "axios";
import * as jose from "jose";
import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Login({ username_given }) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const reload = () => {
    router.reload(window.location.pathname);
  };
  useEffect(() => {
    if (username_given) {
      router.push("/");
    }
  }, [username_given, disabled]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const [choosePassword, setChoosePassword] = useState("");
  const auth = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    if (
      (username.slice(-15) == "ug22@nsut.ac.in") |
      (username.slice(-16) == "bba22@nsut.ac.in")
    ) {
      axios.post("/api/otp-reset", { username: username }).then(async (e) => {
        if (e.data.error) {
          setError("Some error occured");
          setDisabled(false);
        } else if (e.data.registered) {
          setHash(parseInt(e.data.otp, 16));
          setError(false);
                    setShowOtp(true);
                              setDisabled(false)
         
        } else {
          setError("Not registered");
          setDisabled(false);
        }
      });
    } else {
      setError("Email not of format ug22@nsut.ac.in or bba22@nsut.ac.in");
      setDisabled(false);
    }
  };
  const auth2 = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    if (otp == hash) {
      setError(false);
      setChoosePassword(true);
      setDisabled(false);
    } else {
      setError("invalid OTP");
      setDisabled(false);
    }
  };
  const auth3 = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    if (password == confirmPassword) {
      axios
        .post("/api/register", { username: username, password: password })
        .then(async (e) => {
          if (e.data.error) {
            setError("Some error occured");
            setDisabled(false);
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
      setDisabled(false);
    }
  };
  return (
    <>
      <Head
        image="https://www.itsdope.in/social.jpg"
        title="Dope - Register"
        description="Register now to update your profile and avail other festures"
        keword=", register"
        url="register"
      ></Head>
      {username_given != null && username_given == false ? (
        <center className="forms">
          {choosePassword ? (
            <form className="credentials" onSubmit={auth3}>
              <p className="title">Choose Password</p>
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: 0 }}
                value={password}
                type="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                required
              ></input>
              <p style={{ marginBottom: 15, marginTop: 2 }}>
                Must contain one capital letter, numbers, a special character
                and atleast 8 characters.
              </p>
              <input
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                required
              ></input>
              <p className="error-1">{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Register"}
              </button>
              <button onClick={reload}>Restart ?</button>
            </form>
          ) : showOtp ? (
            <form className="credentials" onSubmit={auth2}>
              <p className="title">Verify OTP</p>
              <input
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="number"
                required
              ></input>
              <p className="error-1">{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Verify"}
              </button>
              <button className="restart" onClick={reload}>
                Restart ?
              </button>
            </form>
          ) : (
            <form className="credentials" onSubmit={auth}>
              <p className="title">Reset Password</p>
              <input
                placeholder="User ID"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="email"
                required
              ></input>
              <p className="error-1">{error}</p>
              <button action="submit" disabled={disabled}>
                {disabled ? "Loading...." : "Send OTP"}
              </button>
              <p>
                <Link href="/login">Remember Password ? Login</Link>
              </p>
            </form>
          )}
        </center>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
