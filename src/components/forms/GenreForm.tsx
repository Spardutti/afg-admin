import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { ApiManager } from "api/ApiManager";
import { Genre } from "interfaces/interfaces";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface GenreFormProps {
	isEdit: boolean;
	genre?: Genre;
}

const GenreForm: React.FC<GenreFormProps> = ({ isEdit, genre }) => {
	const [serverErrors, setServerErrors] = useState();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, isLoading, isValid },
	} = useForm<{ name: string }>({ mode: "onChange" });

	const { mutateAsync: createGenre } = ApiManager.useCreateGenre();

	const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
		const { name } = data;
		const response = await createGenre(name);
		
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={Boolean(errors.name)}>
				<FormLabel htmlFor='name'>Name</FormLabel>
				<Input
					id='name'
					placeholder='name'
					defaultValue={genre?.name}
					{...register("name", {
						required: {
							message: "This field is required",
							value: true,
						},
					})}
				/>
				<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				<FormLabel>{serverErrors && serverErrors}</FormLabel>
			</FormControl>
			<Button mt={4} colorScheme='teal' isDisabled={!isValid} isLoading={isSubmitting} type='submit'>
				{isEdit ? "Edit" : "Create"}
			</Button>
		</form>
	);
};

export default GenreForm;
