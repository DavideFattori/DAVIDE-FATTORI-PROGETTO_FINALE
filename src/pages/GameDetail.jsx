import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
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
    }, [id]);

    console.log(game);


    return (
        <div className="container-fluid gameDetailContainer" style={{ backgroundImage: `url(${game.background_image_additional})` }}>
            <div className="row gameDetail d-flex align-items-center justify-content-center">
                <div className="col-4">
                    <img className="img-fluid rounded-4 " src={game.background_image} alt="game-image" />
                </div>
                <div className="col-4 gameInfo">
                    <h1 className="text-white gameTitle mb-3">{game.name}</h1>

                    <h4 className="border-bottom text-white mb-3">Stores</h4>
                    {game.stores && game.stores.map((store) => (
                        <Link key={store.store.id} to={`/games/${store.store.id}`} className="text-white d-inline platformLink">{store.store.name}</Link>
                    ))}
                    
                    <h4 className="border-bottom text-white mb-3 mt-4">Generi</h4>
                    {game.genres && game.genres.map((genre) => (
                        <Link key={genre.id} to={`/games/${genre.slug}`} className="text-white d-inline genreLink">{genre.name} </Link>
                    ))}
                    
                </div>

                <div className="row moreInfo d-flex justify-content-center m-0">
                    <div className="col-8 m-0">
                        <h4 className="text-white mb-2 mt-4 border-bottom">Informazioni</h4>
                        <div className="text-white">
                            <ul className="list-unstyled d-flex">
                                <li className="me-5 border p-2 rounded-3 d-flex flex-column align-items-center justify-content-center gameInfoDetails"><h6 className="border-bottom w-100 ">RATING ESRB</h6> {game.esrb_rating ? game.esrb_rating.name  : 'N/A'}</li>
                                { game.ratings && game.ratings.map((rating) => (
                                    <li className="me-5 border p-2 rounded-3 d-flex flex-column align-items-center justify-content-center gameInfoDetails"><h6 className="border-bottom w-100 ">RATINGS</h6> {rating.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center moreInfo bg-black">
                    <div className="col-8">
                        <h4 className="text-white mb-2 mt-4">Descrizione</h4>
                        <p className="text-white descrizione border p-2 rounded-3">{game.description_raw}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}