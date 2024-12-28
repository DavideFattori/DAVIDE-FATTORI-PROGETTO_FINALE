import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router";
import useProfile from '../hooks/useProfile'
import getProfileAvatar from "../hooks/getProfileAvatar";
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext';
import '../style/profilePage.css'

export default function ProfilePage() {

    const { loading, username, first_name, last_name, avatar_url } = useProfile()
    const avatarUrl = getProfileAvatar(avatar_url)
    const [favouriteGames, setFavouriteGames] = useState([])
    const session = useContext(SessionContext)


    //funzione per prendere i giochi preferiti
    async function getFavourite() {

        const { data: favourites, error } = await supabase
            .from('favourites')
            .select(`*`)
            .eq('profile_id', session.user.id)

        if (!error) {
            setFavouriteGames(favourites);
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

    //richiamo della funzione per prendere i giochi preferiti al caricamento del componente
    useEffect(() => {
        getFavourite();
    }, []);

    return (
        <div className="container-fluid profileContainerCustom">
            <div className="row justify-content-center">
                <div className="col-3 d-flex justify-content-center">
                    <img className="profileImage img-fluid w-75" src={avatarUrl} alt="profile-image" />
                </div>
                <div className="col-4">
                    <h4 className="text-white border-bottom pb-1">Username: {username}</h4>
                    <h3 className="text-white border-bottom pb-1 mt-3">Nome: {first_name}</h3>
                    <h3 className="text-white border-bottom pb-1 mt-3">Cognome: {last_name}</h3>
                    <Link to="/profile/update" className="text-white">Modifica le informazioni</Link>
                </div>
                <div className="col-7">
                    <div className='w-50'>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item bg-transparent">
                                <h2 className="accordion-header">
                                    <button className="accordion-button text-white favAccordionBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        I tuoi giochi preferiti
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse accordionBodyCustom" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ul className="list-unstyled mb-0">
                                            {favouriteGames.length === 0 && 
                                                <li className="text-white">
                                                    Non hai giochi preferiti
                                                    <Link to="/" className="text-white">Cerca un gioco da aggiungere</Link>
                                                </li>
                                            }
                                            {favouriteGames.map((favourite) => (
                                                <li key={favourite.game_id}>
                                                    <Link to={`/game/${favourite.game_id}`} className="text-white text-decoration-none">{favourite.game_name}</Link>
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