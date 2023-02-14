import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
export default function Update({ username_given, type_given }) {
  const [active, setActive] = useState(1);
  const [notices, setNotices] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [reporting, setReporting] = useState("");
  const [requirments, setRequirments] = useState("");
  const [disabled, setDisabled] = useState(false);
  const deleteRecruitment = async (e) => {
    setDisabled(true);
    await axios
      .post("/api/recruitment-delete", {
        id: e,
        token: localStorage.getItem("user"),
      })
      .then((e) => router.reload());
  };
  const createRecruitment = async (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("/api/new-recruitment", {
        title: title,
        description: description,
        location: location,
        department: department,
        reporting: reporting,
        requirments: requirments,
        date: new Date(),
        email: username_given,
        token: localStorage.getItem("user"),
      })
      .then((e) => router.reload());
  };
  const recruitment = async (e) => {
    e.preventDefault();
    setNotices(null);
    await axios
      .post("/api/recruitments", { token: localStorage.getItem("user") })
      .then((e) => {
        setNotices(e.data);
        setActive(2);
      });
  };
  const societies = async (e) => {
    e.preventDefault();
    setNotices(null);
    await axios
      .post("/api/notices", { token: localStorage.getItem("user") })
      .then((e) => {
        setNotices(e.data);
        setActive(1);
      });
  };
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
    if (username_given != null && username_given && type_given == "alumini") {
      axios
        .post("/api/recruitment", {
          email: username_given,
          token: localStorage.getItem("user"),
        })
        .then((e) => setNotices(e.data));
    } else {
      axios
        .post("/api/notices", { token: localStorage.getItem("user") })
        .then((e) => setNotices(e.data));
    }
  }, [username_given]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Societies and Recruitment"
        description="You can view, edit and apply for recuitments here simultaneously checkings society updates.."
        keword=", society, recruitment"
        url="updates"
        image="https://www.itsdope.in/social.jpg"
      ></Head>
      <div style={{ marginTop: 70 }}>
        {username_given != null &&
          username_given != false &&
          type_given == "student" && (
            <div className="update-buttons">
              <button className={active == 1 && "active"} onClick={societies}>
                Societies
              </button>
              <button className={active == 2 && "active"} onClick={recruitment}>
                Recruitments
              </button>
            </div>
          )}
        {username_given != null && username_given != false ? (
          notices ? (
            type_given == "student" ? (
              active == 1 ? (
                <div>
                  <div className="masonry-container">
                    {notices.map((e) => (
                      <a href={`/post/${e._id}`}>
                        <div className="card">
                          <div className="header">
                            <div className="header-image">
                              <img
                                alt="society logo"
                                src={`https://www.itsdope.in/api/image-society/${e.email}`}
                                width={40}
                                height={40}
                              ></img>
                            </div>
                            <div className="header-title">
                              {e.email.toUpperCase()}
                            </div>
                          </div>
                          <div className="body">
                            <img
                              alt="post image"
                              src={`https://www.itsdope.in/api/society-post/${e.image}`}
                            ></img>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="alumini-recruitments">
                  {notices.reverse().map((e) => (
                    <div className="recruiter-card">
                      <div className="header">{e.title}</div>
                      <div className="content">
                        <p>
                          <b>Location :</b> {e.location}
                        </p>
                        <p>
                          <b>Requirments :</b> {e.requirments}
                        </p>
                        <p>
                          <b>By :</b> {e.email}
                        </p>
                        <p>
                          <b>Description :</b>
                          {e.description &&
                            e.description.slice(0, 400) + "....."}
                        </p>
                      </div>
                      <div className="footer">
                        <a href={`/recruitment/${e._id}`}>
                          <button disabled={disabled}>
                            {disabled ? "Loading...." : "View"}
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <>
                <hr
                  className="line"
                  style={{ marginBottom: 20, marginTop: 90 }}
                ></hr>
                <center className="offers-title" style={{ marginTop: 0 }}>
                  Offer Job
                </center>

                <hr className="line" style={{ marginBottom: 0 }}></hr>

                <form className="recruit" onSubmit={createRecruitment}>
                  <div className="row">
                    <div className="col">
                      <label>Company - Position : </label>{" "}
                      <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - Dope - Senior Developer"
                      ></input>
                    </div>
                    <div className="col">
                      <label>Location : </label>{" "}
                      <input
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - India"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Department : </label>{" "}
                      <input
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - App Developer"
                      ></input>
                    </div>
                    <div className="col">
                      <label>Reporting To : </label>{" "}
                      <input
                        required
                        value={reporting}
                        onChange={(e) => setReporting(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - CTO"
                      ></input>
                    </div>
                  </div>{" "}
                  <div className="row">
                    <div className="col">
                      <label>Main Requirments: </label>{" "}
                      <input
                        required
                        value={requirments}
                        onChange={(e) => setRequirments(e.target.value)}
                        className="recruit-input"
                        placeholder="Eg - React"
                      ></input>
                    </div>
                  </div>
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
                        placeholder="Eg - Responsibilities, Requirments, Salary"
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
                <center className="offers-title">Your Offers</center>

                <hr className="line" style={{ marginBottom: 0 }}></hr>
                <div className="alumini-recruitments">
                  {notices.length == 0 && (
                    <div>
                      <br></br>No Offers from your side
                    </div>
                  )}
                  {notices.reverse().map((e) => (
                    <div className="recruiter-card">
                      <div className="header">{e.title}</div>
                      <div className="content">
                        <p>
                          <b>Location :</b> {e.location}
                        </p>
                        <p>
                          <b>Requirments :</b> {e.requirments}
                        </p>
                        <p>
                          <b>Description :</b>{" "}
                          {e.description &&
                            e.description.slice(0, 400) + "....."}
                        </p>
                      </div>
                      <div className="footer">
                        <a href={`/recruitment/${e._id}`}>
                          <button disabled={disabled}>
                            {disabled ? "Loading...." : "View"}
                          </button>
                        </a>
                        <button
                          disabled={disabled}
                          onClick={() => deleteRecruitment(e._id)}
                        >
                          {disabled ? "Loading...." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
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
          )
        ) : (
          <div className="empty"></div>
        )}
      </div>
    </>
  );
}
