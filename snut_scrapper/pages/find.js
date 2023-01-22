import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clientPromise from "../middleware/mongodb";
import Head from "../components/head";

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
          {data.map((e) => (
            <div>{e.email}</div>
          ))}
          <button onClick={reload}>reload</button>
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
