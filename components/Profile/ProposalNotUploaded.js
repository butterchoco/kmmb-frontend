import "./ProfileContent.scss";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Alert from "../Alert";
import { db, storage } from "../firebase/config";
import { CircularProgress, Button } from "@material-ui/core";
import TextField from "../TextField";
import _ from "lodash";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const ProposalNotUploaded = ({ setStateProposal, userData, user }) => {
  const classes = useStyles();
  const [proposalProof, setProposalProof] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");

  const formValidation = () => {
    if (proposalProof == null) {
      setErrorAlertMessage("Masukkan proposal anda terlebih dahulu !");
      return false;
    } else if (linkVideo == "") {
      setErrorAlertMessage("Masukkan link video anda terlebih dahulu !");
      return false;
    }
    const proposalProofExtensionAllowed = ["pdf"];
    const proposalProoflist = proposalProof.name.split(".");
    const proposalProofExtension =
      proposalProoflist[proposalProoflist.length - 1];
    if (!proposalProofExtensionAllowed.includes(proposalProofExtension)) {
      setErrorAlertMessage("Format proposal tidak benar !");
      return false;
    }
    return true;
  };

  const submitForm = () => {
    setIsLoading(true);
    if (!formValidation()) {
      setIsLoading(false);
      return;
    } else {
      uploadProposalProof();
      changeUserData();
    }
  };

  const uploadProposalProof = () => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child(
      `pdf/proposal/${userData.ketua.nama_lengkap}_${userData.anggota_1.nama_lengkap}_${userData.anggota_2.nama_lengkap}_${user.uid}`
    );
    imagesRef.put(proposalProof).catch((error) => {
      setIsLoading(false);
      setErrorAlertMessage(error.message);
    });
  };

  const changeUserData = () => {
    const tempUserData = _.cloneDeep(userData);
    _.set(tempUserData, "verifikasi_link_proposal", "Menunggu Verifikasi");
    _.set(
      tempUserData,
      "proposal",
      `pdf/proposal/${userData.ketua.nama_lengkap}_${userData.anggota_1.nama_lengkap}_${userData.anggota_2.nama_lengkap}_${user.uid}`
    );
    _.set(tempUserData, "link_video", linkVideo);
    db.collection("user")
      .doc(user.uid)
      .set(tempUserData)
      .then(() => {
        setIsLoading(false);
        setStateProposal("Menunggu Verifikasi");
        setSuccessAlertMessage(
          "Berkas Proposal sudah diupload. Tunggu proses verifikasi selama 2 hari kerja !"
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorAlertMessage(error.message + " Silahkan coba kembali nanti !");
      });
  };

  return (
    <div className="profileContent">
      {successAlertMessage !== "" ? (
        <Alert
          variant="success"
          message={successAlertMessage}
          setMessage={setSuccessAlertMessage}
        />
      ) : null}
      {errorAlertMessage !== "" ? (
        <Alert
          variant="error"
          message={errorAlertMessage}
          setMessage={setErrorAlertMessage}
        />
      ) : null}

      <div className="input-group">
        <DropzoneArea
          onChange={(files) => setProposalProof(files[0])}
          dropzoneText={"Upload Proposal"}
          filesLimit={1}
          clearOnUnmount
          showPreviews={true}
          showPreviewsInDropzone={false}
          useChipsForPreview
          previewGridProps={{
            container: { spacing: 1, direction: "row" },
          }}
          previewChipProps={{
            classes: { root: classes.previewChip },
          }}
          previewText="Proposal"
        />
        <label className="muted">
          <span className="material-icons">error</span>Format yang
          diperbolehkan: pdf.
        </label>
      </div>
      <TextField
        label="Link Video"
        className="invers"
        value={linkVideo}
        style={{ width: "100%", marginTop: "1rem", color: "white !important" }}
        onChange={(e) => setLinkVideo(e.target.value)}
      />
      <Button
        className="profileContent__upload"
        onClick={submitForm}
        color="secondary"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "24px", height: "24px" }} />
        ) : (
          "Lanjut"
        )}
      </Button>
    </div>
  );
};

export default ProposalNotUploaded;
