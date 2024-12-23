import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useProfile from "../hooks/useProfile";
import getProfileAvatar from "../hooks/getProfileAvatar";
import '../style/navbar.css'

export default function Navbar() {

    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const session = useContext(SessionContext);
    const navigate = useNavigate();
    const { username, avatar_url } = useProfile();
    const avatarUrl = getProfileAvatar(avatar_url)
    

    useEffect(() => {
        const timeoutAPI = setTimeout(() => {
            (async function () {
                if (!search) return;
                setSearchResults([]);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&search=${search}`);
                const json = await response.json();
                setSearchResults(json.results);
            })();
        }, 500);

        return () => {
            clearTimeout(timeoutAPI);
        }
    }, [search]);


    const startSearch = (e) => {
        if (!focus) setFocus(true);
        setSearch(e)
    }

    const clearSearch = () => {
        setFocus(false);
        setSearch('');
        setSearchResults([]);
    }


    const goToGamesPage = (e) => {
        e.preventDefault();
        navigate(`/games/${search}`);
        clearSearch();
    }



    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
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
            setShowToast(true);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg position-absolute w-100">
            {showToast && <ToastContainer />}
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand text-white linkCustom"><img className='logoNav me-2' src="/images/logo_bordo.png" alt="logo" />Rehacktor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form className="d-flex w-100 ms-md-5 position-relative me-3" role="search" onSubmit={goToGamesPage}>
                        <input className="form-control rounded-pill searchInputCustom w-100" onChange={(e) => startSearch(e.target.value)} type="search" placeholder="Cerca" aria-label="Search" value={search} />
                        {focus &&
                            <div className="searchSuggestions d-flex flex-column">
                                <div className="d-flex">
                                    <h5 className="text-white">Seleziona il risultato</h5>
                                    <button className="ms-auto btnCloseSearchResults" onClick={clearSearch}><i className="fi fi-br-cross"></i></button>
                                </div>
                                <ul className="list-unstyled text-white searchResultsContainer">
                                    {searchResults && searchResults.map((game) => (
                                        <li className="d-flex align-items-center" key={game.id}>
                                            <img className="imgSearch" src={game.background_image} alt="game-image" />
                                            <Link to={`/game/${game.id}`} onClick={clearSearch} className="text-decoration-none text-white linkCustom">{game.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                        <Link className="btnSearchNavCustom text-decoration-none d-flex align-items-center" type="submit" to={`/games/${search}`} onClick={clearSearch}><i className="fi fi-rr-search"></i></Link>
                    </form>

                    {!session ?
                        <ul className="navbar-nav ms-4 mb-2 mb-lg-0 searchInputCustom rounded-pill px-3 border">
                            <li className="nav-item">
                                <Link to={'/signup'} className="nav-link active text-white linkCustom" >Registrati</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link text-white linkCustom">Accedi</Link>
                            </li>
                        </ul>

                        :

                        <ul className="navbar-nav ms-3 me-2 mb-2 mb-lg-0">
                            <li className="nav-item dropdown w-100">
                                <button className="btn dropdownUser dropdown-toggle rounded-pill border-white d-flex ps-2 align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="me-1" style={{ 
                                        backgroundImage: `url(${avatarUrl})`, 
                                        backgroundSize: "cover", 
                                        backgroundPosition: "center", 
                                        backgroundRepeat: "no-repeat", 
                                        width: "30px", 
                                        height: "30px", 
                                        borderRadius: "50%" 
                                        }}>
                                    </div>
                                    {username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-0 dropdownMenuCustom border border-white mt-1">
                                    <li><Link className="dropdown-item text-white profileBtn" to={'/profile'}>Profilo</Link></li>
                                    <li className=""><a className="dropdown-item logoutBtn" href="#" onClick={signOut}>Esci</a></li>
                                </ul>
                                
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </nav>
    )
}






