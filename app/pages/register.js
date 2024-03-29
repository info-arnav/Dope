import axios from "axios";
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
    if (username_given != null && username_given) {
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
    axios.post("/api/otp", { username: username }).then(async (e) => {
      if (e.data.error) {
        setError(
          "Some error occured, it should be an nsut official mail id (@nsut.ac.in)."
        );
        setDisabled(false);
      } else if (e.data.registered) {
        setError("Already registered");
        setDisabled(false);
      } else {
        setError(false);
        setShowOtp(true);
        setDisabled(false);
      }
    });
  };
  const auth2 = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    axios.post("/api/verify-otp", { email: username, otp: otp }).then((e) => {
      if (e.data.error) {
        setError("invalid OTP");
        setDisabled(false);
      } else {
        setError(false);
        setChoosePassword(true);
        setDisabled(false);
      }
    });
  };
  const auth3 = async (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    if (password == confirmPassword) {
      axios
        .post("/api/register", {
          username: username,
          password: password,
          otp: otp,
          date: new Date(),
        })
        .then(async (e) => {
          if (e.data.error) {
            setError("Some error occured");
            setDisabled(false);
          } else {
            localStorage.setItem("user", e.data.jwt);
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
                pattern="(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"
                required
              ></input>
              <p style={{ marginBottom: 15, marginTop: 2 }}>
                Must contain letters, special characters, numbers and atleast 6
                characters.
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
              <p className="title">Register</p>
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
                <Link href="/login">Already Registered ? Login</Link>
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
