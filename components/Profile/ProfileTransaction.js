import PaymentNotUploaded from "./PaymentNotUploaded";
import { useState, useEffect } from "react";
import "./ProfileContent.scss";
import Alert from "../Alert";

const UploadedPayment = (statePayment, setStatePayment, userData, user) => {
  const [errorAlertMessage, setErrorAlertMessage] = useState(
    "Pembayaran ditolak. Silahkan upload bukti pembayaran kembali !"
  );

  if (statePayment == "Terverifikasi") {
    return (
      <div className="profileContent--center">
        <img src="/images/terverifikasi.svg" />
        <h4>Akun Terverifikasi</h4>
        <p>
          Kamu dapat mengupload proposalmu sekarang.
          <br />
          Selamat datang di KMMB 2020!
        </p>
      </div>
    );
  } else if (statePayment == "Ditolak") {
    return (
      <div>
        {errorAlertMessage !== "" ? (
          <Alert
            variant="error"
            message={errorAlertMessage}
            setMessage={setErrorAlertMessage}
          />
        ) : null}
        <PaymentNotUploaded
          userData={userData}
          user={user}
          setStatePayment={setStatePayment}
        />
      </div>
    );
  } else if (statePayment == "Menunggu Verifikasi") {
    return (
      <div className="profileContent--center">
        <img src="/images/menunggu_verifikasi.svg" />
        <h4>Tunggu konfirmasi dari kami</h4>
        <p>
          Pembayaran kamu sedang diverifikasi, periksa profil kamu lagi setelah
          2 hari kerja, ya.
        </p>
      </div>
    );
  } else {
    return (
      <PaymentNotUploaded
        userData={userData}
        user={user}
        setStatePayment={setStatePayment}
      />
    );
  }
};

const ProfileTransaction = ({ userData, user }) => {
  const [statePayment, setStatePayment] = useState("");

  useEffect(() => {
    setStatePayment(userData.verifikasi_pembayaran);
  }, [userData]);

  return (
    <div className="profileContent">
      {UploadedPayment(statePayment, setStatePayment, userData, user)}
    </div>
  );
};

export default ProfileTransaction;
