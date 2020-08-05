import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DropzoneArea } from "material-ui-dropzone";
import "../../styles/Form.scss";
import "./RegisterEducation.scss";
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

const RegisterEducation = () => {
	const classes = useStyles();
	const RegisterBioPanel = ["Ketua", "Anggota 1", "Anggota 2"];
	const [ActiveRegisterBioPanel, setActiveBioPanel] = useState("Ketua");

	const accordionChange = (panel) => (event, isExpanded) => {
		setActiveBioPanel(isExpanded ? panel : false);
	};

	const handleDropdownChange = (files) => {
		console.log(files);
	};

	return (
		<div className="registerEducation">
			{RegisterBioPanel.map((data, index) => (
				<Accordion
					expanded={data == ActiveRegisterBioPanel}
					key={index}
					onChange={accordionChange(data)}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<h4>Biodata {data}</h4>
					</AccordionSummary>
					<AccordionDetails>
						<div className="form">
							<div className="input-group">
								<label>Institusi</label>
								<input placeholder="Masukkan asal universitas atau institusi" />
							</div>
							<div className="input-group">
								<label>Fakultas</label>
								<input placeholder="Masukkan asal fakultas" />
							</div>
							<div className="input-group">
								<label>Program Studi</label>
								<input placeholder="Masukkan asal program studi" />
							</div>
							<div className="input-group">
								<label>Angkatan</label>
								<input placeholder="Masukan nomor telepon aktif" />
							</div>
							<div className="input-group">
								<DropzoneArea
									onChange={handleDropdownChange}
									filesLimit={1}
									clearOnUnmount
									showPreviews={true}
									showPreviewsInDropzone={false}
									useChipsForPreview
									previewGridProps={{
										container: { spacing: 1, direction: "row" },
									}}
									previewChipProps={{ classes: { root: classes.previewChip } }}
									previewText="Selected files"
								/>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default RegisterEducation;
