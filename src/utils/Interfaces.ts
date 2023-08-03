export interface IQuestion {
	_id: string;
	question: string;
	answer: string;
	skill: string;
	difficulty: string;
	creatorID: string;
	creatorName: string;
	date: string;
	attemptedBy: string[];
	likedBy: string[];
	likes: number;
}

export interface IAnswer {
	_id: string;
	userID: string;
	userName: string;
	answer: string;
	likes: number;
}
