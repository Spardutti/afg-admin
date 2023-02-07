import { Button, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Audio, CreateAudioDto, Genre, InputAudio } from "interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "@chakra-ui/react";
import { ApiManager } from "api/ApiManager";

interface AudioFormProps {
	isEdit: boolean;
	audio?: Audio;
}

const AudioForm: React.FC<AudioFormProps> = ({ isEdit, audio }) => {
	const [genresList, setGenres] = useState<string[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<InputAudio>();

	const { data: genreList, refetch: getAllGenres } = ApiManager.useGetGenres();

	const setGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			setGenres((prev) => [...prev, e.target.value]);
		} else {
			setGenres((prev) => prev?.filter((n: string) => n != e.target.value));
		}
	};

	const { mutateAsync } = ApiManager.useCreateAudio();

	const onSubmit: SubmitHandler<InputAudio> = async (data) => {
		const { name, price, description, isPremium, audioFile } = data;
		const audioInfo: CreateAudioDto = {
			name,
			price,
			description,
			isPremium,
			genres: JSON.stringify(genresList),
			audioFile: audioFile[0],
		};
		mutateAsync(audioInfo);
	};

	useEffect(() => {
		getAllGenres();
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl>
					<FormLabel htmlFor='name'>Name</FormLabel>
					<Input
						id='name'
						placeholder='name'
						defaultValue={audio?.name}
						{...register("name", {
							required: "This is required",
						})}
					/>
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='Description'>Description</FormLabel>
					<Input
						id='description'
						placeholder='description'
						defaultValue={audio?.description}
						{...register("description", {
							required: "This is required",
						})}
					/>
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='price'>Price</FormLabel>
					<Input
						id='price'
						placeholder='price'
						defaultValue={audio?.price}
						{...register("price", {
							required: "This is required",
						})}
						type='number'
					/>
					<FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
				</FormControl>
				{audio?.audioUrl ? (
					<FormControl>
						<FormLabel htmlFor='file'>File url</FormLabel>
						<Input
							disabled
							id='file'
							placeholder='file'
							defaultValue={audio.audioUrl}
							{...register("audioUrl", {
								required: "This is required",
							})}
						/>
						<FormErrorMessage>{errors.audioUrl && errors.audioUrl.message}</FormErrorMessage>
					</FormControl>
				) : (
					<FormControl>
						<FormLabel htmlFor='file'>file</FormLabel>
						<Input
							id='file'
							placeholder='file'
							{...register("audioFile", {
								required: "This is required",
							})}
							type='file'
						/>
						<FormErrorMessage>{errors.audioFile && errors.audioFile.message}</FormErrorMessage>
					</FormControl>
				)}
				<FormControl>
					<Checkbox {...register("isPremium")}>Is Premium </Checkbox>
				</FormControl>
				{genreList &&
					genreList.map((genre: Genre) => (
						<Checkbox key={genre.id} onChange={setGenre} value={genre.id}>
							{genre.name}
						</Checkbox>
					))}
				<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
					{isEdit ? "Edit" : "Create"}
				</Button>
			</form>
		</>
	);
};

export default AudioForm;
