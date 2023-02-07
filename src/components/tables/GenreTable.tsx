import { Box, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ApiManager } from "api/ApiManager";
import { useDebounce } from "hooks/useDebounce";
import { Genre } from "interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";

interface GenreTableProps {}

const GenreTable: React.FC<GenreTableProps> = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchTerm: string = useDebounce<string>(searchValue, 500);
	const tableHeaders = ["Name"];

	const {
		data: genreList,
		refetch: fetchGenres,
		isLoading: isLoadingGenre,
		isRefetching: isRefetchingGenre,
	} = ApiManager.useGetGenres();

	useEffect(() => {
		fetchGenres();
	}, []);

	const filteredList = (): Genre[] => {
		if (genreList) {
			return genreList!.filter((genre: Genre) =>
				genre.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
			);
		}
		return [];
	};

	if (isLoadingGenre || isRefetchingGenre) return <p>Loading</p>;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const openModelDetail = (model: Genre) => {
		navigate(`/model/${model.name}/${model.id}`);
	};

	return (
		<Box h='100vh' py={5} overflowY='hidden'>
			<AdminHeader />
			{genreList && <Input placeholder='Search name' value={searchValue} onChange={handleChange} />}
			<TableContainer maxH={"100%"} overflowY='scroll'>
				<Table variant='striped' colorScheme='blackAlpha'>
					<Thead>
						<Tr>
							{tableHeaders.map((th: string, index: number) => (
								<Th key={index}>{th}</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{filteredList().map((modelType: Genre, idx: number) => (
							<Tr key={idx} onClick={() => openModelDetail(modelType)}>
								{Object.entries(modelType).map(([key, value], idx) => {
									for (let th of tableHeaders) {
										if (th.toLowerCase() === key.toLowerCase()) {
											return <Td key={modelType.id}>{value}</Td>;
										}
									}
								})}
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default GenreTable;
