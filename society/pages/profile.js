import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import axios from "axios";
import Image from "next/image";

export default function Home({ username_given }) {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const reload = () => {
    router.reload(window.location.pathname);
  };
  const [disabled, setDisabled] = useState(false);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [changed, setChanged] = useState("");
  const update = async (e) => {
    e.preventDefault();
    setDisabled(true);
    if (image && image != userData.email) {
      await axios.post("/api/update-image", {
        image: image,
        id: userData._id,
        email: userData.email,
        bio: bio,
      });
    }
    await axios
      .post("/api/update", {
        email: userData.email,
        changes: {
          email: userData.email,
          bio: bio,
          image: image ? userData.email : "",
        },
      })
      .then((e) => reload());
  };
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    } else if (username_given) {
      axios.post("/api/user", { email: username_given }).then((e) => {
        if (e.data.out) {
          localStorage.removeItem("user");
          reload();
        } else {
          setImage(e.data.image);
          setBio(e.data.bio);
          setUserData(e.data);
        }
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
        setChanged(true);
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
        title="Dope - Porilfe"
        description="Edit the society profile here."
        keword=", profile"
        url="profile"
        image="https://www.itsdope.in/logo.png"
      ></Head>
      {username_given == null ? (
        <div className="empty"></div>
      ) : username_given == false ? (
        <div className="empty"></div>
      ) : userData ? (
        <div className="profile-back">
          <div className="profile-front">
            <div className="row">
              <div className="col center">
                <input
                  id="profile-input"
                  onChange={imageHandle}
                  type="file"
                  placeholder="Nothing here"
                ></input>
                <img
                  src={
                    `https://nsut-societies.itsdope.in/api/image/${userData.email}` ||
                    "/profile.webp"
                  }
                  onClick={() => {
                    let inputbox = document.getElementById("profile-input");
                    inputbox.click();
                  }}
                  width={100}
                  style={{ borderRadius: 20 }}
                ></img>
                <p style={{ fontSize: 11 }}>click photo to change</p>
              </div>
              <div className="col left">
                <p>
                  <b>Name :</b>
                  <br className="br-hidden"></br>
                  {" " + (userData.email || "-")}
                </p>
              </div>
            </div>{" "}
            <br className="br-hidden"></br>
            <div className="left">
              <p>
                <b>About : </b>{" "}
                <textarea
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </p>{" "}
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
        </div>
      ) : (
        <div
          className="empty"
          style={{
            height: "calc(100vh)",
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
      )}
    </>
  );
}
