import { useState } from "react";
import Header from "./Header.jsx";
import LevelSelection from "./LevelSelection.jsx";
import Score from "./Score.jsx";
import "./App.css";

function App() {
	const [difficulty, setDifficulty] = useState(0);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	return (
		<>
			<Header />
			<LevelSelection setDifficulty={setDifficulty} setScore={setScore} setBestScore={setBestScore} />
			<Score score={score} bestScore={bestScore} difficulty={difficulty} />
		</>
	);
}

export default App;
