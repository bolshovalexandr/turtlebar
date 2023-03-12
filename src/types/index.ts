type HeroKey = 'pavel' | 'vyp' | 'li' | 'irukka';

export type IHistoryData = {
	[k in HeroKey]: {
		header: string;
		content: {
			subject: string;
			text: string;
		};
	};
};

export type IHeroesData = {
	[k in HeroKey]: {
		header: string;
		content: {
			subject: string;
			text: string;
		};
	};
};
