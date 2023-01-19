import { useRouter } from "next/router";
import Head from "../components/head";
import { useEffect, useState } from "react";

export default function Home({ username_given }) {
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    if (username_given) {
      router.push("/");
    } else {
      setPageLoad(true);
    }
  });
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope"
        description="A social platform for people of NSUT to meet each other online and get to know each other more."
        kewrod=""
        url=""
        image="https://wwww.itsdope.in/social.png"
      ></Head>
      {pageLoad && username_given ? <></> : <></>}
    </>
  );
}
