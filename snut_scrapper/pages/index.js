import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function Find({ username_given }) {
  function reload() {
    router.reload();
  }
  useEffect(() => {
    const fetcher = async () => {
      await axios.post("/api/find").then((e) => {
        setData(e.data);
        setLoading(false);
      });
    };
    fetcher();
  }, [username_given]);
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
            <button className="find-people" onClick={reload}>
              Find New People
            </button>
            <div className="grid" style={{ minHeight: 800 }}>
              {data.map((e) => (
                <a className="card" href={`/profile/${e.email}`}>
                  <center>
                    {e.image ? (
                      <img width={100} height={100} src={e.image}></img>
                    ) : (
                      <img width={100} height={100} src="/profile.webp"></img>
                    )}
                    <div className="name">
                      {e.name ? e.name.toUpperCase() : "Not Provided"}
                    </div>
                    <div className="email">{e.roll_no}</div>
                    <hr></hr>
                  </center>
                  <b>
                    <div className="title">
                      {!e.instagram_id ? "Prediction" : "Instrgram ID"}
                    </div>
                  </b>
                  {!e.instagram_id ? (
                    e.insta_predicted ? (
                      e.insta_predicted.split("*")[0] ? (
                        <div className="instagram_id">
                          {e.insta_predicted.split("*")[0].split("$")[0]}
                        </div>
                      ) : (
                        <div class="instagram_id" disabled>
                          No Prediction
                        </div>
                      )
                    ) : (
                      <div class="instagram_id" disabled>
                        No Prediction
                      </div>
                    )
                  ) : (
                    <div className="instagram_id">{e.instagram_id}</div>
                  )}
                  {!e.instagram_id ? (
                    e.insta_predicted ? (
                      e.insta_predicted.split("*")[0] ? (
                        <div className="instagram_name">
                          {e.insta_predicted.split("*")[0].split("$")[1]}
                        </div>
                      ) : (
                        <div className="instagram_name"></div>
                      )
                    ) : (
                      <div className="instagram_name"></div>
                    )
                  ) : (
                    <div className="instagram_name"></div>
                  )}
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="about-banner">
              <div>
                <p className="about-title large">What are we ?</p>
                <div className="inline">
                  <p className="about-title-medium">... Simply put, we're </p>
                  <p className="about-title">Dope.</p>
                </div>
                <p className="about-content">
                  Dope is a platform that makes your transition to university
                  just that more seamless.
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
                  <Image src="/g1.jpg" width={290} height={290}></Image>
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
                  <Image src="/g2.jpg" width={290} height={290}></Image>
                </div>
              </div>
            </section>
            <section className="about-section">
              <div className="row">
                <div className="col">
                  <Image src="/g3.png" width={290} height={290}></Image>
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
