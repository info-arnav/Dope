import Image from "next/image";
import Link from "next/link";
import Head from "../components/head";

export default function About({ username_given }) {
  return (
    <div>
      <Head
        image="https://www.itsdope.in/social.jpg"
        title="Dope - About"
        description="Dope assists NSUT students in making the transition to college, which is a major adjustment in their lives."
        keword=", about"
        url="about"
      ></Head>
      <div className="about-banner">
        <div>
          <p className="about-title large">What are we?</p>
          <div className="inline">
            <p className="about-title-medium">... Simply put, we're </p>
            <p className="about-title">Dope.</p>
          </div>
          <p className="about-content">
            Dope is a platform that makes students' transition to university
            just that much more seemless.
          </p>
          <p className="about-content large">
            Be it keeping upto date with the hectic schedules of societies,
            checking up on your new peers, or even spilling gossip tea, Dope's
            got you covered!
          </p>
          {username_given != null && !username_given ? (
            <Link href="login">
              <button style={{ marginBottom: 20 }}>Login Now</button>
            </Link>
          ) : (
            <Link href="/">
              <button style={{ marginBottom: 20 }}>Update Something</button>
            </Link>
          )}
        </div>
      </div>
      <section className="about-section">
        <div className="row">
          <div className="col">
            <Image
              src="/g1.webp"
              width={290}
              height={290}
              alt="grapic for say goodbye "
            ></Image>
          </div>
          <div className="col vertical">
            <div className="col-title">Say goodbye to asking around!</div>
            <div className="col-content">
              Dope allows users to exchange all their social info with their
              peers at one place.
            </div>
          </div>
        </div>
      </section>
      <section className="about-section gray">
        <div className="row">
          <div className="col vertical">
            <div className="col-title">Distractions, a thing of the past!</div>
            <div className="col-content">
              Dope puts an end to endless scrolling and shows you only what you
              WANT to see. Stay up-to-date with your favourite societies without
              falling into the instagram trap!
            </div>
          </div>
          <div className="col">
            <Image
              src="/g2.webp"
              width={290}
              height={290}
              alt="graphic for distractions a thing"
            ></Image>
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="row">
          <div className="col">
            <Image
              src="/g3.webp"
              width={290}
              height={290}
              alt="graphic"
            ></Image>
          </div>
          <div className="col vertical">
            <div className="col-title">Your batchmates, Your connections!</div>
            <div className="col-content">
              On Dope you can maximise the number of students you connect with
              explading your network
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
