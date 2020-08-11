import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../Register/RegisterAccordion.scss";
import "../../../styles/Form.scss";
import { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, InputLabel } from "@material-ui/core";
import TextField from "../../TextField";
import Radiobar from "../../Radiobar";
import { db, storage } from "../../firebase/config";
import _ from "lodash";

const EditPrivacy = (props) => {
  const {
    userData,
    user,
    fetchUserData,
    setSuccessAlertMessage,
    setErrorAlertMessage,
  } = props;
  const RegisterBioPanel = ["ketua", "anggota_1", "anggota_2"];
  const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("ketua");
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formFile, setFormFile] = useState({
    ketua: "",
    anggota_1: "",
    anggota_2: "",
  });
  const genderOptions = [
    { key: "Laki-Laki", text: "Laki-Laki" },
    { key: "Perempuan", text: "Perempuan" },
  ];

  useEffect(() => {
    if (!_.isEmpty(userData)) {
      setForm(userData);
      fetchStudentCard();
    }
  }, [userData]);

  const accordionChange = (panel) => (event, isExpanded) => {
    setActiveRegisterBioPanel(isExpanded ? panel : false);
  };

  const fetchStudentCard = async () => {
    const pathKetua = storage.ref(userData.ketua.pas_foto);
    const urlKetua = await pathKetua.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    const pathAnggota1 = storage.ref(userData.anggota_1.pas_foto);
    const urlAnggota1 = await pathAnggota1.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    const pathAnggota2 = storage.ref(userData.anggota_2.pas_foto);
    const urlAnggota2 = await pathAnggota2.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    setFormFile({
      ketua: urlKetua,
      anggota_1: urlAnggota1,
      anggota_2: urlAnggota2,
    });
  };

  const handleRoleDataChange = (role, key, data) => {
    let tempForm = _.cloneDeep(form);
    _.set(tempForm, `${role}.${key}`, data);
    setForm(tempForm);
  };

  const checkForm = (data) => {
    if (form[data].nomor_telepon === "") {
      setErrorAlertMessage("Nomor telepon tidak boleh kosong !");
      return false;
    } else if (form[data].email === "") {
      setErrorAlertMessage("Email tidak boleh kosong !");
      return false;
    }
    return true;
  };

  const validateForm = () => {
    return (
      checkForm("ketua") && checkForm("anggota_1") && checkForm("anggota_2")
    );
  };

  const submitForm = () => {
    if (validateForm()) {
      updateDocument();
    }
  };

  const updateDocument = () => {
    db.collection("user")
      .doc(user.uid)
      .set(form)
      .then(() => {
        setIsLoading(false);
        setSuccessAlertMessage("Berhasil mengubah data profil !");
        fetchUserData(user);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorAlertMessage("Gagal mengubah data profil !");
      });
  };

  return (
    <div className="editEducation">
      {!_.isEmpty(form)
        ? RegisterBioPanel.map((data, index) => (
            <Accordion
              expanded={data == ActiveRegisterBioPanel}
              key={index}
              onChange={accordionChange(data)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="registerAccordion__formDescription">
                  <h4 className="registerAccordion__formDescription__title">
                    Biodata {data.split("_").join(" ")} -{" "}
                    {form[data].nama_lengkap.split(" ").splice(0, 2).join(" ")}
                  </h4>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form">
                  <TextField
                    label="Nama Lengkap"
                    value={form[data].nama_lengkap}
                    disabled={true}
                    onChange={(e) =>
                      handleRoleDataChange(data, "nama_lengkap", e.target.value)
                    }
                  />
                  <Radiobar
                    label="Jenis Kelamin"
                    value={form[data].jenis_kelamin}
                    disabled={true}
                    options={genderOptions}
                    onChange={(e) =>
                      handleRoleDataChange(
                        data,
                        "jenis_kelamin",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Alamat"
                    value={form[data].alamat}
                    disabled={true}
                    onChange={(e) =>
                      handleRoleDataChange(data, "alamat", e.target.value)
                    }
                  />
                  <TextField
                    label="Nomor Telepon"
                    value={form[data].nomor_telepon}
                    onChange={(e) =>
                      handleRoleDataChange(
                        data,
                        "nomor_telepon",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Email"
                    value={form[data].email}
                    onChange={(e) =>
                      handleRoleDataChange(data, "email", e.target.value)
                    }
                  />
                  <div className="input-group">
                    <InputLabel shrink>Pas Foto</InputLabel>
                    <a href={formFile[data]} target="_blank">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "5px" }}
                        disableElevation
                      >
                        Download File
                      </Button>
                    </a>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        : null}
      <Button
        color="secondary"
        variant="contained"
        className="registerAccordion__submit"
        onClick={submitForm}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "24px", height: "24px" }} />
        ) : (
          "Edit Profil"
        )}
      </Button>
    </div>
  );
};

export default EditPrivacy;
