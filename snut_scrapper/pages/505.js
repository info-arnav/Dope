import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

export default function Error() {
  useEffect(() => {
    if (window.location.pathname != "/505") {
      Router.push("/505");
    }
  }, []);
  return (
    <div className="error">
      <Head>
        <title>Dope - Error 505</title>
        <meta name="title" content="Error 505" />
        <meta name="description" content="Some error occured. Error code 505" />
      </Head>
      <div className="error-title">Error 505</div>
      <div className="error-message">
        Looks like some error occured, no worries just click Home at the top of
        the screen.
      </div>
    </div>
  );
}
