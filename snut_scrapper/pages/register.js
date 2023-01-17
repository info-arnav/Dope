import axios from "axios";
import * as jose from "jose";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
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
            setHash(e.data.hash);
            setError(false);
            setShowOtp(true);
          }
        });
    } else {
      setError("Password dont match");
    }
    setDisabled(false);
  };
  return (
    <>
      <center>
        {choosePassword ? (
          <form className="credntials" onSubmit={auth3}>
            <p className="title">Choose Password</p>
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
            <input
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            ></input>
            <p>{error}</p>
            <button action="submit" disabled={disabled}>
              Register
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
              required
            ></input>
            <p>{error}</p>
            <button action="submit" disabled={disabled}>
              Verify
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
              required
            ></input>
            <p>{error}</p>
            <button action="submit" disabled={disabled}>
              Send OTP
            </button>
          </form>
        )}
      </center>
    </>
  );
}
