import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import imageCompression from "browser-image-compression";
export default function Update({ username_given, type_given }) {
  const [active, setActive] = useState(1);
  const [notices, setNotices] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [changed, setChanged] = useState("");
  const [reporting, setReporting] = useState("");
  const [image, setImage] = useState("");
  const [requirments, setRequirments] = useState("");
  const [disabled, setDisabled] = useState(false);
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
  const deleteRecruitment = async (e) => {
    setDisabled(true);
    if (e.b) {
      await axios.post("/api/recruitment-delete-image", {
        id: e.b.replace(
          "https://nsut-societies.itsdope.in/api/society-post/",
          ""
        ),
      });
    }
    await axios
      .post("/api/recruitment-delete", { id: e.a })
      .then((a) => router.reload());
  };
  const createRecruitment = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await axios
      .post("/api/society/update-image", {
        image: image,
        email: username_given,
      })
      .then(async (e) => {
        axios
          .post("/api/new-recruitment", {
            title: title,
            description: description,
            image: `https://nsut-societies.itsdope.in/api/society-post/${e.data.id}`,
            date: new Date(),
            email: username_given,
          })
          .then((e) => router.reload());
      });
  };
  const recruitment = async (e) => {
    e.preventDefault();
    setNotices(null);
    await axios.post("/api/recruitments").then((e) => {
      setNotices(e.data);
      setActive(2);
    });
  };
  useEffect(() => {
    axios
      .post("/api/recruitment", { email: username_given })
      .then((e) => setNotices(e.data));
  }, [username_given, type_given, notices]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope"
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
        keword=", dope"
        url=""
        image="https://www.itsdope.in/logo.png"
      ></Head>
      <div style={{ marginTop: 70 }}>
        {username_given != null ? (
          username_given != false ? (
            notices ? (
              <>
                <hr
                  className="line"
                  style={{ marginBottom: 20, marginTop: 90 }}
                ></hr>
                <center className="offers-title" style={{ marginTop: 0 }}>
                  Create Post
                </center>

                <hr className="line" style={{ marginBottom: 0 }}></hr>

                <form className="recruit" onSubmit={createRecruitment}>
                  <div className="row">
                    <div className="col">
                      <label>Title: </label>{" "}
                      <input
                        required
                        value={requirments}
                        onChange={(e) => setRequirments(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - Orientation"
                      ></input>
                    </div>
                  </div>
                  <input
                    id="index-input-image"
                    onChange={imageHandle}
                    type="file"
                    placeholder="Nothing here"
                    required
                  ></input>
                  <div className="row">
                    <div className="col right">
                      <label>Description: </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col right">
                      <textarea
                        className="job-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Eg - Form link"
                      ></textarea>
                    </div>
                  </div>
                  <center>
                    <button
                      type="submit"
                      className="reqruiment-form-button"
                      style={{
                        margin: 10,
                        borderRadius: 20,
                        color: "white",
                        backgroundColor: "#6699EE",
                        border: "none",
                        width: "calc(100% - 20px)",
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        cursor: "pointer",
                      }}
                      disabled={disabled}
                    >
                      {disabled ? "Loading....." : "Create Offer"}
                    </button>
                  </center>
                </form>
                <hr className="line"></hr>
                <center className="offers-title">Your Posts</center>

                <hr className="line" style={{ marginBottom: 0 }}></hr>
                <div className="alumini-recruitments">
                  {notices.length == 0 && (
                    <div>
                      <br></br>No posts yet from your side
                    </div>
                  )}
                  <div className="masonry-container">
                    {notices.map((e) => (
                      <div className="card">
                        <div className="header">
                          <div className="header-image">
                            <img
                              src={`https://nsut-societies.itsdope.in/api/image/${e.email}`}
                              width={40}
                              height={40}
                            ></img>
                          </div>
                          <div className="header-title">{e.email}</div>
                        </div>
                        <div className="body">
                          <img src={e.image || "/logo.png"}></img>
                          <div
                            className="footer"
                            style={{ margin: 10, width: "100%" }}
                          >
                            <button
                              disabled={disabled}
                              style={{
                                borderRadius: 10,
                                border: "solid black",
                                backgroundColor: "white",
                                cursor: "pointer",
                                padding: 5,
                              }}
                              onClick={() =>
                                deleteRecruitment({ a: e._id, b: e.image })
                              }
                            >
                              {disabled ? "Loading...." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
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
                ></Image>
              </div>
            )
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
              </div>
              <section className="about-section">
                <div className="row">
                  <div className="col">
                    <Image src="/g1.jpg" width={290} height={290}></Image>
                  </div>
                  <div className="col vertical">
                    <div className="col-title">
                      Say goodbye to asking around!
                    </div>
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
      </div>
    </>
  );
}
