import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";

export default function Error() {
  useEffect(() => {
    if (window.location.pathname != "/404") {
      Router.push("/404");
    }
  }, []);
  return (
    <div className="error">
      <Head>
        <title>Dope - Error 404</title>
        <meta name="title" content="Error 404" />
        <meta name="description" content="Some error occured. Error code 404" />
      </Head>
      <div className="error-title">Error 404</div>
      <div className="error-message">
        Looks like some error occured, no worries just click Home at the top of
        the screen.
      </div>
    </div>
  );
}
