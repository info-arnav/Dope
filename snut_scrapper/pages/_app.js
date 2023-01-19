import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import * as jose from "jose";
import { Analytics } from "@vercel/analytics/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import { useEffect, useState } from "react";
export default function Home({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState(false);
  const [show, setShow] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let userStorage = localStorage.getItem("user");
    if (userStorage) {
      const secret = new TextEncoder().encode(
        "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
      );
      const verifier = async () => {
        try {
          const data = await jose.jwtVerify(userStorage, secret);

          if (data.payload.data) {
            setLoggedIn(true);
            setUsername(data.payload.data);
          } else {
            setLoggedIn(false);
            localStorage.removeItem("user");
          }
        } catch {
          setLoggedIn(false);
          localStorage.removeItem("user");
        }
      };
      verifier().then((e) => setLoggedIn(false));
    } else {
      setLoggedIn(false);
    }
    setShow("");
    setLoaded(true);
  }, []);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const Hit = (e) => {
    return (
      <div style={{ marginBottom: 80 }}>
        <p>{e.hit.name}</p>
        <p>{e.hit.roll_no}</p>
        <p>{e.hit.email}@nsut.ac.in</p>
        <>
          <h2>Predicted</h2>
          {e.hit.insta_predicted.split("*").map((e) => {
            let array = e.split("$");
            return (
              <p>
                {array[0]} {array[1]}
              </p>
            );
          })}
        </>
        <>
          <h2>Possibilities</h2>
          {e.hit.insta_posibilities.split("*").map((e) => {
            let array = e.split("$");
            return (
              <p>
                {array[0]} {array[1]}
              </p>
            );
          })}
        </>
      </div>
    );
  };
  return (
    <>
      <Analytics />
      <InstantSearch searchClient={searchClient} indexName="dev_NSUT">
        <nav>
          <Link
            href="/"
            className="image-nav"
            onClick={() => {
              setShow("");
              setLoaded(true);
            }}
          >
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Logo of Dope"
            ></Image>
          </Link>
          <Link
            href="/"
            className="home"
            onClick={() => {
              setShow("");
              setLoaded(true);
            }}
          >
            {loggedIn == null ? "" : loggedIn == false ? "HOME" : "PROFILE"}
          </Link>
          {loaded ? (
            <SearchBox
              onChange={(e) => {
                setShow(e.target.value);
              }}
              showLoadingIndicator={false}
            />
          ) : (
            <input placeholder="Search" disabled></input>
          )}
          {loggedIn == null ? (
            <></>
          ) : loggedIn == false ? (
            <button className="register" disabled>
              <Link
                href="/register"
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
              >
                REGISTER
              </Link>
            </button>
          ) : (
            <></>
          )}
          {loggedIn == null ? (
            <></>
          ) : loggedIn == false ? (
            <button className="login" disabled>
              <Link
                href="/login"
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
              >
                LOGIN
              </Link>
            </button>
          ) : (
            <button className="chat" disabled>
              <Link
                href="/chat"
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
              >
                CHAT
              </Link>
            </button>
          )}
        </nav>
        {show.length > 0 && (
          <main>
            <Hits hitComponent={Hit} />
          </main>
        )}
      </InstantSearch>
      {
        <main>
          {show.length <= 0 && (
            <Component
              loggedIn={loggedIn}
              username_given={username}
              {...pageProps}
              onClick={() => {
                setShow("");
                setLoaded(true);
              }}
            />
          )}
        </main>
      }
      <footer>
        <div className="columns">
          <div className="column col-1">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="logo of dope"
            ></Image>
            <h2 className="footer-title">Dope</h2>
            <br></br>
            <p className="footer-content">
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
              <br></br>
              <br></br>
              Copyright @ 2022 Dope
            </p>
          </div>
          <div className="column">
            <h2>About</h2>
            <br></br>
            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
                href="/about"
              >
                About
              </Link>
            </p>
          </div>
          <div className="column">
            <h2>Get Started</h2>
            <br></br>

            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
                href="/register"
              >
                Register
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
                href="/login"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="column col-4">
            <h2>Legal</h2>
            <br></br>
            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                  setLoaded(true);
                }}
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
