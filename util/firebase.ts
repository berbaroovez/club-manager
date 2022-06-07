// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Schedule } from "./types";
import { collection, addDoc, getFirestore, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { ChangeLog, Game, LeagueURL, NISLGame, TeamInfo } from "./types";
// interface SimpleTeamInfo {
// 	leagueURLS: LeagueURL[];
// 	docID: string;
// }

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addNewTeam = async (team: TeamInfo) => {
	try {
		const docRef = await addDoc(collection(db, "teams"), team);

		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

const getTeams = async (): Promise<TeamInfo[] | undefined> => {
	const TeamArray = [] as TeamInfo[];
	try {
		const querySnapshot = await getDocs(collection(db, "teams"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, " => ", doc.data());
			TeamArray.push({ ...doc.data() as TeamInfo, docID: doc.id });
		});
		return TeamArray;
	} catch (e) {
		console.log("errrror", e);
	}
};

const updateTeamInfo = async (teamID: string, teamInfo: TeamInfo) => {
	try {
		console.log("updating team info");
		console.log("teamID", teamID);
		console.log("teamInfo", teamInfo);
		await setDoc(doc(db, "teams", teamID), teamInfo);
	} catch (e) {
		console.log("Error updating team", e);
	}
};

const getAllSchedules = async (): Promise<Schedule[] | null> => {
	const ScheduleArray = [] as Schedule[];
	try {
		const querySnapshot = await getDocs(collection(db, "schedule"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, " => ", doc.data());
			// console.log(doc.id, " => ", doc.data());
			ScheduleArray.push({ ...doc.data(), docID: doc.id } as Schedule);
		});
		return ScheduleArray;
	} catch (e) {
		console.log("errrror", e);
	}
	return null;
};

const getTeamSchedule = async (teamID: string) => {
	try {
		const docRef = doc(db, "schedule", teamID);
		const docSnap = await getDoc(docRef);
		console.log(docSnap.data());
		return docSnap.data() as Schedule;
	} catch (e) {
		console.log("errrror", e);
	}
	return null;
};

const getTeamChangeLog = async (teamID: string) => {
	const ChangeLogArray = [] as ChangeLog[];
	// schedule/${team}/changelogs/`
	try {
		const querySnapshot = await getDocs(
			collection(db, `schedule/${teamID}/changelogs/`),
		);

		querySnapshot.forEach((doc) => {
			ChangeLogArray.push({ ...doc.data() } as ChangeLog);
		});
		return ChangeLogArray;
	} catch (e) {
		console.log("errrror", e);
	}
	return null;
};

const getMatchInfo = async (teamID: string, matchID: string): Promise<
	Game | NISLGame | null
> => {
	try {
		const teamSchedule = await getTeamSchedule(teamID);

		if (teamSchedule !== null) {
			let key: keyof Schedule;

			for (key in teamSchedule) {
				if (key !== "docID" && key !== "date") {
					//we have to check if its IWSL or a NISL format so we can return the correct type
					console.log("KEY", key);
					if (key === "IWSL") {
						const keyData = teamSchedule[key];
						if (keyData !== undefined) {
							for (let i = 0; i < keyData.length; i++) {
								if (keyData[i].matchNumber === matchID) {
									return keyData[i];
								}
							}
						}
					} else {
						console.log("NISL GAME");
						const keyData = teamSchedule[key];
						console.log("keyData", keyData);
						if (keyData !== undefined) {
							for (let i = 0; i < keyData.length; i++) {
								console.log("keyData[i].matchNumber", keyData[i].matchNumber);
								console.log("matchID", matchID);
								if (keyData[i].matchNumber === matchID) {
									return keyData[i];
								}
							}
						}
					}
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
	return null;
};

const getTeamInfo = async (teamID: string) => {
	try {
		const docRef = doc(db, "teams", teamID);
		const docSnap = await getDoc(docRef);

		return docSnap.data() as TeamInfo;
	} catch (e) {
		console.log(e);
	}
	return null;
};

export {
	app,
	db,
	addNewTeam,
	getTeams,
	getAllSchedules,
	auth,
	getTeamInfo,
	getTeamSchedule,
	updateTeamInfo,
	getTeamChangeLog,
	getMatchInfo,
};
