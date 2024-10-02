import "./home.css";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="heroContainer">
        <div className="title">ALFE Catering</div>
        <p>323 Pebble Chase Ln, Lawrenceville GA 30044</p>
        <p>404-271-645</p>
        <Link className="menuBtn" to="/menu">
          Browse Menu
        </Link>
      </div>
      <div className="contentContainer">
        <div className="aboutUsContainer">
          <h1>About Us</h1>
          <div className="aboutUsImg">
            <img
              alt="aboutUsImg"
              src="https://lh3.googleusercontent.com/pw/AP1GczMhbjZ5hYnS2ZBx0TvfEYUKZk5joQZHSgaO37vu359W_MImpMikr6JyBpLFsg-9UwVWxMTVtoUv6mzysv1Vz9ngcsMhb4xG8jzqhSB2pAmwyx0MGW4=w2400"
            />
          </div>
          <div className="aboutUsContent">
            Welcome to our family-run business, where our passion for authentic
            Filipino cuisine shines through every dish. What began as a simple
            appreciation among friends in our Filipino community has blossomed
            into a mission to share the rich flavors and traditions of our
            homeland. Based in Georgia, we take pride in offering a culinary
            experience that stands out from the rest, bringing the warmth and
            joy of Filipino culture to your table. Join us in celebrating the
            vibrant tastes and stories that make Filipino food truly special.
          </div>
        </div>

        <div className="servicesContainer">
          <h1>Services</h1>
          <div className="servicesContent">
            We offer individual orders for those who want to enjoy our authentic
            Filipino dishes on a personal level, as well as catering services
            for larger events and gatherings. Whether you're craving a meal just
            for yourself or planning a celebration for many, we're here to
            deliver delicious, customized options to meet your needs.
          </div>
        </div>

        <div className="contactsContainer">
          <h1>Contacts</h1>
          <div className="contacts">
            <div className="contactLink">Email</div>
            <div className="contactLink">Phone Number</div>
            <div className="contactLink">FaceBook</div>
            <div className="contactLink">Instagram</div>
            <div className="contactLink">Address</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
