import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clientPromise from "../middleware/mongodb";
import Head from "../components/head";
import Image from "next/image";

export default function Chat({ username_given, data }) {
  function reload() {
    router.reload();
  }
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
  }, [username_given]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Discover"
        description="Find new people on Dope whome you can connect with."
        kewrod=", discover"
        url="find"
        image="https://wwww.itsdope.in/social.jpg"
      ></Head>
      {username_given != null && username_given != false ? (
        <>
          <button className="find-people" onClick={reload}>
            Find New People
          </button>{" "}
          <div className="grid">
            {data.map((e) => (
              <a className="card" href={`/profile/${e.email}`}>
                <center>
                  <Image
                    width={100}
                    height={100}
                    src={e.image || "/profile.webp"}
                  ></Image>
                  <div className="name">
                    {e.name.toUpperCase() || "Not Provided"}
                  </div>
                  <div className="email">{e.email + "@nsut.ac.in"}</div>
                  <div className="bio">{e.bio || "Not Provided"}</div>
                  {e.insta_predicted.split("*")[0] ? (
                    <div cldivss="instagram_id">
                      {e.insta_predicted.split("*")[0].split("$")[0]}
                    </div>
                  ) : (
                    <div class="instagram_id" disabled>
                      No Prediction
                    </div>
                  )}
                  {e.insta_predicted.split("*")[0] ? (
                    <div class="instagram_name">
                      {e.insta_predicted.split("*")[0].split("$")[1]}
                    </div>
                  ) : (
                    <></>
                  )}
                </center>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}

export async function getServerSideProps(id) {
  id = id.query.id;
  const client = await clientPromise;
  const db = client.db("nsut");
  let data = await db
    .collection("users")
    .aggregate([{ $sample: { size: 20 } }])
    .toArray();
  data = JSON.parse(JSON.stringify(data));
  return { props: { data: data } };
}