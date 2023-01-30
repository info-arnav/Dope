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
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
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
            Dope assists NSUT students in making the transition to college,
            which is a major adjustment in their lives. You can interact and
            socialise with new students at the college by learning details about
            them, such as their Instagram handles, checking out the latest news
            in society, and even discussing any ideas you have in secret.{" "}
            <br></br>
            <br></br>Before any freshmen register, the site already has some
            predicated information about them; all they need to do is register
            using their official email addresses to change that information.{" "}
            <br></br>
            <br></br>
            Need more? Simply post your ideas in the site's anonymous section.
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
