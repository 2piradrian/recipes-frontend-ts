import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import { AuthProvider } from "./provider/AuthProvider";
import AllRoutes from "./routes/AllRoutes";

function App() {
	return (
		<AuthProvider>
			<Layout>
				<AllRoutes />
			</Layout>
			<Toaster position="top-right" />
		</AuthProvider>
	);
}

export default App;
