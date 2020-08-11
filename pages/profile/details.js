import Tabs from "../../components/CustomTabs";
import "../../styles/Tabs.scss";
import { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import EditEducation from "../../components/Profile/Edit/EditEducation";
import EditPrivacy from "../../components/Profile/Edit/EditPrivacy";
import Alert from "../../components/Alert";
import Link from "next/link";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF7614",
    },
    secondary: {
      main: "#841361",
    },
  },
});

const DetailsProfile = (props) => {
  const [detailsSection, setDetailsSection] = useState(0);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const detailsSectionOptions = [
    { text: "Data Pribadi", disabled: false },
    { text: "Data Mahasiswa", disabled: false },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="fullscreenModal">
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

        <Link href="/profile" replace>
          <button className="basic fullscreenModal__close">
            <span className="material-icons">close</span>
          </button>
        </Link>
        <h2 className="fullscreenModal__title" style={{ marginBottom: "1rem" }}>
          Edit Profil Akun
        </h2>
        <Tabs
          value={detailsSection}
          options={detailsSectionOptions}
          onChange={(e, value) => setDetailsSection(value)}
        />
        <div className="fullscreenModal__content">
          {detailsSection === 0 ? (
            <EditPrivacy
              setSuccessAlertMessage={setSuccessAlertMessage}
              setErrorAlertMessage={setErrorAlertMessage}
              {...props}
            />
          ) : (
            <EditEducation
              setSuccessAlertMessage={setSuccessAlertMessage}
              setErrorAlertMessage={setErrorAlertMessage}
              {...props}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DetailsProfile;
