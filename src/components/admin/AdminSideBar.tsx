import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface AdminSideBarProps {}

const AdminSideBar: React.FC<AdminSideBarProps> = () => {
	const navigate = useNavigate();

	return (
		<Box bg={"gray.300"} p={5} h='100vh'>
			<Box my={5}>
				<Heading onClick={() => navigate("/")}>Admin Site</Heading>
				<Divider borderColor={"black"} />
			</Box>
			<VStack alignItems={"flex-start"} gap={2}>
				<Heading size='md'>Models</Heading>
				<Text onClick={() => navigate("audios")} size={"md"}>
					Audios
				</Text>
				<Text onClick={() => navigate("genres")} size={"md"}>
					Genre
				</Text>
			</VStack>
		</Box>
	);
};

export default AdminSideBar;
