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
  const [changed, setChanged] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [branch, setBranch] = useState("");
  const [company, setCompany] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [roll_no, setRoll_no] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const update = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await axios.post("/api/algolia", {
      method: "update",
      token: localStorage.getItem("user"),
      object: {
        objectID: userData._id,
        roll_no: roll_no,
        image: image ? `https://www.itsdope.in/api/image/${userData._id}` : "",
        name: name,
        bio: bio,
        email: userData.email,
        instagram_id: instagram,
        linkedin: linkedin,
        snapchat: snapchat,
        whatsapp: whatsapp,
        mail: mail,
        github: github,
        branch: branch,
        company: company,
      },
    });
    if (image && image != `https://www.itsdope.in/api/image/${userData._id}`) {
      await axios.post("/api/update-image", {
        email: userData.email,
        image: image,
        id: userData._id,
        token: localStorage.getItem("user"),
      });
    }
    await axios
      .post("/api/update", {
        email: userData.email,
        token: localStorage.getItem("user"),
        changes: {
          email: userData.email,
          roll_no: roll_no,
          image: image
            ? `https://www.itsdope.in/api/image/${userData._id}`
            : "",
          name: name,
          whatsapp: whatsapp,
          mail: mail,
          bio: bio,
          instagram_id: instagram,
          linkedin: linkedin,
          whatsapp: whatsapp,
          snapchat: snapchat,
          github: github,
          branch: branch,
          company: company,
        },
      })
      .then((e) => reload());
  };
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    } else if (username_given != null && username_given) {
      axios
        .post("/api/user", {
          email: username_given,
          token: localStorage.getItem("user"),
        })
        .then((e) => {
          if (e.data.out) {
            localStorage.removeItem("user");
            reload();
          } else {
            setInstagram(e.data.instagram_id);
            setBio(e.data.bio);
            setImage(e.data.image);
            setName(e.data.name);
            setRoll_no(e.data.roll_no);
            setSnapchat(e.data.snapchat);
            setMail(e.data.mail);
            setWhatsapp(e.data.whatsapp);
            setGithub(e.data.github);
            setLinkedin(e.data.linkedin);
            setBranch(e.data.branch);
            setCompany(e.data.company);
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
        title="Dope - Profile"
        description="Edit your profile over here."
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
                  alt="profile picture"
                  src={image || "/profile.webp"}
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
                  <input
                    style={{
                      width: "100%",
                      borderRadius: 5,
                      boxShadow: "#bab5b5 2px 2px 7px 0px",
                      marginTop: 5,
                      border: "none",
                      border: "solid gray 1px",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </p>
                <p>
                  <b>Email :</b>
                  <br className="br-hidden"></br>
                  {" " + (userData.email || "-")}
                </p>
              </div>
            </div>{" "}
            <br className="br-hidden"></br>
            <div className="left">
              {" "}
              <p>
                <b>Branch/Position :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                ></input>
              </p>
              <p>
                <b>Company :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                ></input>
              </p>
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
              <center>
                <b>
                  <hr></hr>
                  <p>Personal Info</p>
                  <hr></hr>
                </b>
              </center>
              <p>
                <b>LinkedIn:</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={linkedin}
                  placeholder="https://www.linkedin.com/in/XXXXXXXXX"
                  onChange={(e) => setLinkedin(e.target.value)}
                ></input>
              </p>
              <p>
                <b>Github :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={github}
                  placeholder="https://github.com/username"
                  onChange={(e) => setGithub(e.target.value)}
                ></input>
              </p>
              <p>
                <b>Whatsapp No :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={whatsapp}
                  placeholder="XXXXXXXX12"
                  onChange={(e) => setWhatsapp(e.target.value)}
                ></input>
              </p>
              <p>
                <b>Instagram :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={instagram}
                  placeholder="nsut.official"
                  onChange={(e) => setInstagram(e.target.value)}
                ></input>
              </p>
              <p>
                <b>Snapchat :</b>{" "}
                <input
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "#bab5b5 2px 2px 7px 0px",
                    marginTop: 5,
                    border: "none",
                    border: "solid grey 1px",
                  }}
                  value={snapchat}
                  placeholder="username"
                  onChange={(e) => setSnapchat(e.target.value)}
                ></input>
              </p>
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
          <video
            width="50"
            height="50"
            autoPlay
            loop
            muted
            style={{ borderRadius: "100%" }}
          >
            <source src="/loading.webm" type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
}
