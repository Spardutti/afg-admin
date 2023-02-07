import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import ModelDetail from "./components/admin/ModelDetail";
import { store } from "./store/store";
import { Provider } from "react-redux";
import MainLayout from "components/layout/MainLayout";
import Home from "./pages/Home";
import AudioForm from "components/forms/AudioForm";
import { QueryClient, QueryClientProvider } from "react-query";
import GenreForm from "components/forms/GenreForm";
import AudioTable from "components/tables/AudioTable";
import GenreTable from "components/tables/GenreTable";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Provider store={store}>
					<BrowserRouter>
						<MainLayout>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/model/:model/:id' element={<ModelDetail />} />
								<Route path='/audios/create' element={<AudioForm isEdit={false} />} />
								<Route path='/genres/create' element={<GenreForm isEdit={false} />} />
								<Route path='/audios' element={<AudioTable />} />
								<Route path='/genres' element={<GenreTable />} />
							</Routes>
						</MainLayout>
					</BrowserRouter>
				</Provider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default App;
