import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";

export default function Chat({ username_given }) {
  useEffect(() => {
    if (username_given == false) {
      router.push("/");
    }
  }, [username_given]);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Dope - Chat</title>
        <meta name="title" content="Dope - Chat" />
        <meta
          name="description"
          content="You can chat with your friends here."
        />
      </Head>
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
