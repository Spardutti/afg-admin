import { Box, Grid, GridItem } from "@chakra-ui/react";
import AdminSideBar from "components/admin/AdminSideBar";
import React, { ReactNode } from "react";

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<Box>
			<Grid templateColumns={["2fr 10fr"]}>
				<GridItem>
					<AdminSideBar />
				</GridItem>
				<GridItem>{children}</GridItem>
			</Grid>
		</Box>
	);
};

export default MainLayout;
