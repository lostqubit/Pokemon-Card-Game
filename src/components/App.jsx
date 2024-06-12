import Header from "./Header.jsx";
import "./App.css";
import LevelSelection from "./LevelSelection.jsx";
import { useState } from "react";

function App() {
	const [difficulty, setDifficulty] = useState(0);
	return (
		<>
			<Header />
			<LevelSelection setDifficulty={setDifficulty} />
		</>
	);
}

export default App;
