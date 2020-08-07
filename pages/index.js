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
import { useState } from "react";
import RegisterLoginBase from "../components/RegisterLoginBase";

const Index = (props) => {
  const [registerShow, setRegisterShow] = useState(false);

  return (
    <Layout {...props}>
      {registerShow ? (
        <RegisterLoginBase setRegisterShow={setRegisterShow} />
      ) : (
        <div>
          <HeroHeader registerShow={registerShow} setRegisterShow={setRegisterShow} />
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
