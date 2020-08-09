import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
			}}
		>
			<CircularProgress color="primary" />
		</div>
	);
}
