import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./layout/Layout";
import { AuthProvider } from "./provider/AuthProvider";
import AllRoutes from "./routes/AllRoutes";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Layout>
					<AllRoutes />
				</Layout>
				<Toaster position="top-right" />
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
