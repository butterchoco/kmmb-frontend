import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DropzoneArea } from "material-ui-dropzone";
import "../../styles/Form.scss";
import "./RegisterAccordion.scss";
import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import TextField from "../TextField";
import Radiobar from "../Radiobar";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const RegisterPrivacy = ({ nextStep }) => {
  const classes = useStyles();
  const RegisterBioPanel = ["ketua", "anggota_1", "anggota_2"];
  const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("Ketua");
  const [form, setForm] = useState({
	bukti_pembayaran: "",
	link_video: "",
	proposal: "",
	verifikasi_link_proposal: "",
	verifikasi_pembayaran: "",
    ketua: {
      alamat: "",
      angkatan: "",
      email: "",
      fakultas: "",
      institusi: "",
      jenis_kelamin: "",
      nama_lengkap: "",
      nomor_telepon: "",
      pas_foto: "",
      program_studi: "",
      surat_keterangan_mahasiswa: "",
    },
    anggota_1: {
      alamat: "",
      angkatan: "",
      email: "",
      fakultas: "",
      institusi: "",
      jenis_kelamin: "",
      nama_lengkap: "",
      nomor_telepon: "",
      pas_foto: "",
      program_studi: "",
      surat_keterangan_mahasiswa: "",
    },
    anggota_2: {
      alamat: "",
      angkatan: "",
      email: "",
      fakultas: "",
      institusi: "",
      jenis_kelamin: "",
      nama_lengkap: "",
      nomor_telepon: "",
      pas_foto: "",
      program_studi: "",
      surat_keterangan_mahasiswa: "",
    },
  });
  const genderOptions = [
    { key: "Laki-Laki", text: "Laki-Laki" },
    { key: "Perempuan", text: "Perempuan" },
  ];

  const accordionChange = (panel) => (event, isExpanded) => {
    setActiveRegisterBioPanel(isExpanded ? panel : false);
  };

  const handleDropdownChange = (files) => {
    console.log("files");
  };

  const isFullfilledForm = (data) => {
    return (
      <div className="registerAccordion__formDescription--success">
        <span className="material-icons">check_circle</span>
      </div>
    );
  };

  return (
    <div className="registerAccordion">
      <div className="registerAccordion__accordion">
        {RegisterBioPanel.map((data, index) => (
          <Accordion
            expanded={data == ActiveRegisterBioPanel}
            key={index}
            onChange={accordionChange(data)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="registerAccordion__formDescription">
                <h4 className="registerAccordion__formDescription__title">
                  Biodata {data.split("_").join(" ")}{" "}
                </h4>
                {isFullfilledForm(data)}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="form">
                <TextField label="Nama Lengkap" />
                <Radiobar
                  label="Jenis Kelamin"
                  value="Laki-Laki"
                  options={genderOptions}
                />
                <TextField label="Alamat" />
                <TextField label="Nomor Telepon" />
                <div className="input-group">
                  <DropzoneArea
                    onChange={handleDropdownChange}
                    dropzoneText={"Upload pas foto"}
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
                    previewText="Selected files"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Button
        color="secondary"
        variant="contained"
        className="registerAccordion__submit"
        onClick={nextStep}
      >
        Lanjut
      </Button>
    </div>
  );
};

export default RegisterPrivacy;
