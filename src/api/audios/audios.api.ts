import { errorHandler } from "./../../errorHandler/errorHandler";
import { Audio, CreateAudioDto } from "./../../interfaces/interfaces";
import { instance } from "api/config/axios";
import { useMutation, useQuery, UseQueryResult } from "react-query";

const createAudio = async (audio: CreateAudioDto) => {
	try {
		const formData = new FormData();
		Object.entries(audio).map(([key, value]) => {
			formData.append(key, value.toString());
		});
		formData.append("audioFile", audio.audioFile);
		const response = await instance.post<CreateAudioDto>("/audio/", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response.data;
	} catch (error) {
		return errorHandler(error);
	}
};

const useCreateAudio = () => useMutation(createAudio);

const getAllAudio = async () => {
	try {
		const response = await instance.get<Audio[]>("/audio");
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
};

const useGetAllAudio = (): UseQueryResult<Audio[]> => useQuery("audios", getAllAudio, { enabled: false });
// TODO we got the duration now work in the fetch and edit

export { useCreateAudio, useGetAllAudio };
