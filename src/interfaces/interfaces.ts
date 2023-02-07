export interface Genre {
	id: number;
	name: string;
}

// This is the audio model that we display
export interface Audio {
	id: number;
	name: string;
	duration: number;
	price: number;
	description: string;
	isPremium: boolean;
	audioUrl: string;
	genre: AudioGenreList[];
}

export interface AudioGenreList {
	name: string;
	AudioGenre: {
		audioId: number;
		genreId: number;
		createdAt: string;
		updateAt: string;
	};
}

// This is what the BE expects to receive
export type CreateAudioDto = {
	name: string;
	// duration: number;
	price: number;
	description: string;
	isPremium: string;
	genres: string;
	audioFile: File;
};

// This are the inputs of the form
export interface InputAudio {
	name: string;
	// duration: number;
	price: number;
	description: string;
	isPremium: string;
	genres: string;
	audioFile: File[];
	audioUrl?: string;
}
