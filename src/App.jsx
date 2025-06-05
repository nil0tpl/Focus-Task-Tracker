import Navbar from "./component/Navbar";
import HomeContent from "./component/HomeContent";
import TaskContent from "./component/TaskContent";
import { StateContextProvide } from "./component/context/StateContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./component/context/DarkModeContext";

function App() {
	return (
		<>
			<Router>
				<DarkModeProvider>
					<Navbar />
					<StateContextProvide>
						<Routes>
							<Route path="/" element={<HomeContent />} />
							<Route path="/task" element={<TaskContent />} />
						</Routes>
					</StateContextProvide>
				</DarkModeProvider>
			</Router>
		</>
	);
}

export default App;
