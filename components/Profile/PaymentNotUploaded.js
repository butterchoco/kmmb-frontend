import "./ProfileContent.scss";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "../../styles/Form.scss";
import Alert from "../Alert";
import { db, storage } from "../firebase/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CircularProgress, Button } from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const PaymentNotUploaded = ({ setStatePayment, userData, user }) => {
  const classes = useStyles();
  const [paymentProof, setPaymentProof] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formValidation = () => {
    if (paymentProof == null) {
      setErrorAlertMessage("Masukkan bukti pembayaran anda terlebih dahulu !");
      return false;
    }
    const paymentProofExtensionAllowed = ["pdf", "png", "jpg", "jpeg"];
    const paymentProoflist = paymentProof.name.split(".");
    const paymentProofExtension = paymentProoflist[paymentProoflist.length - 1];
    if (!paymentProofExtensionAllowed.includes(paymentProofExtension)) {
      setErrorAlertMessage("Format bukti pembayaran tidak benar !");
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
      uploadPaymentProof();
      changeUserData();
    }
  };

  const uploadPaymentProof = () => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child(
      `images/berkasPembayaran/${userData.ketua.nama_lengkap}_${userData.ketua.institusi}_${user.uid}`
    );
    imagesRef.put(paymentProof).catch((error) => {
      setIsLoading(false);
      setErrorAlertMessage(error.message);
    });
  };

  const changeUserData = () => {
    const tempUserData = _.cloneDeep(userData);
    _.set(tempUserData, "verifikasi_pembayaran", "Menunggu Verifikasi");
    _.set(
      tempUserData,
      "bukti_pembayaran",
      `images/berkasPembayaran/${userData.ketua.nama_lengkap}_${userData.ketua.institusi}_${user.uid}`
    );
    db.collection("user")
      .doc(user.uid)
      .set(tempUserData)
      .then(() => {
        setIsLoading(false);
        setStatePayment("Menunggu Verifikasi");
        setSuccessAlertMessage(
          "Berkas Pembayaran sudah diupload. Tunggu proses verifikasi selama 2 hari kerja !"
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorAlertMessage(error.message + " Silahkan coba kembali nanti !");
      });
  };

  return (
    <div className="profileContent__notUploaded">
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

      <p>Lakukan pembayaran ke rekening di bawah ini</p>
      <h3 className="profileContent__notUploaded__nominal">Rp. 200.000</h3>
      <CopyToClipboard
        text="200000"
        onCopy={() => setSuccessAlertMessage("Jumlah uang berhasil dicopy")}
      >
        <a className="copytext">Salin Jumlah</a>
      </CopyToClipboard>
      <p className="profileContent__notUploaded__rekening">
        <span>142-00-1675927-5 (Bank Mandiri)</span>{" "}
        <span>a.n Lukita Widya Nirmala</span>
      </p>
      <CopyToClipboard
        text="1420016759275"
        onCopy={() => setSuccessAlertMessage("Nomor rekening berhasil dicopy")}
      >
        <a className="copytext">Salin Nomor Rekening</a>
      </CopyToClipboard>
      <div className="input-group">
        <DropzoneArea
          onChange={(files) => setPaymentProof(files[0])}
          dropzoneText={"Upload Bukti Pembayaran"}
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
          previewText="Bukti Pembayaran"
        />
        <label className="muted">
          <span className="material-icons">error</span>Format yang
          diperbolehkan: pdf, png, jpg, jpeg.
        </label>
      </div>
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

export default PaymentNotUploaded;
