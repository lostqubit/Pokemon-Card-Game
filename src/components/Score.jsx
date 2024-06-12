import "./Score.css";

export default function Score({ score, bestScore, difficulty }) {
	return (
		<div className="score-div">
			<p>Score:{difficulty ? score : null} </p>
			<p>Best Score:{bestScore ? bestScore : null} </p>
		</div>
	);
}
