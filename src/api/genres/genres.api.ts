import { errorHandler } from "../../errorHandler/errorHandler";
import { Genre } from "interfaces/interfaces";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import { instance } from "api/config/axios";
import { AxiosError } from "axios";

const createGenre = async (name: string) => {
	try {
		const response = await instance.post<{ name: string }>("/genres/", { name });
		return { status: response.status, message: response.data };
	} catch (error) {
		return errorHandler(error);
	}
};

export const useCreateGenre = () => useMutation(createGenre);

const getGenres = async () => {
	try {
		const response = await instance.get<Genre>("/genres");
		return response.data as Genre;
	} catch (error) {
		return errorHandler(error);
	}
};

export const useGetGenres = (): UseQueryResult<Genre[]> => useQuery("genres", getGenres, { enabled: false });
