import { useEffect, useState } from "react";
import "./Game.css";

export default function Game({ difficulty, setDifficulty, score, setScore, setBestScore }) {
	const [cardStates, setCardStates] = useState(Array.from(Array(30), () => 0));
	const [cards, setCards] = useState([]);

	const isGameOver = cardStates.includes(2) ? true : false;

	const numCards = difficulty + 2;

	useEffect(() => {
		const generateCards = async () => {
			try {
				const cards = await Promise.all(drawCards(numCards).map((id) => fetchPokemon(id)));
				setCards(cards);
			} catch (e) {
				console.log(e);
				console.log("API Request Failed, Trying Again...");
				generateCards();
			}
		};

		if (!isGameOver) generateCards();
	}, [cardStates]);

	useEffect(() => {
		if (isGameOver) setBestScore((prevBest) => (score > prevBest ? score : prevBest));
	}, [isGameOver]);

	const clickHandler = (id) => {
		setCardStates((cardStates) => {
			const states = [...cardStates];
			states[id - 1]++;
			return states;
		});
		if (cardStates[id - 1] === 0) setScore((score) => score + 1);
	};

	const quit = () => setDifficulty(0);

	const playAgain = () => {
		setScore(0);
		setCardStates(Array.from(Array(30), () => 0));
		setCards([]);
	};

	return (
		<>
			{isGameOver && (
				<div className="overlay">
					<div>
						<h2>Game over!</h2>
						<p>You scored {score} points</p>
						<div>
							<p>
								&gt; <span onClick={() => playAgain()}>Play Again</span>
							</p>
							<p>
								&gt; <span onClick={() => quit()}>Quit</span>
							</p>
						</div>
					</div>
				</div>
			)}
			<div className="game">
				<h2>Dont click the same pokemon twice!</h2>
				<div className="cards">
					{cards.map((card) => (
						<Card key={card.id} pokemon={card} clickHandler={clickHandler} isGameOver={isGameOver} />
					))}
				</div>
			</div>
		</>
	);
}

function Card({ pokemon, clickHandler, isGameOver }) {
	return (
		<div className={isGameOver ? "card-inactive" : "card-active"} onClick={() => clickHandler(pokemon.id)}>
			<img src={pokemon.image} />
			<p>{pokemon.name}</p>
		</div>
	);
}

function generateRandom() {
	return Math.floor(30 * Math.random()) + 1;
}

function drawCards(numCards) {
	const ids = [];

	while (ids.length !== numCards) {
		const id = generateRandom();
		if (!ids.includes(id)) ids.push(id);
	}

	return ids;
}

async function fetchPokemon(id) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
	const data = await response.json();

	return {
		id,
		name: data.name,
		image: data.sprites.front_default,
	};
}
