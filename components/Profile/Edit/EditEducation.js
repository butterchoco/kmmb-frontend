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

const EditEducation = (props) => {
  const { userData } = props;
  const RegisterBioPanel = ["ketua", "anggota_1", "anggota_2"];
  const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("ketua");
  const [form, setForm] = useState({});
  const [formFile, setFormFile] = useState({
    ketua: "",
    anggota_1: "",
    anggota_2: "",
  });
  const generationOptions = [
    { key: "2020", text: "2020" },
    { key: "2019", text: "2019" },
    { key: "2018", text: "2018" },
    { key: "2017", text: "2017" },
    { key: "2016", text: "2016" },
    { key: "<2016", text: "<2016" },
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
    const pathKetua = storage.ref(userData.ketua.surat_keterangan_mahasiswa);
    const urlKetua = await pathKetua.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    const pathAnggota1 = storage.ref(
      userData.anggota_1.surat_keterangan_mahasiswa
    );
    const urlAnggota1 = await pathAnggota1.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    const pathAnggota2 = storage.ref(
      userData.anggota_2.surat_keterangan_mahasiswa
    );
    const urlAnggota2 = await pathAnggota2.getDownloadURL().then((url) => {
      return url.split(" ")[0];
    });
    setFormFile({
      ketua: urlKetua,
      anggota_1: urlAnggota1,
      anggota_2: urlAnggota2,
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
                    disabled={true}
                    label="Institusi"
                    value={form[data].institusi}
                    onChange={(e) =>
                      handleRoleDataChange(data, "institusi", e.target.value)
                    }
                  />
                  <TextField
                    disabled={true}
                    label="Fakultas"
                    value={form[data].fakultas}
                    onChange={(e) =>
                      handleRoleDataChange(data, "fakultas", e.target.value)
                    }
                  />
                  <TextField
                    disabled={true}
                    label="Program Studi"
                    tooltip="Akun "
                    value={form[data].program_studi}
                    onChange={(e) =>
                      handleRoleDataChange(
                        data,
                        "program_studi",
                        e.target.value
                      )
                    }
                  />
                  <Radiobar
                    disabled={true}
                    label="Angkatan"
                    value={form[data].angkatan}
                    options={generationOptions}
                    onChange={(e) =>
                      handleRoleDataChange(data, "angkatan", e.target.value)
                    }
                  />
                  <div className="input-group">
                    <InputLabel shrink>Surat Keterangan Mahasiswa</InputLabel>
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
    </div>
  );
};

export default EditEducation;
