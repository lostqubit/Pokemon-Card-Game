import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import LevelSelection from "./LevelSelection.jsx";
import Game from "./Game.jsx";
import Score from "./Score.jsx";
import "./App.css";

function App() {
	const [difficulty, setDifficulty] = useState(0);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	useEffect(() => {
		setScore(0);
	}, [difficulty]);

	useEffect(() => {
		if (!localStorage.getItem("bestScore")) localStorage.setItem("bestScore", "0");
		else {
			if (bestScore > parseInt(localStorage.getItem("bestScore")))
				localStorage.setItem("bestScore", `${bestScore}`);
			else setBestScore(parseInt(localStorage.getItem("bestScore")));
		}
	}, [bestScore]);

	return (
		<>
			<Header difficulty={difficulty} />
			{difficulty ? (
				<Game
					difficulty={difficulty}
					setDifficulty={setDifficulty}
					score={score}
					setScore={setScore}
					setBestScore={setBestScore}
				/>
			) : (
				<div>
					<LevelSelection setDifficulty={setDifficulty} />
				</div>
			)}
			<Score score={score} bestScore={bestScore} difficulty={difficulty} />
		</>
	);
}

export default App;
