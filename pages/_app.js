import "../styles/global.scss";
import { useState, useEffect } from "react";
import { db, auth } from "../components/firebase/config";
import Alert from "../components/Alert";

const KMMBApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState({});
	const [userData, setUserData] = useState({});
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [successAlertMessage, setSuccessAlertMessage] = useState("");
	const [errorAlertMessage, setErrorAlertMessage] = useState("");

	useEffect(() => {
		auth.onAuthStateChanged((userLog) => {
			if (userLog) {
				setUser(userLog);
				setUserLoggedIn(true);
			} else {
				setUser({});
				setUserLoggedIn(false);
			}
		});
	}, []);

	useEffect(() => {
		if (user.uid !== undefined) fetchUserData(user);
	}, [userLoggedIn]);

	const fetchUserData = (user) => {
		db.collection("user")
			.doc(user.uid)
			.get()
			.then((snap) => {
				if (snap.exists) {
					const data = snap.data();
					if (data.ketua == null) {
						setErrorAlertMessage(
							"Akun dihapus dari sistem karna biodata belum terisi sepenuhnya. Silahkan melakukan registrasi ulang !"
						);
						user.delete();
						auth.signOut();
					} else {
						setUserData(data);
					}
				}
			});
	};

	return (
		<div>
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

			<Component
				user={user}
				setUser={setUser}
				userLoggedIn={userLoggedIn}
				setUserLoggedIn={setUserLoggedIn}
				{...pageProps}
			></Component>
		</div>
	);
};

export default KMMBApp;
