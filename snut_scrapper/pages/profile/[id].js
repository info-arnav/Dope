import { useRouter } from "next/router";
import Head from "../../components/head";

export default function About({ username_given, loggedIn }) {
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
