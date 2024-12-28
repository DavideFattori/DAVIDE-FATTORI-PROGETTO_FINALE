import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLoaderData } from "react-router";
import { Chart } from 'chart.js/auto'; //anche se inutilizzato deve rimare l'import se no da errore il chart
import { Pie } from 'react-chartjs-2';
import SessionContext from "../context/SessionContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import GameComments from "../components/GameComments";
import supabase from '../supabase/client';
import '../style/gameDetail.css';


export default function GameDetail() {

    const { game, ratingRecommended, ratingExceptional, ratingMeh, ratingSkip, screenshots } = useLoaderData();
    const session = useContext(SessionContext);
    const [favourite, setFavourite] = useState([]);
    const [displayedImage, setDisplayedImage] = useState(game.background_image);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);


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
            console.log(error);
            
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true, 
                draggable: true,                
                progress: undefined,                
                theme: "dark",                
                transition: Bounce,                
            });
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
            toast.success('Gioco aggiunto ai preferiti', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
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
            toast.success('Gioco rimosso dai preferiti', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    //funzione per aggiungere un commento
    async function handleCommentSubmit(event) {
        event.preventDefault();
        const formComment = event.currentTarget;
        const { comment } = Object.fromEntries(new FormData(formComment));
        const { error } = await supabase
            .from('comments')
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                content: comment
            }])
            .select();

            if (!error) {
                checkFavourite();
                toast.success('Commento aggiunto', {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
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

        <div className="container-fluid gameDetailContainer" style={{ backgroundImage: `url(${game.background_image_additional})` }}>
            <ToastContainer />
            <div className="row gameDetail d-flex align-items-center justify-content-center">
                <div className="col-12 d-flex justify-content-center mb-3">
                    <button className="bg-transparent border-0 d-flex align-items-center fs-5 backBtn" onClick={() => navigate(-1)}><i className="fi fi-br-angle-left d-flex align-items-center"></i> indietro</button>
                </div>
                <div className="col-4">
                    <img className="img-fluid rounded-4" src={displayedImage} alt="game-image"/>
                    <div className="mt-3 d-flex justify-content-between">
                        <img className="img-fluid rounded-1 screenShotsPreviews" src={game.background_image} onClick={(e) => changeGameImage(game.background_image)} alt="game-image"/>
                        {screenshots && screenshots.map((screenshot) => (
                            <img key={screenshot.id} className="img-fluid rounded-1 screenShotsPreviews" src={screenshot.image} onClick={(e) => changeGameImage(screenshot.image)} alt="game-image"/>
                        ))}
                    </div>
                </div>
                <div className="col-4 gameInfo">
                    <h1 className="text-white gameTitle mb-3">{game.name}</h1>

                    <h4 className="border-bottom text-white mb-3">Stores</h4>
                    <div className="mb-4">
                        {game.stores && game.stores.map((store) => (
                            <Link key={store.store.id} to={`/games/${store.store.name}`} className="text-white d-inline platformLink">{store.store.name}</Link>
                        ))}
                    </div>

                    <h4 className="border-bottom text-white mb-3">Generi</h4>
                    {game.genres && game.genres.map((genre) => (
                        <Link key={genre.id} to={`/games/${genre.slug}`} className="text-white d-inline genreLink">{genre.name} </Link>
                    ))}

                    <h4 className="border-bottom text-white mb-3 mt-4">Data di rilascio: {game.released}</h4>

                    {session && (
                        <div>
                            {favourite.length == 0 ? <button className="btn favouritesBtn w-100 text-white" onClick={() => addFavourite(game)} >Aggiungi ai preferiti</button> : <button className="btn removeFavouritesBtn w-100 text-white" onClick={() => removeFavourite(game)} >Rimuovi dai preferiti</button>}
                        </div>
                    )}
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

                <div className="row justify-content-center moreInfo bg-black pb-5">
                    <div className="col-4">
                        <h4 className="text-white mb-2 mt-4">Descrizione</h4>
                        <p className="text-white descrizione border p-2 rounded-3">{game.description_raw}</p>
                    </div>
                    <div className="col-4">
                        <h4 className="text-white mb-2 mt-4">Commenti</h4>

                        <GameComments className="descrizione" game={game}/>
                        
                        {session && 
                            <form onSubmit={handleCommentSubmit}>
                                <input type="text" name="comment" placeholder="Scrivi un commento"/>
                                <button type="submit">Invia</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}