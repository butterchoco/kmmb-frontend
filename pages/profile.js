import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Tabs from "../components/CustomTabs";
import "../styles/Profile.scss";
import { withRouter } from "next/router";

const profile = (props) => {
  const [profileSection, setProfileSection] = useState("biaya");
  const profileSectionOptions = [
    { text: "Biaya Pendaftaran", disabled: false },
  ];

  useEffect(() => {
    if (!props.userLoggedIn) {
      props.router.push("/");
    }
  }, [props.userLoggedIn]);

  if (!props.userLoggedIn) {
    return null;
  }

  return (
    <Layout {...props}>
      <div className="profile">
        <div className="profile__header"></div>
        <Tabs
          options={profileSectionOptions}
          value={profileSection}
          onChange={(e) => setProfileSection(e.target.value)}
        />
      </div>
    </Layout>
  );
};

export default withRouter(profile);
