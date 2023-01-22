import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";

export default function Chat({ username_given }) {
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
  }, [username_given]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Chat"
        description="You can chat with your friends here."
        kewrod=", chat"
        url="chat"
        image="https://wwww.itsdope.in/social.jpg"
      ></Head>
      {username_given != null && username_given != false ? (
        <div className="error">
          <div className="error-title">WAIT!</div>
          <div className="error-message">
            This section is under construction
          </div>
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
