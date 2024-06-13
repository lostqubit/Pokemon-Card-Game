import "./Header.css";

export default function Header({ difficulty }) {
	return (
		<header className={difficulty ? "in-game" : ""}>
			<img src="https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png" />
			{difficulty ? null : <div>Pokemon Memory Card Game</div>}
		</header>
	);
}
