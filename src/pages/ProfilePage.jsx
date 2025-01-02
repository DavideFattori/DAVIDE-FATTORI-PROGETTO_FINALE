import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router";
import useProfile from '../hooks/useProfile'
import getProfileAvatar from "../hooks/getProfileAvatar";
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext';
import { ToastContainer } from 'react-toastify';
import showToast from "../components/Toast";
import '../style/profilePage.css'


export default function ProfilePage() {

    const { loading, username, first_name, last_name, avatar_url } = useProfile();
    const avatarUrl = getProfileAvatar(avatar_url);
    const session = useContext(SessionContext);
    const [favouriteGames, setFavouriteGames] = useState([]);
    const [commentedGames, setCommentedGames] = useState([]);


    //funzione per prendere i giochi preferiti
    async function getFavourite() {

        const { data: favourites, error } = await supabase
            .from('favourites')
            .select(`*`)
            .eq('profile_id', session.user.id)

        if (!error) {
            setFavouriteGames(favourites);
        } else {
            showToast(error.message, "error");
        }
    }

    async function getCommentedGames() {
        const { data: comments, error } = await supabase
            .from('comments')
            .select(`*`)
            .eq('profile_id', session.user.id)

        if (!error) {

            const uniqueGames = {};
            comments.map(comment => {
                if (!uniqueGames[comment.game_id]) {
                    uniqueGames[comment.game_id] = {
                        game_id: comment.game_id,
                        game_name: comment.game_name
                    };
                }
            });

            setCommentedGames(Object.values(uniqueGames));


        } else {
            showToast(error.message, "error");
        }
    }

    //richiamo della funzione per prendere i giochi preferiti al caricamento del componente
    useEffect(() => {
        getFavourite();
        getCommentedGames();
    }, []);



    return (
        <div className="container-fluid profileContainerCustom">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-9 col-md-3 d-flex justify-content-center">
                    <img className="profileImage img-fluid " src={avatarUrl} alt="profile-image" />
                </div>
                <div className="col-8 col-md-4 mt-2 mt-md-0 py-3 py-md-0 d-flex flex-column justify-content-evenly userInfo">
                    <div className='mb-2 mb-md-0'>
                        <p className="text-white border-bottom p-0 m-0">Username </p> <h3 className="text-white mt-1">{username}</h3>
                    </div>
                    <div className='mb-2 mb-md-0'>
                        <p className="text-white border-bottom p-0 m-0">Nome </p> <h3 className="text-white mt-1">{first_name}</h3>
                    </div>
                    <div className='mb-2 mb-md-0'>
                        <p className="text-white border-bottom p-0 m-0">Cognome </p> <h3 className="text-white mt-1">{last_name}</h3>
                    </div>

                    <Link to="/profile/update" className="text-white link">Modifica le informazioni</Link>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-8 col-md-2 mt-4 mt-md-5">
                    <div className='w-100'>
                        <div className="accordion" id="accordionFav">
                            <div className="accordion-item bg-transparent">
                                <h2 className="accordion-header">
                                    <button className="accordion-button text-white favAccordionBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        I tuoi giochi preferiti
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse accordionBodyCustom" data-bs-parent="#accordionFav">
                                    <div className="accordion-body">
                                        <ul className="list-unstyled mb-0">
                                            {favouriteGames.length === 0 && 
                                                <li className="text-white">
                                                    Non hai giochi preferiti
                                                    <Link to="/" className="text-white link"><br /> Scegli un gioco da aggiungere</Link>
                                                </li>
                                            }
                                            {favouriteGames.map((favourite) => (
                                                <li key={favourite.game_id}>
                                                    <Link to={`/game/${favourite.game_id}`} className="text-white text-decoration-none link">{favourite.game_name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-md-2 mt-3 mt-md-5">
                    <div className='w-100'>
                        <div className="accordion" id="accordionComments">
                            <div className="accordion-item bg-transparent">
                                <h2 className="accordion-header">
                                    <button className="accordion-button text-white favAccordionBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        I giochi che hai commentato
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse accordionBodyCustom" data-bs-parent="#accordionComments">
                                    <div className="accordion-body">
                                        <ul className="list-unstyled mb-0">
                                            {commentedGames.length === 0 && 
                                                <li className="text-white">
                                                    Non hai commentato nessun gioco
                                                    <Link to="/" className="text-white link"><br /> Scegli un gioco da commentare</Link>
                                                </li>
                                            }
                                            {commentedGames.map((commented) => (
                                                <li key={commented.game_id}>
                                                    <Link to={`/game/${commented.game_id}`} className="text-white text-decoration-none link">{commented.game_name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}