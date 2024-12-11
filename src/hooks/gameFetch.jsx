import { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function gameFetch() {

    const { id } = useParams();
    const [game, setGame] = useState({});
    
    useEffect(() => {
        (async function fetchGame() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGame(json);
        })();
    }, [id]);
    
    return game;
}
