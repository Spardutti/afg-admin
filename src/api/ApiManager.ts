import { useCreateAudio, useGetAllAudio } from "./audios/audios.api";
import { useCreateGenre, useGetGenres } from "./genres/genres.api";

export const ApiManager = {
	useCreateAudio,
	useGetAllAudio,

	// Genres
	useCreateGenre,
	useGetGenres,
};
