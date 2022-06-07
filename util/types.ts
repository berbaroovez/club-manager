export interface BlogPost {
	time: string;
	title: string;
	summary: string;
}

export interface Game {
	shortDate: string;
	time: string;
	homeTeam: string;
	awayTeam: string;
	location: string;
	locationURL: string;
	result: string;
	matchNumber: string;
	league: "IWSL" | "NISL" | "NPL";
	fullDate: Date;
}

export interface NISLGame extends Game {
	label: string;
	division: string;
}

export interface ChangeLog {
	date: Date;
	category: "Location" | "Team" | "Result" | "Time" | "Date";
	from: string;
	to: string;
	matchNumber: string;
}
export interface Schedule {
	"NISL/NPL"?: NISLGame[];
	"State/President Cup"?: NISLGame[];
	"IWSL"?: Game[];
	docID: string;
	date: Date;
}

export interface LeagueURL {
	league: string;
	url: string;
}

export interface TeamInfo {
	longName: string;
	season: string;
	seasonYear: number;
	leagueURLS: LeagueURL[];
	birthYear: number;
	ageGroup: string;
	coach: string;
	coachEmail: string;
	coachPhone: string;
	docID?: string;
}
