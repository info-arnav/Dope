import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as jose from "jose";
import axios from "axios";
import Image from "next/image";
import { title } from "process";

export default function Home({ username }) {
  const [usernames, setUsernames] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const reload = () => {
    router.reload(window.location.pathname);
  };
  const create = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await axios
      .post("/api/new-post", {
        username: username,
        title: title,
        description: description,
      })
      .then((e) => {
        if (e.data.error) {
          setError("Some error occures");
          setDisabled(false);
        } else {
          reload();
        }
      });
  };
  const update = async (e) => {
    setDisabled(true);
    await axios
      .post("/api/delete", {
        id: e,
      })
      .then((e) => {
        reload();
      });
  };
  const auth = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError("");
    await axios
      .post("/api/login", { username: usernames, password: password })
      .then(async (e) => {
        if (!e.data.error) {
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
          setError("Some error occured");
          setDisabled(false);
        }
      });
  };
  useEffect(() => {
    if (username) {
      setLoading(true);
      axios.post("/api/user", { society: username }).then((e) => {
        setData(e.data);
        setLoading(false);
      });
    }
  }, [username]);
  return (
    <>
      <Head
        title={`Dope Society`}
        description={`This is the place where societies can provide updates to NSUTians.`}
        keword={`, societies`}
        url={``}
        image={"https://www.itsdope.in/logo.png"}
      ></Head>
      {username == null ? (
        <></>
      ) : username ? (
        <div>
          <nav>
            <div className="soc-name">{username.toUpperCase()}</div>
            <button
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                localStorage.removeItem("user");
                reload();
              }}
            >
              Logout
            </button>
          </nav>
          {loading ? (
            <div
              className="empty"
              style={{
                height: "calc(90vh + 80px)",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                src="/loading.gif"
                style={{ borderRadius: "100%" }}
                width={50}
                height={50}
              ></Image>
            </div>
          ) : (
            <div style={{ marginTop: 90 }}>
              <form onSubmit={create}>
                <center>
                  <p style={{ fontWeight: "bold", fontSize: 24 }}>New Post</p>
                  <input
                    className="inputs"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  ></input>
                  <textarea
                    placeholder="description"
                    value={description}
                    style={{ minHeight: 80 }}
                    className="inputs"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <br></br>
                  <p className="error-1">{error}</p>
                  <button
                    action="submit"
                    className="buttons"
                    disabled={disabled}
                  >
                    {disabled ? "Loading...." : "Add Event"}
                  </button>
                </center>
              </form>
              <br></br>
              <center>
                <p style={{ fontWeight: "bold", fontSize: 24 }}>Past Posts</p>
              </center>
              <div className="grid">
                {data.reverse().map((e) => (
                  <Link className="card" id="soc" href={`/post/${e._id}`}>
                    <div className="socs-name">{e.societies.toUpperCase()}</div>
                    <div className="soc-title">{e.title}</div>
                    <div className="soc-buttons">
                      <button
                        onClick={(es) => {
                          es.preventDefault();
                          setId(e._id);
                          update(e._id);
                        }}
                        disabled={disabled}
                      >
                        {disabled ? "Loading...." : "Delete"}
                      </button>
                      <button
                        onClick={() => {
                          router.push(`/post/${e._id}`);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <center className="forms">
            <form className="credentials" onSubmit={auth}>
              <p className="title">Society Login</p>
              <input
                placeholder="User ID"
                onChange={(e) => setUsernames(e.target.value)}
                value={usernames}
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
            </form>
          </center>
        </>
      )}
    </>
  );
}
