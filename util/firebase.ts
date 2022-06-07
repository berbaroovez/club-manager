// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { collection, addDoc, getFirestore, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { Game, LeagueURL, NISLGame, TeamInfo } from "./types";
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

export interface Schedule {
	"NISL/NPL"?: NISLGame[];
	"State/President Cup"?: NISLGame[];
	"IWSL"?: Game[];
	docID: string;
	date: Date;
}

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
};
