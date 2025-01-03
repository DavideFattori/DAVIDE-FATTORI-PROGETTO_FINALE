import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLoaderData } from "react-router";
import { Chart } from 'chart.js/auto'; //anche se inutilizzato deve rimare l'import se no da errore il chart
import { Pie } from 'react-chartjs-2';
import SessionContext from "../context/SessionContext";
import { ToastContainer } from 'react-toastify';
import showToast from "../components/Toast";
import GameComments from "../components/GameComments";
import supabase from '../supabase/client';
import '../style/gameDetail.css';


export default function GameDetail() {

    const { game, ratingRecommended, ratingExceptional, ratingMeh, ratingSkip, screenshots } = useLoaderData();
    const session = useContext(SessionContext);
    const [favourite, setFavourite] = useState([]);
    const [displayedImage, setDisplayedImage] = useState(game.background_image);
    const navigate = useNavigate();


    //grafico a torta dei ratings del gioco
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

    //funzione per capire se il gioco è già nei preferiti
    async function checkFavourite() {

        const { data: favourites, error } = await supabase
            .from('favourites')
            .select(`*`)
            .eq('profile_id', session.user.id)
            .eq('game_id', game.id);

        if (!error) {
            setFavourite(favourites);
        } else {
            showToast(error.message, "error");
        }
    }


    //funzione per aggiungere il gioco ai preferiti
    async function addFavourite(game) {
        const { error } = await supabase
            .from('favourites')
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name
            }])
            .select();

        if (!error) {
            checkFavourite();
            showToast('Gioco aggiunto ai preferiti', "success");
        } else {
            showToast(error.message, "error");
        }
    }


    //funzione per rimuovere il gioco dai preferiti
    async function removeFavourite(game) {

        const { error } = await supabase
            .from('favourites')
            .delete()
            .eq('profile_id', session.user.id)
            .eq('game_id', game.id);


        if (!error) {
            checkFavourite();
            showToast('Gioco rimosso dai preferiti', "success");
        } else {
            showToast(error.message, "error");
        }
    }


    //richiamo della funzione per capire se il gioco è già nei preferiti ed i commenti al caricamento del componente
    useEffect(() => {
        checkFavourite();
    }, []);




    //funzione per cambiare l'immagine del gioco mostrata sul dettaglio
    function changeGameImage(imageUrl) {
        setDisplayedImage(imageUrl)
    }


    return (

        <div className="container-fluid gameDetailContainer" style={{ background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%), url(${game.background_image_additional})` }}>
            <ToastContainer />
            <div className="row gameDetail justify-content-evenly">
                <div className="col-12 d-flex justify-content-center mb-3">
                    <button className="bg-transparent border-0 d-flex align-items-center fs-5 backBtn" onClick={() => navigate(-1)}><i className="fi fi-br-angle-left d-flex align-items-center"></i> indietro</button>
                </div>
                <div className="col-12 col-md-5 px-3 px-md-0">
                    <img className="img-fluid rounded-4" src={displayedImage} alt="game-image" />
                    <div className="mt-3 d-flex justify-content-between">
                        <img className="img-fluid rounded-1 screenShotsPreviews" src={game.background_image} onClick={(e) => changeGameImage(game.background_image)} alt="game-image" />
                        {screenshots && screenshots.map((screenshot) => (
                            <img key={screenshot.id} className="img-fluid rounded-1 screenShotsPreviews" src={screenshot.image} onClick={(e) => changeGameImage(screenshot.image)} alt="game-image" />
                        ))}
                    </div>
                </div>
                <div className="col-12 col-md-5 px-3 px-md-0 mt-3 mt-md-0 gameBasicInfo">
                    <h1 className="text-white gameTitle mb-3">{game.name}</h1>

                    <h4 className="border-bottom text-white mb-3">Stores</h4>
                    <div className="mb-4 d-flex flex-wrap">
                        {game.stores && game.stores.map((store) => (
                            <Link key={store.store.id} to={`/games/${store.store.name}`} className="text-white d-inline platformLink">{store.store.name}</Link>
                        ))}
                    </div>

                    <h4 className="border-bottom text-white mb-3">Generi</h4>
                    <div className="d-flex flex-wrap">
                        {game.genres && game.genres.map((genre) => (
                            <Link key={genre.id} to={`/games/${genre.slug}`} className="text-white d-inline platformLink">{genre.name} </Link>
                        ))}
                    </div>

                    <h4 className="border-bottom text-white mb-3 mt-4">Data di rilascio: {game.released}</h4>

                    {session && (
                        <div className="">
                            {favourite.length == 0 ? <button className="btn favouritesBtn w-100 text-white" onClick={() => addFavourite(game)} >Aggiungi ai preferiti</button> : <button className="btn removeFavouritesBtn w-100 text-white" onClick={() => removeFavourite(game)} >Rimuovi dai preferiti</button>}
                        </div>
                    )}
                </div>

                {/*----------------------------------------------------------- INFORMAZIONI -------------------------------------------------------------------------*/}
                <div className="col-12 col-md-12 mt-md-5 px-4 px-md-5">
                    <h4 className="text-white mb-4 mt-4 border-bottom">Informazioni</h4>
                </div>


                <div className="col-5 col-md-1 m-0 p-0 d-flex justify-content-center">
                    <div className="text-white d-flex justify-content-start">
                        <div className="border p-2 rounded-3 d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                            <div className="text-center">
                                <h6 className="border-bottom w-100 ">RATING ESRB</h6>
                                <h5 className="valoriAcc">{game.esrb_rating ? game.esrb_rating.name : 'N/A'}</h5>
                            </div>
                            <div className="text-center">
                                <h6 className="border-bottom w-100 ">GLOBAL RATING</h6>
                                <h5 className="valoriAcc">{game.rating}</h5>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-5 col-md-2 m-0 p-0 d-flex justify-content-start">
                    <div className="chart chartCoustom">
                        <Pie data={data} options={config.options} />
                    </div>
                </div>
                <div className="col-6 col-md-2 px-4 px-md-0 mt-3 mt-md-0 text-white d-flex justify-content-center">
                    <div className="border p-2 rounded-3 text-white d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                        <div className="text-center">
                            <h6 className="border-bottom w-100 ">STATUS DEGLI UTENTI</h6>
                            {game.added_by_status && (

                                game.added_by_status.beaten ? (
                                    <h6 className="valoriAcc"><p className="text-white d-inline">Finito:</p> {game.added_by_status.beaten}</h6>
                                ) : (
                                    <h6 className="valoriAcc">N/A</h6>
                                )
                            )}
                            {game.added_by_status && (

                                game.added_by_status.dropped ? (
                                    <h6 className="valoriAcc"><p className="text-white d-inline">Abbandonato:</p> {game.added_by_status.dropped}</h6>
                                ) : (
                                    <h6 className="valoriAcc">N/A</h6>
                                )
                            )}
                            {game.added_by_status && (

                                game.added_by_status.owned ? (
                                    <h6 className="valoriAcc"><p className="text-white d-inline">Posseduto:</p> {game.added_by_status.owned}</h6>
                                ) : (
                                    <h6 className="valoriAcc">N/A</h6>
                                )
                            )}
                            {game.added_by_status && (

                                game.added_by_status.playing ? (
                                    <h6 className="valoriAcc"><p className="text-white d-inline">In gioco:</p> {game.added_by_status.playing}</h6>
                                ) : (
                                    <h6 className="valoriAcc">N/A</h6>
                                )
                            )}

                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2 px-4 px-md-0 mt-3 mt-md-0 text-white d-flex justify-content-center">
                    <div className="border p-2 rounded-3 text-white d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
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
                </div>
                <div className="col-12 col-md-2 px-4 px-md-0 mt-3 mt-md-0 text-white d-flex justify-content-center">
                    <div className="border p-2 p-md-3 mt-3 mt-md-0 rounded-3 d-flex flex-column align-items-center justify-content-evenly gameInfoDetails">
                        <div className="text-center">
                            <h6 className="border-bottom w-100 ">SITO WEB</h6>
                            <h6 className="valoriAcc">{game.website ? game.website.replace('https://', '') : 'N/A'}</h6>
                        </div>
                        <div className="text-center">
                            <h6 className="border-bottom w-100 ">METACRITIC</h6>
                            <h6 className="valoriAcc">{game.metacritic_url ? game.metacritic_url.replace('https://', '') : 'N/A'}</h6>
                        </div>
                    </div>
                </div>

            </div>
            {/*------------------------------------------------------------------------------------ DESCRIZIONE E COMMENTI ------------------------------------------------------------------------------------ */}
            <div className="row justify-content-evenly moreInfo pb-5">
                <div className="col-12 col-md-5 mt-md-4">
                    <h4 className="text-white mb-2 mt-4">Descrizione</h4>
                    <p className="text-white descrizione border p-2 rounded-3">{game.description_raw}</p>
                </div>
                <div className="col-12 col-md-5 mt-md-4">
                    <h4 className="text-white mb-2 mt-4">Commenti</h4>

                    <GameComments game={game} />
                </div>
            </div>
        </div>
    )

}