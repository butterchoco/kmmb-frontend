import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import Tabs from "../../components/CustomTabs";
import "../../styles/Profile.scss";
import "../../styles/Tabs.scss";
import ProfileTransaction from "../../components/Profile/ProfileTransaction";
import ProfileProposal from "../../components/Profile/ProfileProposal";
import { withRouter } from "next/router";
import { storage } from "../../components/firebase/config";
import Alert from "../../components/Alert";
import Link from "next/link";

const profile = (props) => {
  const { userData, user, userLoggedIn, router, isLoading } = props;
  const [profileSection, setProfileSection] = useState(0);
  const profileSectionOptions = [
    { text: "Biaya Pendaftaran", disabled: false },
    { text: "Upload Proposal", disabled: false },
  ];
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorAlertMessage, setErrorAlertMessage] = useState(
    "Selesaikan proses pembayaran terlebih dahulu sebelum mengupload proposal !"
  );

  useEffect(() => {
    if (!isLoading) {
      if (!userLoggedIn) {
        router.push("/");
      }
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (userData.ketua !== undefined) {
      const path = storage.ref(userData.ketua.pas_foto);
      path.getDownloadURL().then((url) => {
        setProfilePhoto(url);
      });
    }
  }, [userData]);

  if (!userLoggedIn || userData.ketua == undefined) {
    return null;
  }

  let proposalComponents = null;
  if (userData.verifikasi_pembayaran !== "Terverifikasi") {
    proposalComponents = (
      <div className="profileContent--center">
        <p>Kamu dapat mengupload proposal setelah pembayaran diverifikasi.</p>
        {errorAlertMessage !== "" ? (
          <Alert
            variant="error"
            message={errorAlertMessage}
            setMessage={setErrorAlertMessage}
          />
        ) : null}
      </div>
    );
  } else {
    proposalComponents = <ProfileProposal userData={userData} user={user} />;
  }

  return (
    <Layout {...props}>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__header">
            <div className="profile__photo">
              <div className="profile__photo__wrapper">
                <img
                  src={
                    props.userData.ketua !== undefined ||
                    props.userData.ketua !== null
                      ? profilePhoto
                      : null
                  }
                  alt="profile"
                />
              </div>
            </div>
            <div className="profile__description">
              <h2 className="profile__description__name">
                <span>{userData.ketua.nama_lengkap}</span>{" "}
                <span>(Ketua Tim)</span>
              </h2>
              <p className="profile__description__faculty">
                <span>Jurusan {userData.ketua.program_studi}, </span>
                <span>Fakultas {userData.ketua.fakultas}</span>
              </p>
              <p className="profile__description__institution">
                {userData.ketua.institusi}
              </p>
              <Link href="/profile/details" replace>
                <button className="profile__editProfile secondary">
                  <span className="material-icons">edit</span>Detail Profil
                </button>
              </Link>
            </div>
            <img
              className="profile__header__bg"
              src="/images/profile-header-bg.svg"
              alt="profile_header"
            />
          </div>
          <div className="profile__warning">
            <div className="warning"></div>
          </div>
        </div>
        <Tabs
          options={profileSectionOptions}
          value={profileSection}
          onChange={(event, newValue) => {
            setProfileSection(newValue);
          }}
        />
        <div className="profile__content">
          {profileSection === 0 ? (
            <ProfileTransaction userData={userData} user={user} />
          ) : (
            proposalComponents
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(profile);
