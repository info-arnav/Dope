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
  const [disabled, setDisabled] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [name, setName] = useState("");
  const [roll_no, setRoll_no] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const update = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await axios.post("/api/algolia", {
      method: "update",
      object: {
        objectID: userData.email,
        roll_no: roll_no,
        image: image,
        name: name,
        bio: bio,
        instagram_id: instagram,
      },
    });
    await axios
      .post("/api/update", {
        email: userData.email,
        changes: {
          email: userData.email,
          roll_no: roll_no,
          image: image,
          name: name,
          bio: bio,
          instagram_id: instagram,
        },
      })
      .then((e) => reload());
  };
  useEffect(() => {
    if (username_given) {
      axios
        .post("/api/user", { email: username_given.split("@")[0] })
        .then((e) => {
          setInstagram(e.data.instagram_id);
          setBio(e.data.bio);
          setImage(e.data.image);
          setName(e.data.name);
          setRoll_no(e.data.roll_no);
          setUserData(e.data);
        });
    }
  }, [username_given]);
  return (
    <>
      <Head
        title="Dope"
        description="A social platform for people of NSUT to meet each other online and get to know each other more."
        keword=""
        url=""
        image="https://www.itsdope.in/social.jpg"
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
            future.<br></br>
            <br></br>
            Want More ? We also provide a way for you to view all society
            information at one place on the site once registered.
          </p>
        </>
      ) : userData ? (
        <div className="profile-back">
          <div className="profile-front">
            <center>
              <Image width={200} height={200} src="/profile.webp"></Image>
              <input
                className="profile-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>

              <input
                className="profile-input"
                onChange={(e) => setRoll_no(e.target.value)}
                value={roll_no}
              ></input>

              <hr></hr>
              <br></br>
              <p className="bio">
                <b>
                  <div className="title">Bio</div>
                </b>
                <textarea
                  placeholder="Nothing here"
                  className="profile-text-area"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </p>
            </center>
            <b>
              <div className="title">Email ID</div>
              <input
                className="profile-input"
                disabled
                value={userData.email + "@nsut.ac.in"}
              ></input>
            </b>
            <br></br>
            <b>
              <div className="title">Instagram ID</div>
              <input
                className="profile-input"
                value={instagram}
                placeholder="Nothing here"
                onChange={(e) => setInstagram(e.target.value)}
              ></input>
            </b>
            <br></br>
            <b>
              <div className="title">Image - Coming Soon</div>
              <input
                className="profile-input"
                value={image}
                type="file"
                placeholder="Nothing here"
                disabled
              ></input>
            </b>
            <button
              onClick={update}
              disabled={disabled}
              style={{
                borderRadius: 20,
                color: "white",
                backgroundColor: "black",
                width: "100%",
                cursor: "pointer",
                padding: 10,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              {disabled ? "Loading...." : "Update Profile"}
            </button>
            <button
              onClick={(e) => {
                localStorage.removeItem("user");
                reload();
              }}
              style={{
                borderRadius: 20,
                color: "white",
                backgroundColor: "black",
                width: "100%",
                padding: 10,
                cursor: "pointer",
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">
          <Image src="/loading.gif" width={300} height={300}></Image>
        </div>
      )}
    </>
  );
}
