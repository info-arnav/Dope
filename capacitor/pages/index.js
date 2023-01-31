import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import Head from "../components/head";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    await e.preventDefault();
    setDisabled(true);
    await fetch(
      Capacitor.isNativePlatform()
        ? "https://www.itsdope.in/api/algolia"
        : "/api/algolia",
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          method: "update",
          object: {
            objectID: userData.email,
            roll_no: roll_no,
            image: `https://www.itsdope.in/api/image/${userData.email}`,
            name: name,
            bio: bio,
            instagram_id: instagram,
          },
        }),
      }
    );
    await fetch(
      Capacitor.isNativePlatform()
        ? "https://www.itsdope.in/api/update-image"
        : "/api/update-image",
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email: userData.email,
          image: image,
        }),
      }
    );
    await fetch(
      Capacitor.isNativePlatform()
        ? "https://www.itsdope.in/api/update"
        : "/api/update",
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          method: "update",
          object: {
            email: userData.email,
            changes: {
              email: userData.email,
              roll_no: roll_no,
              image: `https://www.itsdope.in/api/image/${userData.email}`,
              name: name,
              bio: bio,
              instagram_id: instagram,
            },
          },
        }),
      }
    ).then((e) => reload());
  };
  useEffect(() => {
    if (username_given) {
      fetch(
        Capacitor.isNativePlatform()
          ? "https://www.itsdope.in/api/user"
          : "/api/user",
        {
          method: "POST",

          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ email: username_given.split("@")[0] }),
        }
      )
        .then((e) => e.json())
        .then((e) => {
          setInstagram(e.instagram_id);
          setBio(e.bio);
          setImage(e.image);
          setName(e.name);
          setRoll_no(e.roll_no);
          setUserData(e);
        });
    }
  }, [username_given]);
  const imageHandle = async (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
    };
    if (imageFile.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const base64 = await convertBase64(compressedFile);
        setImage(base64);
      } catch (error) {
        reject(error);
      }
    }
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <>
      <Head
        title="Dope"
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
        keword=""
        url=""
        image="/social.jpg"
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
              <div className="title">Image</div>
              <input
                className="profile-input"
                onChange={imageHandle}
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
