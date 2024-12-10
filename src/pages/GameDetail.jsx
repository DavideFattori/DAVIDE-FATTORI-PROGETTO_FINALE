import { useEffect, useState } from "react";
import { useParams } from "react-router";
import '../style/gameDetail.css';



export default function GameDetail() {

    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        (async function fetchGame() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGame(json);
        })();
    }, []);

    console.log(game);
    

    return (
        <div className="container-fluid" style={{backgroundImage: `url(${game.background_image_additional})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="row">
                <div className="col-12 p-0 gameDetailContainer">
                    <h1 className="text-white display-3 fw-bold border-bottom border-3 w-75 pb-2">{game.name}</h1>
                </div>
            </div>
        </div>
    )

}