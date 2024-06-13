import { useEffect, useState } from "react";
import "./Game.css";

export default function Game({ difficulty, setScore, setBestScore }) {
	const [cardStates, setCardStates] = useState(Array.from(Array(50), () => 0));
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

		generateCards();
	}, [cardStates]);

	const clickHandler = (id) => {
		setCardStates((cardStates) => {
			const states = [...cardStates];
			states[id - 1]++;
			return states;
		});
		if (cardStates[id - 1] === 0) setScore((score) => score + 1);
	};

	return (
		<div className="game">
			<h2>Dont click the same pokemon twice!</h2>
			<div className="cards">
				{cards.map((card) => (
					<Card key={card.id} pokemon={card} clickHandler={clickHandler} />
				))}
			</div>
		</div>
	);
}

function Card({ pokemon, clickHandler }) {
	return (
		<div className="card" onClick={() => clickHandler(pokemon.id)}>
			<img src={pokemon.image} />
			<p>{pokemon.name}</p>
		</div>
	);
}

function generateRandom() {
	return Math.floor(50 * Math.random()) + 1;
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
