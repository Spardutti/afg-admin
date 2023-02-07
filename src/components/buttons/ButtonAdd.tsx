import { Button, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { MouseEventHandler } from "react";
import { NavigateFunction } from "react-router-dom";

interface ButtonAddProps {
	callBack: () => void;
	text: string;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ text, callBack }) => {
	return (
		<Button leftIcon={<AddIcon />} onClick={callBack}>
			{text}
		</Button>
	);
};

export default ButtonAdd;
