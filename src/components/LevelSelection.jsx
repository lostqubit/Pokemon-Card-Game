import "./LevelSelection.css";

export default function LevelSelection({ setDifficulty }) {
	return (
		<div className="levels">
			<h2>Select Difficulty Level:</h2>
			<p>
				&gt; <span onClick={() => setDifficulty(1)}>Easy</span>
			</p>
			<p>
				&gt; <span onClick={() => setDifficulty(2)}>Medium</span>
			</p>
			<p>
				&gt; <span onClick={() => setDifficulty(3)}>Hard</span>
			</p>
		</div>
	);
}
