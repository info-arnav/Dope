import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ username_given, loggedIn }) {
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    if (loggedIn == false) {
      router.push("");
    } else if (loggedIn) {
      setPageLoad(true);
    }
  }, []);
  const router = useRouter();
  return <>{pageLoad ? loggedIn ? <></> : <></> : <></>}</>;
}
