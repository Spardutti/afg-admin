import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import AudioForm from "components/forms/AudioForm";
import { Audio, Genre } from "interfaces/interfaces";
import React from "react";
import { useAppSelector } from "store/hooks/hooks";
import { RootState } from "store/store";
import { isAudio } from "utils/utils";

interface ModelDetailProps {}

const ModelDetail: React.FC<ModelDetailProps> = () => {
	const selectedModel = useAppSelector((state: RootState) => state.modelReducer.selectedModel);
	return (
		<div>
			<p>detail</p>
			{isAudio(selectedModel) ? <EditAudio audio={selectedModel} /> : null}
		</div>
	);
};

export default ModelDetail;

const EditAudio: React.FC<{ audio: Audio | Genre }> = ({ audio }) => {
	if (isAudio(audio)) {
		return <AudioForm audio={audio} isEdit={true} />;
	} else {
		return <AudioForm isEdit={false} />;
	}
};
