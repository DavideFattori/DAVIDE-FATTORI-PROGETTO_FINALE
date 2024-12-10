import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import '../style/filteredBy.css'

export default function GamesByGenre() {

    const { platform } = useParams();
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async function fetchGame() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform}`);
            const json = await response.json();
            setGames(json.results);
        })();
    }, []);

    console.log(games);
    

    return (
        <div className="container">
            <div className="row">
                {games && games.map(game => (
                    <div key={game.id} className="col-6 col-md-4 p-0">
                        <Card game={game} />
                    </div>
                ))}
            </div>
        </div>
    )
}