import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function Find({ username_given }) {
  function reload() {
    setLoading(true);
    const fetcher = async () => {
      await axios
        .post("/api/find", { token: localStorage.getItem("user") })
        .then((e) => {
          setData(e.data);
          setLoading(false);
        });
    };
    fetcher();
  }
  useEffect(() => {
    const fetcher = async () => {
      await axios
        .post("/api/find", { token: localStorage.getItem("user") })
        .then((e) => {
          setData(e.data);
          setLoading(false);
        });
    };
    fetcher();
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope"
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
        keword=""
        url=""
        image="https://www.itsdope.in/social.jpg"
      ></Head>
      {username_given != null ? (
        username_given != false ? (
          <>
            <div
              style={{
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <button
                className="find-people"
                onClick={reload}
                style={{
                  marginTop: 90,
                  borderRadius: 20,
                  color: "white",
                  backgroundColor: "#6699EE",
                  width: "100%",
                  height: 35,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Find New People
              </button>
            </div>
            <>
              {loading ? (
                <div
                  className="empty"
                  style={{
                    height: "calc(80vh)",
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
                    alt="loading animation"
                  ></Image>
                </div>
              ) : (
                <>
                  <div className="masonry-container">
                    {data.map((e) => (
                      <a href={`/profile/${e._id}`}>
                        <div className="card">
                          <img
                            alt="profile picture"
                            src={e.image || "profile.webp"}
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
                              <b style={{ marginBottom: 5 }}>{e.name}</b>
                              <p style={{ color: "grey", marginTop: 5 }}>
                                {e.branch || "-"}
                              </p>
                              <p>
                                {e.bio ? e.bio.slice(0, 53) + "....." : "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          </>
        ) : (
          <>
            <div className="about-banner">
              <div>
                <p className="about-title large">What are we?</p>
                <div className="inline">
                  <p className="about-title-medium">... Simply put, we're </p>
                  <p className="about-title">Dope.</p>
                </div>
                <p className="about-content">
                  Dope is a platform that makes your transition to university
                  just that much more seemless.
                </p>
                <p className="about-content large">
                  Be it keeping upto date with the hectic schedules of
                  societies, checking up on your new peers, or even spilling
                  gossip tea, Dope's got you covered!
                </p>
                {username_given != null && !username_given ? (
                  <Link href="register">
                    <button>Sign Up Now</button>
                  </Link>
                ) : (
                  <Link href="/">
                    <button>Find People</button>
                  </Link>
                )}
              </div>
            </div>{" "}
            <section className="about-section">
              <div className="row">
                <div className="col">
                  <Image
                    src="/g1.webp"
                    width={290}
                    height={290}
                    alt="graphic for say to goodbye to asking around"
                  ></Image>
                </div>
                <div className="col vertical">
                  <div className="col-title">Say goodbye to asking around!</div>
                  <div className="col-content">
                    Dope allows users to exchange all their social info with
                    their peers at one place.
                  </div>
                </div>
              </div>
            </section>
            <section className="about-section gray">
              <div className="row">
                <div className="col vertical">
                  <div className="col-title">
                    Distractions, a thing of the past!
                  </div>
                  <div className="col-content">
                    Dope puts an end to endless scrolling and shows you only
                    what you WANT to see. Stay up-to-date with your favourite
                    societies without falling into the instagram trap!
                  </div>
                </div>
                <div className="col">
                  <Image
                    src="/g2.webp"
                    width={290}
                    height={290}
                    alt="graphic for distractions a thing of the past"
                  ></Image>
                </div>
              </div>
            </section>
            <section className="about-section">
              <div className="row">
                <div className="col">
                  <Image
                    src="/g3.webp"
                    width={290}
                    height={290}
                    alt="graphic for about section"
                  ></Image>
                </div>
                <div className="col vertical">
                  <div className="col-title">
                    Your Seniors, Your Recruiters!
                  </div>
                  <div className="col-content">
                    On Dope students of NSUT can view offers made by their own
                    seniors, the alumini of NSUT.
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
