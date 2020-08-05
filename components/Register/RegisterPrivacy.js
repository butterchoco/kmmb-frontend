import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DropzoneArea } from "material-ui-dropzone";
import "../../styles/Form.scss";
import "./RegisterPrivacy.scss";
import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
	createStyles({
		previewChip: {
			minWidth: 160,
			maxWidth: 210,
		},
	})
);

const RegisterPrivacy = () => {
	const classes = useStyles();
	const RegisterBioPanel = ["Ketua", "Anggota 1", "Anggota 2"];
	const [ActiveRegisterBioPanel, setActiveRegisterBioPanel] = useState("Ketua");

	const accordionChange = (panel) => (event, isExpanded) => {
		setActiveRegisterBioPanel(isExpanded ? panel : false);
	};

	const handleDropdownChange = (files) => {
		console.log(files);
	};

	const isFullfilledForm = (data) => {
		return (
			<div className="registerPrivacy__formDescription--success">
				<span className="material-icons">check_circle</span>
			</div>
		);
	};

	return (
		<div className="registerPrivacy">
			<div className="registerPrivacy__accordion">
				{RegisterBioPanel.map((data, index) => (
					<Accordion
						expanded={data == ActiveRegisterBioPanel}
						key={index}
						onChange={accordionChange(data)}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<div className="registerPrivacy__formDescription">
								<h4>Biodata {data}</h4>
								{isFullfilledForm(data)}
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<div className="form">
								<div className="input-group">
									<label>Nama Lengkap</label>
									<input placeholder="Masukan nama lengkap" />
								</div>
								<div className="input-group">
									<label>Jenis Kelamin</label>
									<input placeholder="Masukan nama lengkap" />
								</div>
								<div className="input-group">
									<label>Alamat</label>
									<input placeholder="Masukan tempat tinggal anda saat ini" />
								</div>
								<div className="input-group">
									<label>Nomor Telepon</label>
									<input placeholder="Masukan nomor telepon aktif" />
								</div>
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
			<button className="primary registerPrivacy__submit">Lanjut</button>
		</div>
	);
};

export default RegisterPrivacy;
