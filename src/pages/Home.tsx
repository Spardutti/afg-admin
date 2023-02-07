import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminHeader from "components/admin/AdminHeader";
import React, { useState } from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	return (
		<Box h='100vh' py={5} overflowY='scroll'>
			{/* <AdminHeader /> */}
			{/* <ModelTable /> */}
		</Box>
	);
};

export default Home;
