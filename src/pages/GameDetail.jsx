import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import '../style/gameDetail.css';


export default function GameDetail() {

    const { id } = useParams();
    const [game, setGame] = useState({});
    const [ratingRecommended, setRatingRecommended] = useState(0);
    const [ratingExceptional, setRatingExceptional] = useState(0);
    const [ratingMeh, setRatingMeh] = useState(0);
    const [ratingSkip, setRatingSkip] = useState(0);

    useEffect(() => {
        (async function fetchGame() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGame(json);
            setRatingRecommended(json.ratings[0].percent);
            setRatingExceptional(json.ratings[1].percent);
            setRatingMeh(json.ratings[2].percent);
            setRatingSkip(json.ratings[3].percent);
        })();
    }, [id]);

    console.log(game);


    const xValues = ['Recommended', 'Exceptional', 'Meh', 'Skip'];
    const yValues = [ratingRecommended, ratingExceptional, ratingMeh, ratingSkip];

    const data = {
        labels: xValues,
        datasets: [
            {
                backgroundColor: ["#00ff00", "#FFFF00", "#FFA500", "#ff0000",],
                borderColor: ["#00ff00", "#FFFF00", "#FFA500", "#ff0000"],
                data: yValues,
            },
        ]
    };

    const config = {
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    };



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

                    <h4 className="border-bottom text-white mb-3 mt-5">Data di rilascio: {game.released}</h4>
                </div>

                <div className="row moreInfo d-flex justify-content-center m-0">
                    <div className="col-8 m-0">
                        <h4 className="text-white mb-4 mt-4 border-bottom">Informazioni</h4>
                        <div className="text-white d-flex justify-content-evenly">
                            <div className=" border p-2 rounded-3 d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">RATING ESRB</h6>
                                    <h5 className="valoriAcc">{game.esrb_rating ? game.esrb_rating.name : 'N/A'}</h5>
                                </div>
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">GLOBAL RATING</h6>
                                    <h5 className="valoriAcc">{game.rating}</h5>
                                </div>
                            </div>
                            <div className="chart">
                                <Pie data={data} options={config.options} />
                            </div>

                            <div className="border p-2 rounded-3 d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">PUBLISHER</h6>
                                    {game.publishers && game.publishers.map((publisher) => (
                                        <h6 key={publisher.id} className="valoriAcc">{publisher.name}</h6>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">DEVELOPER</h6>
                                    {game.developers && game.developers.map((developer) => (
                                        <h6 key={developer.id} className="valoriAcc">{developer.name}</h6>
                                    ))}
                                </div>

                            </div>
                            <div className="border p-2 rounded-3 d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">SITO WEB</h6>
                                    <h6 className="valoriAcc">{game.website ? game.website : 'N/A'}</h6>
                                </div>
                                <div className="text-center">
                                    <h6 className="border-bottom w-100 ">METACRITIC</h6>
                                    <h6 className="valoriAcc">{game.metacritic_url ? game.metacritic_url : 'N/A'}</h6>
                                </div>
                            </div>
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