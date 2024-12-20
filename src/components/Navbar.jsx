import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import supabase from "../supabase/client";
import '../style/navbar.css'
import SessionContext from "../context/SessionContext";

export default function Navbar() {

    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const session = useContext(SessionContext);

    useEffect(() => {
        const timeoutAPI = setTimeout(() => {
            (async function() {
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

    const clearSearch = () => {
        setFocus(false);
        setSearch('');
        setSearchResults([]);
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg position-absolute w-100">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand text-white linkCustom"><img className='logoNav me-2' src="/logo_bordo.png" alt="logo" />Rehacktor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form className="d-flex w-100 ms-md-5 position-relative me-3" role="search">
                        <input className="form-control rounded-pill searchInputCustom w-100" onFocus={() => setFocus(true)} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Cerca" aria-label="Search" value={search} />
                        {focus &&
                            <div className="searchSuggestions d-flex flex-column">
                                <button className="ms-auto btnCloseSearchResults" onClick={clearSearch}><i className="fi fi-br-cross"></i></button>
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

                        {/* <button className="btnSearchNavCustom" type="submit"><i className="fi fi-rr-search"></i></button> */}
                    </form>

                    {!session ? 
                        <ul className="navbar-nav ms-4 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/signup'} className="nav-link active text-white linkCustom" >Registrati</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link text-white linkCustom">Accedi</Link>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ms-4 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn btn-danger rounded-pill text-white" onClick={signOut} type="submit">Esci</button>
                            </li>
                        </ul>
                        }

                </div>
            </div>
        </nav>
    )
}






