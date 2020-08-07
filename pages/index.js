import Layout from "../components/Layout";
import HeroHeader from "../components/LandingPage/HeroHeader";
import AboutKMMB from "../components/LandingPage/AboutKMMB";
import BackgroundKMMB from "../components/LandingPage/BackgroundKMMB";
import TaglineKMMB from "../components/LandingPage/TaglineKMMB";
import EventKMMB from "../components/LandingPage/EventKMMB";
// import TimelineKMMB from "../components/LandingPage/TimelineKMMB";
import YoutubeEmbed from "../components/LandingPage/YoutubeEmbed";
import InstagramEmbed from "../components/LandingPage/InstagramEmbed";
import "../styles/LandingPage.scss";
import RegisterBase from "../components/Register/RegisterBase";
import LoginBase from "../components/Login/LoginBase";
import { useState } from "react";

const Register = ({ setRegisterShow }) => {
  const [isRegisterComponent, setIsRegisterComponent] = useState(true);

  console.log(isRegisterComponent);
  return (
    <div className="fullscreenModal">
      <button
        className="basic fullscreenModal__close"
        onClick={() => setRegisterShow(false)}
      >
        <span className="material-icons">close</span>
      </button>
      <h2 className="fullscreenModal__title">Daftar KMMB 2020</h2>
      <div className="fullscreenModal__content">
        {isRegisterComponent ? (
          <RegisterBase setIsRegisterComponent={setIsRegisterComponent} />
        ) : (
          <LoginBase setIsRegisterComponent={setIsRegisterComponent} />
        )}
      </div>
    </div>
  );
};

const Index = () => {
  const [registerShow, setRegisterShow] = useState(false);

  return (
    <Layout>
      {registerShow ? (
        <Register setRegisterShow={setRegisterShow} />
      ) : (
        <div>
          <HeroHeader setRegisterShow={setRegisterShow} />
          <AboutKMMB />
          <BackgroundKMMB />
          <TaglineKMMB />
          <EventKMMB />
          {/* <TimelineKMMB /> */}
          <YoutubeEmbed />
          <InstagramEmbed />
        </div>
      )}
    </Layout>
  );
};

export default Index;
