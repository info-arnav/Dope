import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import * as jose from "jose";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
export default function Home({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const [type, setType] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState("");
  const verifier = async (userStorage) => {
    try {
      const secret = new TextEncoder().encode(
        "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
      );
      const data = await jose.jwtVerify(userStorage, secret);
      if (data.payload.data) {
        setUsername(data.payload.data);
        setType(data.payload.type || "student");
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
  const algoliaClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: "",
            params: "",
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };
  const Hit = (e) => {
    return (
      <>
        <div className="card">
          <img
            src={e.hit.image || "/profile.webp"}
            style={{ width: "100%" }}
          ></img>
          <div
            className="body"
            style={{
              marginBottom: 20,
              color: "black",
              textAlign: "center",
            }}
          >
            <br></br>
            <div style={{ fontSize: 13.5, padding: 10 }}>
              <b style={{ marginBottom: 5 }}>{e.hit.name || "-"}</b>
              <p style={{ color: "grey", marginTop: 5 }}>
                {e.hit.branch || "-"}
              </p>
              <p>{e.hit.bio ? e.hit.bio.slice(0, 53) + "....." : "-"}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="dev_NSUT-NEW">
        <nav>
          <Link
            href="/"
            className="image-nav"
            onClick={() => {
              setShow("");
              if (router.pathname == "/") {
                router.reload();
              }
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
              if (router.pathname == "/") {
                router.reload();
              }
            }}
          >
            {username == null ? "     " : username == false ? "HOME" : "UPDATE"}
          </Link>

          {username != null ? (
            username ? (
              <SearchBox
                onChange={(e) => {
                  setShow(e.target.value);
                  window.scrollTo(0, 0);
                }}
                showLoadingIndicator={false}
              />
            ) : (
              <>
                <input disabled placeholder="Login to Search...."></input>
              </>
            )
          ) : (
            <>
              <input disabled placeholder="Login to Search...."></input>
            </>
          )}
          <div style={{ marginLeft: 5 }}></div>
          {username == null ? (
            <a disabled className="nav-image-right">
              <Image
                src="/white.jpg"
                width={35}
                height={35}
                alt="white image"
              ></Image>
            </a>
          ) : username == false ? (
            <Link
              href="/login"
              className="nav-image-right"
              onClick={() => {
                setShow("");
              }}
            >
              {" "}
              <Image
                src="/login.png"
                width={35}
                height={35}
                alt="login icon"
              ></Image>
            </Link>
          ) : (
            <Link
              href="/profile"
              className="nav-image-right"
              onClick={() => {
                setShow("");
              }}
            >
              <Image
                src="/discover.png"
                width={35}
                height={35}
                alt="profile icon"
              ></Image>
            </Link>
          )}
        </nav>
        {show.length > 0 && (
          <main>
            <div className="masonry-container" style={{ marginTop: 90 }}>
              <Hits hitComponent={Hit} />
            </div>
          </main>
        )}
      </InstantSearch>
      {
        <main>
          {show.length <= 0 && (
            <Component
              username_given={username}
              type_given={type}
              {...pageProps}
              onClick={() => {
                setShow("");
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
              Dope assists NSUT students in making the transition to college,
              which is a major adjustment in their lives. Dope was made by Arnav
              Gupta (Dope it).
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
                }}
                href="/about"
              >
                About
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/privacy"
              >
                Privacy Policy
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
                }}
                href="/login"
              >
                Login
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/"
              >
                Posts
              </Link>
            </p>
          </div>
          <div className="column col-4">
            <h2>Social</h2>
            <br></br>
            <p className="links">
              <a
                onClick={() => {
                  setShow("");
                }}
                href="https://www.instagram.com/itsdope.in/"
              >
                Instagram
              </a>
              <br></br>
              <a
                onClick={() => {
                  setShow("");
                }}
                href="https://www.facebook.com/profile.php?id=100089713552189"
              >
                Facebook
              </a>
              <br></br>
              <a
                onClick={() => {
                  setShow("");
                }}
                href="https://www.linkedin.com/company/itsdope-in/"
              >
                LinkedIn
              </a>
              <br></br>
              <a
                onClick={() => {
                  setShow("");
                }}
                href="https://twitter.com/itsdope_nsut"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>
      </footer>
      <Analytics />
    </>
  );
}
