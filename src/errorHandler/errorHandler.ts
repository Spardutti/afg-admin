import { AxiosError } from "axios";
export const errorHandler = (error: unknown) => {
	if (error instanceof AxiosError) {
		const response = error?.response;
		if (error.code === "ERR_NETWORK") {
			return { status: 400, message: "Connection problem" };
		} else if (error.code === "ERR_CANCELED") {
			return { status: 400, message: "Connection canceled" };
		}
		if (response) {
			const statusCode = response?.status;
			if (statusCode === 404) {
				return { status: statusCode, message: "The requested resource does not exist or has been deleted" };
			} else if (statusCode === 401) {
				return { status: statusCode, message: "Please login to access this resource" };
			} else {
				console.log(response);
				return { status: statusCode, message: response.data.message };
			}
		}
	}
};
