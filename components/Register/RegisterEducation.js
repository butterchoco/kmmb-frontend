import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DropzoneArea } from "material-ui-dropzone";
import "../../styles/Form.scss";
import "./RegisterAccordion.scss";
import { useState, useEffect } from "react";
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

const RegisterEducation = (props) => {
	const {
		setRegisterShow,
		setSuccessAlertMessage,
		setErrorAlertMessage,
		user,
		fetchUserData
	} = props;
	const classes = useStyles();
	const RegisterBioPanel = ["ketua", "anggota_1", "anggota_2"];
	const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("Ketua");
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
	const generationOptions = [
		{ key: "2020", text: "2020" },
		{ key: "2019", text: "2019" },
		{ key: "2018", text: "2018" },
		{ key: "2017", text: "2017" },
		{ key: "2016", text: "2016" },
		{ key: "<2016", text: "<2016" },
	];

	useEffect(() => {
		if (user.uid !== undefined) {
			db.collection("user")
				.doc(user.uid)
				.get()
				.then((snap) => {
					const data = snap.data();
					setForm(data);
				});
		}
	}, []);

	const accordionChange = (panel) => (event, isExpanded) => {
		setActiveRegisterBioPanel(isExpanded ? panel : false);
	};

	const handleFileChange = (files, role) => {
		const tempFormFile = _.cloneDeep(formFile);
		const file = files[0];
		_.set(tempFormFile, `${role}`, file);
		if (file != undefined) {
			handleRoleDataChange(
				role,
				"surat_keterangan_mahasiswa",
				`pdf/suratKeteranganMahasiswa/${file.name}_${user.uid}`
			);
		}
		setFormFile(tempFormFile);
	};

	const finalFormValidation = (data) => {
		const formData = form[data];
		const formFileData = formFile[data];
		const extensionAllowed = ["pdf"];
		let formFilled = true;
		const tempError = _.cloneDeep(error);
		let suratKeteranganMahasiswa = [""];
		if (formFileData !== undefined)
			suratKeteranganMahasiswa = formFileData.name.split(".");
		const suratKeteranganMahasiswaExtension =
			suratKeteranganMahasiswa[suratKeteranganMahasiswa.length - 1];
		if (formData.institusi == "") {
			formFilled = false;
			_.set(
				tempError,
				`${data}.institusi`,
				"Masukkan institusi dengan benar !"
			);
			setErrorAlertMessage(
				`Form INSTITUSI biodata ${data.split("_").join(" ")} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.fakultas == "") {
			formFilled = false;
			_.set(tempError, `${data}.fakultas`, "Masukkan fakultas dengan benar !");
			setErrorAlertMessage(
				`Form FAKULTAS biodata ${data.split("_").join(" ")} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.program_studi == "") {
			formFilled = false;
			_.set(
				tempError,
				`${data}.program_studi`,
				"Masukkan program studi dengan benar !"
			);
			setErrorAlertMessage(
				`Form PROGRAM STUDI biodata ${data
					.split("_")
					.join(" ")} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formData.angkatan == "") {
			formFilled = false;
			_.set(tempError, `${data}.angkatan`, "Masukkan angkatan dengan benar !");
			setErrorAlertMessage(
				`Form ANGKATAN biodata ${data.split("_").join(" ")} belum dilengkapi !`
			);
			setError(tempError);
		} else if (formFileData == undefined) {
			formFilled = false;
			_.set(
				tempError,
				`${data}.surat_keterangan_mahasiswa`,
				"Upload surat keterangan mahasiswa aktif dengan benar !"
			);
			setErrorAlertMessage(
				`Form SURAT KETERANGAN MAHASISWA AKTIF biodata ${data
					.split("_")
					.join(" ")} belum dilengkapi !`
			);
			setError(tempError);
		} else if (!extensionAllowed.includes(suratKeteranganMahasiswaExtension)) {
			formFilled = false;
			_.set(
				tempError,
				`${data}.surat_keterangan_mahasiswa`,
				"Upload surat keterangan mahasiswa aktif dengan format .png, .jpg, atau .jpeg !"
			);
			setErrorAlertMessage(
				`Format SURAT KETERANGAN MAHASISWA AKTIF biodata ${data
					.split("_")
					.join(" ")} tidak benar !`
			);
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
			formData.institusi != "" &&
			formData.fakultas != "" &&
			formData.program_studi != "" &&
			formData.angkatan != "" &&
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
			uploadFiles(form.ketua.surat_keterangan_mahasiswa, formFile.ketua);
			uploadFiles(
				form.anggota_1.surat_keterangan_mahasiswa,
				formFile.anggota_1
			);
			uploadFiles(
				form.anggota_2.surat_keterangan_mahasiswa,
				formFile.anggota_2
			);
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
					"Berhasil isi data mahasiswa. Silahkan lakukan pembayaran pendaftaran !"
				);
				setRegisterShow(false);
				fetchUserData(user)
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
									Biodata {data.split("_").join(" ")} -{" "}
									{form[data].nama_lengkap}
								</h4>
								{isFullfilledForm(data)}
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<div className="form">
								<TextField
									label="Institusi"
									value={form[data].institusi}
									error={error[data].institusi}
									onChange={(e) =>
										handleRoleDataChange(data, "institusi", e.target.value)
									}
								/>
								<TextField
									label="Fakultas"
									value={form[data].fakultas}
									error={error[data].fakultas}
									onChange={(e) =>
										handleRoleDataChange(data, "fakultas", e.target.value)
									}
								/>
								<TextField
									label="Program Studi"
									value={form[data].program_studi}
									error={error[data].program_studi}
									onChange={(e) =>
										handleRoleDataChange(data, "program_studi", e.target.value)
									}
								/>
								<Radiobar
									label="Angkatan"
									value={form[data].angkatan}
									error={error[data].angkatan}
									options={generationOptions}
									onChange={(e) =>
										handleRoleDataChange(data, "angkatan", e.target.value)
									}
								/>
								<div className="input-group">
									<DropzoneArea
										onChange={(files) => handleFileChange(files, data)}
										dropzoneText={"Upload Surat Keterangan Mahasiswa Aktif"}
										dropzoneClass={formFile[data] != undefined ? "active" : ""}
										filesLimit={1}
										clearOnUnmount
										showPreviews={true}
										showPreviewsInDropzone={false}
										showAlerts={['error']}
										useChipsForPreview
										previewGridProps={{
											container: { spacing: 1, direction: "row" },
										}}
										previewChipProps={{
											classes: { root: classes.previewChip },
										}}
										previewText="Surat Keterangan Mahasiswa Aktif"
									/>
								</div>
								<label className="muted">
									<span className="material-icons">error</span>Format Penamaan:
									Nama_Institusi_Fakultas.pdf
								</label>
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

export default RegisterEducation;
