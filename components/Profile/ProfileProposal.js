import ProposalNotUploaded from "./ProposalNotUploaded";
import { useState, useEffect } from "react";
import "./ProfileContent.scss";
import Alert from "../Alert";
import { storage } from "../firebase/config";

const UploadedPayment = (stateProposal, setStateProposal, userData, user) => {
  const [errorAlertMessage, setErrorAlertMessage] = useState(
    "Proposal dan Link Video ditolak. Silahkan revisi dan upload proposal serta link video kembali !"
  );
  const [linkProposal, setLinkProposal] = useState("");

  useEffect(() => {
    if (userData.proposal !== "") {
      const path = storage.ref(userData.proposal);
      path.getDownloadURL().then((url) => {
        setLinkProposal(url.split(" ")[0]);
      });
    }
  }, [userData]);

  if (stateProposal == "Terverifikasi") {
    return (
      <div className="profileContent--center">
        <img src="/images/terverifikasi.svg" alt="verified" />
        <h4>Proposal telah diverifikasi</h4>
        <p>
          Proposal kamu telah diverifikasi. <br />
          Kamu dapat mendownload proposal yang telah kamu kirim disini !
        </p>
        <a href={linkProposal} target="_blank" rel="noopener">
          <button className="secondary" style={{ marginTop: "10px" }}>
            Download Proposal
          </button>
        </a>
      </div>
    );
  } else if (stateProposal == "Ditolak") {
    return (
      <div>
        {errorAlertMessage !== "" ? (
          <Alert
            variant="error"
            message={errorAlertMessage}
            setMessage={setErrorAlertMessage}
          />
        ) : null}
        <ProposalNotUploaded
          userData={userData}
          user={user}
          setStateProposal={setStateProposal}
        />
      </div>
    );
  } else if (stateProposal == "Menunggu Verifikasi") {
    return (
      <div className="profileContent--center">
        <img src="/images/menunggu_verifikasi_proposal.svg" alt="waiting_verified"/>
        <h4>Menunggu verifikasi proposal</h4>
        <p>
          Proposal kamu sedang kami verifikasi. Kamu dapat mendownload proposal
          yang telah kamu kirim disini
        </p>
      </div>
    );
  } else {
    return (
      <ProposalNotUploaded
        userData={userData}
        user={user}
        setStateProposal={setStateProposal}
      />
    );
  }
};

const ProfileProposal = ({ userData, user }) => {
  const [stateProposal, setStateProposal] = useState("");

  useEffect(() => {
    setStateProposal(userData.verifikasi_link_proposal);
  }, [userData]);

  return (
    <div className="profileProposal">
      {UploadedPayment(stateProposal, setStateProposal, userData, user)}
    </div>
  );
};

export default ProfileProposal;
