import {
	Box,
	Card,
	Flex,
	HStack,
	Input,
	Select,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import { ApiManager } from "api/ApiManager";
import GenreDropdown from "components/dropdown/GenreDropdown";
import { useDebounce } from "hooks/useDebounce";
import { Audio, AudioGenreList, Genre } from "interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";

interface AudioTableProps {}

const AudioTable: React.FC<AudioTableProps> = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchTerm: string = useDebounce<string>(searchValue, 500);
	const navigate = useNavigate();
	const tableHeaders = ["Name", "Duration", "Price", "Genre"];
	const [genreFilter, setGenreFilter] = useState<string>("");

	const {
		data: audioList,
		refetch: fetchAudios,
		isLoading: isLoadingAudio,
		isRefetching: isRefetchingAudio,
	} = ApiManager.useGetAllAudio();

	useEffect(() => {
		fetchAudios();
	}, []);

	const { data: genreList, refetch: fetchGenres, isLoading } = ApiManager.useGetGenres();
	useEffect(() => {
		fetchGenres();
	}, []);

	if (isLoadingAudio || isRefetchingAudio || !audioList) return <p>Loading</p>;

	const filteredList = (): Audio[] => {
		if (audioList) {
			return audioList!.filter(
				(audio: Audio) =>
					audio.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
					audio.genre.some((g: AudioGenreList) => g.name.toLowerCase().includes(genreFilter.toLowerCase()))
			);
		}
		return [];
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const openModelDetail = (model: Audio) => {
		navigate(`/model/${model.name}/${model.id}`);
	};

	return (
		<VStack py={5} height={"100vh"}>
			<AdminHeader />
			{audioList && (
				<HStack>
					<Input placeholder='Search by name' value={searchValue} onChange={handleChange} />
					<Select placeholder='Select Genre' onChange={(e) => setGenreFilter(e.target.value)}>
						{genreList &&
							genreList.map((genre: Genre) => (
								<option key={genre.id} value={genre.name}>
									{genre.name}
								</option>
							))}
					</Select>
				</HStack>
			)}
			<Box overflowY={"scroll"} width='100%'>
				<TableContainer borderColor={"red"} borderTop='2px'>
					<Table variant='striped' colorScheme='blackAlpha'>
						<Thead>
							<Tr>
								{tableHeaders.map((th: string, index: number) => (
									<Th key={index}>{th}</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{filteredList().map((audio: Audio, idx: number) => (
								<Tr key={idx} onClick={() => openModelDetail(audio)}>
									{Object.entries(audio).map(([key, value], idx) => {
										for (let th of tableHeaders) {
											if (th.toLowerCase() === key.toLowerCase()) {
												if (th.toLowerCase() === "genre") {
													return (
														<Td key={key}>
															<HStack>
																{audio.genre.map((g: AudioGenreList) => (
																	<Card p={1} bg='gainsboro' key={g.name}>
																		{g.name}{" "}
																	</Card>
																))}
																;
															</HStack>
														</Td>
													);
												}
												return <Td key={value}>{value}</Td>;
											}
										}
									})}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</VStack>
	);
};

export default AudioTable;
