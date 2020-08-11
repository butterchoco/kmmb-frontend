import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DropzoneArea } from "material-ui-dropzone";
import "../../styles/Form.scss";
import "./RegisterAccordion.scss";
import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import TextField from "../TextField";
import Radiobar from "../Radiobar";
import { db, storage } from "../firebase/config";
import _ from "lodash";

const useStyles = makeStyles((theme) =>
	createStyles({
		previewChip: {
			minWidth: 160,
			maxWidth: 210,
		},
	})
);

const INITIAL_USER = {
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
};

const RegisterPrivacy = (props) => {
	const {
		nextStep,
		setSuccessAlertMessage,
		setErrorAlertMessage,
		user,
	} = props;
	const classes = useStyles();
	const RegisterBioPanel = ["ketua", "anggota_1", "anggota_2"];
	const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("ketua");
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		bukti_pembayaran: "",
		link_video: "",
		proposal: "",
		verifikasi_link_proposal: "Belum Mengupload",
        verifikasi_pembayaran: "Belum Membayar",
		ketua: _.cloneDeep(INITIAL_USER),
		anggota_1: _.cloneDeep(INITIAL_USER),
		anggota_2: _.cloneDeep(INITIAL_USER),
	});
	const [formFile, setFormFile] = useState({
		ketua: undefined,
		anggota_1: undefined,
		anggota_2: undefined,
	});
	const [error, setError] = useState({
		ketua: _.cloneDeep(INITIAL_USER),
		anggota_1: _.cloneDeep(INITIAL_USER),
		anggota_2: _.cloneDeep(INITIAL_USER),
	});
	const genderOptions = [
		{ key: "Laki-Laki", text: "Laki-Laki" },
		{ key: "Perempuan", text: "Perempuan" },
	];

	const accordionChange = (panel) => (event, isExpanded) => {
		setActiveRegisterBioPanel(isExpanded ? panel : false);
	};

	const handleFileChange = (files, role) => {
		const tempFormFile = _.cloneDeep(formFile);
		const file = files[0];
		let fileName = "";
		if (file != undefined) {
			fileName = `images/pasFoto/${user.uid}__${file.name}`;
		}
		_.set(tempFormFile, `${role}`, file);
		setFormFile(tempFormFile);
		handleRoleDataChange(role, "pas_foto", fileName);
	};

	const finalFormValidation = (data) => {
		const formData = form[data];
		const extensionAllowed = ["png", "jpg", "jpeg"];
		let formFilled = true;
		const tempError = _.cloneDeep(error);
		let alertError = "";
		const pasFoto = formData.pas_foto.split(".");
		const pasFotoExtension = pasFoto[pasFoto.length - 1];
		if (formData.nama_lengkap == "") {
			formFilled = false;
			_.set(
				tempError,
				`${data}.nama_lengkap`,
				"Masukkan nama lengkap dengan benar !"
			);
			setErrorAlertMessage(
				`Form NAMA LENGKAP biodata ${data} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.jenis_kelamin == "") {
			formFilled = false;
			_.set(
				tempError,
				`${data}.jenis_kelamin`,
				"Masukkan jenis kelamin dengan benar !"
			);
			setErrorAlertMessage(
				`Form JENIS KELAMIN biodata ${data} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.alamat == "") {
			formFilled = false;
			_.set(tempError, `${data}.alamat`, "Masukkan alamat dengan benar !");
			setErrorAlertMessage(`Form ALAMAT biodata ${data} belum dilengkapi !`);
			setError(tempError);
		} else if (formData.email == "") {
			formFilled = false;
			_.set(tempError, `${data}.email`, "Masukkan email dengan benar !");
			setErrorAlertMessage(`Form EMAIL biodata ${data} belum dilengkapi !`);
			setError(tempError);
		} else if (!formData.email.includes("@")) {
			formFilled = false;
			_.set(tempError, `${data}.email`, "Masukkan email dengan benar !");
			setErrorAlertMessage(`Format EMAIL biodata ${data} tidak benar !`);
			setError(tempError);
		} else if (formData.nomor_telepon == "") {
			formFilled = false;
			_.set(
				tempError,
				`${data}.nomor_telepon`,
				"Masukkan nomor telepon dengan benar !"
			);
			setErrorAlertMessage(
				`Form NOMOR TELEPON biodata ${data} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.pas_foto == "") {
			formFilled = false;
			_.set(tempError, `${data}.pas_foto`, "Upload pas foto dengan benar !");
			setErrorAlertMessage(`Form PAS FOTO biodata ${data} belum dilengkapi !`);
			setError(tempError);
		} else if (!extensionAllowed.includes(pasFotoExtension)) {
			formFilled = false;
			_.set(
				tempError,
				`${data}.pas_foto`,
				"Upload pas foto dengan format .png, .jpg, atau .jpeg !"
			);
			setErrorAlertMessage(`Format PAS FOTO biodata ${data} tidak benar !`);
			setError(tempError);
		}
		return formFilled;
	};

	const RESET_ERROR_FIELD = (role, field) => {
		const tempError = _.cloneDeep(error);
		_.set(tempError, `${role}.${field}`, "");
		setError(tempError);
	};

	const isFormRoleFilled = (data) => {
		const formData = form[data];
		const formFileData = formFile[data];
		return (
			formData.alamat != "" &&
			formData.jenis_kelamin != "" &&
			formData.nama_lengkap != "" &&
			formData.nomor_telepon != "" &&
			formData.email != "" &&
			formData.pas_foto != "" &&
			formFileData != undefined
		);
	};

	const isFullfilledForm = (data) => {
		if (isFormRoleFilled(data)) {
			return (
				<div className="registerAccordion__formDescription--success">
					<span className="material-icons">check_circle</span>
				</div>
			);
		} else {
			return (
				<div className="registerAccordion__formDescription--error">
					<span className="material-icons">remove_circle</span>
				</div>
			);
		}
	};

	const handleRoleDataChange = (role, key, data) => {
		let tempForm = _.cloneDeep(form);
		_.set(tempForm, `${role}.${key}`, data);
		setForm(tempForm);
		RESET_ERROR_FIELD(role, key);
	};

	const validateForm = async () => {
		const isBiodataAnggota2Filled = finalFormValidation("anggota_2");
		const isBiodataAnggota1Filled = finalFormValidation("anggota_1");
		const isBiodataKetuaFilled = finalFormValidation("ketua");
		return (
			isBiodataKetuaFilled && isBiodataAnggota1Filled && isBiodataAnggota2Filled
		);
	};

	const submitForm = async () => {
		setIsLoading(true);
		const isValidated = await validateForm();
		if (isValidated) {
			uploadFiles(form.ketua.pas_foto, formFile.ketua);
			uploadFiles(form.anggota_1.pas_foto, formFile.anggota_1);
			uploadFiles(form.anggota_2.pas_foto, formFile.anggota_2);
			updateDocument();
		} else {
			setIsLoading(false);
			return;
		}
	};

	const uploadFiles = (path, file) => {
		const storageRef = storage.ref();
		const imagesRef = storageRef.child(path);
		imagesRef.put(file).catch((error) => {
			setIsLoading(false);
			setErrorAlertMessage(error.message);
		});
	};

	const updateDocument = () => {
		db.collection("user")
			.doc(user.uid)
			.set(form)
			.then(() => {
				setIsLoading(false);
				setSuccessAlertMessage(
					"Berhasil isi data pribadi. Silahkan isi data mahasiswa !"
				);
				nextStep();
			})
			.catch(() => {
				setIsLoading(false);
				setErrorAlertMessage("Gagal mengisi data pribadi !");
			});
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
								<TextField
									label="Nama Lengkap"
									value={form[data].nama_lengkap}
									error={error[data].nama_lengkap}
									onChange={(e) =>
										handleRoleDataChange(data, "nama_lengkap", e.target.value)
									}
								/>
								<Radiobar
									label="Jenis Kelamin"
									value={form[data].jenis_kelamin}
									error={error[data].jenis_kelamin}
									options={genderOptions}
									onChange={(e) =>
										handleRoleDataChange(data, "jenis_kelamin", e.target.value)
									}
								/>
								<TextField
									label="Alamat"
									value={form[data].alamat}
									error={error[data].alamat}
									onChange={(e) =>
										handleRoleDataChange(data, "alamat", e.target.value)
									}
								/>
								<TextField
									label="Nomor Telepon"
									value={form[data].nomor_telepon}
									error={error[data].nomor_telepon}
									onChange={(e) =>
										handleRoleDataChange(data, "nomor_telepon", e.target.value)
									}
								/>
								<TextField
									label="Email"
									value={form[data].email}
									error={error[data].email}
									onChange={(e) =>
										handleRoleDataChange(data, "email", e.target.value)
									}
								/>
								<div className="input-group">
									<DropzoneArea
										onChange={(files) => handleFileChange(files, data)}
										dropzoneText={"Upload pas foto"}
										dropzoneClass={formFile[data] != undefined ? "active" : ""}
										filesLimit={1}
										clearOnUnmount
										showPreviews={true}
										showPreviewsInDropzone={false}
										useChipsForPreview
										showAlerts={['error']}
										previewGridProps={{
											container: { spacing: 1, direction: "row" },
										}}
										previewChipProps={{
											classes: { root: classes.previewChip },
										}}
										previewText="Pas Foto"
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
				onClick={submitForm}
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

export default RegisterPrivacy;
