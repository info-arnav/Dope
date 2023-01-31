import Link from "next/link";
import Head from "../components/head";

export default function About() {
  return (
    <div>
      <Head
        image="/social.jpg"
        title="Dope - About"
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
        keword=", about"
        url="about"
      ></Head>
      <div className="about-banner">
        <div>
          <p>Dope</p>
          <Link href="/register">
            <button className="about-button">Register Now</button>
          </Link>
        </div>
      </div>
      <p className="about-title">About</p>
      <p className="about-content">
        Dope assists NSUT students in making the transition to college, which is
        a major adjustment in their lives. You can interact and socialise with
        new students at the college by learning details about them, such as
        their Instagram handles, checking out the latest news in society, and
        even discussing any ideas you have in secret. <br></br>
        <br></br>Before any freshmen register, the site already has some
        predicated information about them; all they need to do is register using
        their official email addresses to change that information. <br></br>
        <br></br>
        Need more? Simply post your ideas in the site's anonymous section.
      </p>
    </div>
  );
}
