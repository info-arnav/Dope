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
      <div className="error-title">Error 404</div>
      <div className="error-message">
        Looks like some error occured, no worries just click Home at the top of
        the screen.
      </div>
    </div>
  );
}
