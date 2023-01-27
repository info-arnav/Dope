import "../styles/globals.css";
import * as jose from "jose";
import { useState } from "react";
import { useEffect } from "react";

export default function Home({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const verifier = async (userStorage) => {
    try {
      const secret = new TextEncoder().encode(
        "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
      );
      const data = await jose.jwtVerify(userStorage, secret);
      if (data.payload.data) {
        setUsername(data.payload.data);
      } else {
        setUsername(false);
        localStorage.removeItem("user");
      }
    } catch {
      setUsername(false);
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    let userStorage = localStorage.getItem("user");
    if (userStorage) {
      verifier(userStorage);
    } else {
      setUsername(false);
    }
  }, [username]);
  return <Component {...pageProps} username={username} />;
}
