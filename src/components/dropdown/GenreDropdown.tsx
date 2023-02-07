import { ApiManager } from "api/ApiManager";
import React, { useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { Audio, AudioGenreList, Genre } from "interfaces/interfaces";

interface GenreDropdownProps {
	audioList: Audio[];
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({ audioList }) => {
	const { data: genreList, refetch: fetchGenres, isLoading } = ApiManager.useGetGenres();
	useEffect(() => {
		fetchGenres();
	}, []);
	if (isLoading) return <p>Loading</p>;

	const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioList) {
			return audioList!.filter((audio: Audio) =>
				audio.genre.some((g: AudioGenreList) => g.name.toLowerCase().includes(e.target.value))
			);
		}
	};
	return (
		<Select placeholder='Select Genre'>
			{genreList && genreList.map((genre: Genre) => <option value={genre.name}>{genre.name}</option>)}
		</Select>
	);
};

export default GenreDropdown;
