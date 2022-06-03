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
