import { Box, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ButtonAdd from "../buttons/ButtonAdd";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminHeaderProps {}

const AdminHeader: React.FC<AdminHeaderProps> = () => {
	const navigate = useNavigate();
	const [modelType, setModelType] = useState<string>();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname == "/audios") setModelType("audios");
		else setModelType("genres");
	}, [location]);

	const to = () => {
		if (modelType == "audios") navigate("create");
		else navigate("create");
	};
	return (
		<Box>
			<Heading>{"title".toUpperCase()}</Heading>
			{modelType && <ButtonAdd text={modelType} callBack={to} />}
		</Box>
	);
};

export default AdminHeader;
