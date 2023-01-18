import { useRouter } from "next/router";
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
  return <>{pageLoad ? username_given ? <></> : <></> : <></>}</>;
}
