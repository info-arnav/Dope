import Link from "next/link";
import Head from "../components/head";

export default function About() {
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
          <p>Dope</p>
          <Link href="/register">
            <button className="about-button">Register Now</button>
          </Link>
        </div>
      </div>
      <p className="about-title">About</p>
      <div class="masonry-container">
        <div class="masonry-item">
          <a href="https://uk.pinterest.com/pin/436286282624249460/">
            <img src="https://s-media-cache-ak0.pinimg.com/736x/61/4f/1b/614f1b3a481f68b4d492f71c5fe3fc5f.jpg" />
          </a>
          <span>Img 1</span>
        </div>

        <div class="masonry-item">
          <a href="https://uk.pinterest.com/pin/481040803922110845/">
            <img src="https://s-media-cache-ak0.pinimg.com/736x/1d/6f/2d/1d6f2d4fff0f0d4e83456c28b0645bbd.jpg" />
          </a>
          <span>Img 2</span>
        </div>

        <div class="masonry-item">
          <a href="http://grrlathr.com/woodworkingstand/picture-frame-design-on-walls-plans-diy-free-download-plans-to-build-bunk-beds">
            <img src="http://i00.i.aliimg.com/wsphoto/v0/1913341970_3/New-Design-Photo-Frame-Wall-Decals-Memories-Photo-Frame-Vinyl-Wall-Stickers-Home-Decor-Witness-Every.jpg" />
          </a>
          <span>Img 3</span>
        </div>
        <div class="masonry-item">
          <a href="https://uk.pinterest.com/pin/436286282624249460/">
            <img src="https://s-media-cache-ak0.pinimg.com/736x/61/4f/1b/614f1b3a481f68b4d492f71c5fe3fc5f.jpg" />
          </a>
          <span>Img 4</span>
        </div>

        <div class="masonry-item">
          <a href="https://uk.pinterest.com/pin/481040803922110845/">
            <img src="https://s-media-cache-ak0.pinimg.com/736x/1d/6f/2d/1d6f2d4fff0f0d4e83456c28b0645bbd.jpg" />
          </a>
          <span>Img 5</span>
        </div>

        <div class="masonry-item">
          <a href="http://grrlathr.com/woodworkingstand/picture-frame-design-on-walls-plans-diy-free-download-plans-to-build-bunk-beds">
            <img src="http://i00.i.aliimg.com/wsphoto/v0/1913341970_3/New-Design-Photo-Frame-Wall-Decals-Memories-Photo-Frame-Vinyl-Wall-Stickers-Home-Decor-Witness-Every.jpg" />
          </a>
          <span>Img 6</span>
        </div>
      </div>
    </div>
  );
}
