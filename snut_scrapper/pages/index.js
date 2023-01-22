import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function Home({ username_given }) {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const reload = () => {
    router.reload(window.location.pathname);
  };
  useEffect(() => {
    if (username_given) {
      axios
        .post("/api/user", { email: username_given.split("@")[0] })
        .then((e) => setUserData(e.data));
    }
  }, [username_given]);
  return (
    <>
      <Head
        title="Dope"
        description="A social platform for people of NSUT to meet each other online and get to know each other more."
        kewrod=""
        url=""
        image="https://wwww.itsdope.in/social.jpg"
      ></Head>

      {username_given == null ? (
        <div className="empty"></div>
      ) : username_given == false ? (
        <>
          <div className="about-banner">
            <div>
              <p>Dope</p>
              <Link href="/register">
                <button className="about-button">Register Now</button>
              </Link>
            </div>
          </div>
          <p className="about-title">About</p>
          <p className="about-content">
            All of us want to conect with new people of our college all the
            time, but finding instagram accounts, phone numbers, etc is a lot of
            hard work. So we introduce <b>Dope</b>. Dope is a platform which
            helps you socially connect with students of the <b>batch of 2026</b>{" "}
            at NSUT. You just need an email id ending with{" "}
            <b>ug22@nsut.ac.in</b>.<br></br> <br></br>
            We currently make predictions of a students instagram id using
            various sources, however they are not that accurate. To solve this,
            you can{" "}
            <b>
              register with your email address and make suitable changes to your
              data.
            </b>
            <br></br>
            <br></br>Another beinifit of registering is that you can{" "}
            <b>randomly</b> view people whome you may connect with on the app.
            We will try to try to make this a bit more personalized in the
            future.
          </p>
        </>
      ) : userData ? (
        <div className="index">
          <center>
            {userData.image ? (
              <Image src={userData.image} width={150} height={150}></Image>
            ) : (
              <Image src="/profile.webp" width={150} height={150}></Image>
            )}
          </center>
          <button
            onClick={(e) => {
              localStorage.removeItem("user");
              reload();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="empty">
          <Image src="/loading.gif" width={300} height={300}></Image>
        </div>
      )}
    </>
  );
}
