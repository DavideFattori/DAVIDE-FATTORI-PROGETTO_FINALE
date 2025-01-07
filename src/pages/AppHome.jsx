import { useState, useEffect } from "react";
import { useLoaderData, Link } from 'react-router';
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from 'react-toastify';
import showToast from "../components/Toast";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import '../style/home.css';

export default function AppHome() {

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const { genres, platforms } = useLoaderData();

    let games = useAsyncList({
        async load({ signal, cursor }) {
            setLoading(true);
            try {
                let response = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-12&page=1`, { signal });
                let json = await response.json();
                setLoading(false);
                return { items: json.results, cursor: json.next };
            } catch (error) {
                setLoading(false);
                setLoadingError(true);
                showToast('la pagina non si è caricata correttamente, riprovare', "error");
            }
        }
    });

    const { ref, inView } = useInView({
        threshold: 1
    });

    useEffect(() => {
        if (inView && !games.isLoading && games.items.length) {
            games.loadMore();
        }
    }, [inView, games]);


    return (
        <div>
            <a href="#" className="scrollTop"><i className="fi fi-br-angle-small-up"></i></a>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 mb-3">
                        <Header text="I MIGLIORI VIDEOGIOCHI DEL MOMENTO" />
                    </div>

                    {loadingError ? <ToastContainer /> : null}
                    <div className="col-2 sidebar">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <div className="col-12 ps-0 mb-3 d-flex justify-content-between">
                                <h2 className="text-white display-3 fw-bold mb-0 ms-3 ms-md-0">TUTTI I GIOCHI</h2>
                                <button className="filtersOffcanvasBtn bg-transparent border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fi fi-sr-filter-list text-white filterIcon"></i></button>
                            </div>
                            {games.items && games.items.map(game => (
                                <div key={game.id} className="col-6 col-md-3 p-0 ">
                                    <Card game={game} />
                                </div>
                            ))}
                        </div>
                        <div className="w-100 d-flex justify-content-center my-3" ref={ref}>{loading ? <div className="w-100 d-flex justify-content-center"><Loader /></div> : null}</div>
                    </div>
                </div>
            </div>







            {/* offcanvas per filtri da smartphone */}
            <div className="offcanvas offcanvas-end w-75 offcanvasBody" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Filtra per</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="accordion " id="accordionExample">
                        <div className="accordion-item bg-dark">
                            <h2 className="accordion-header">
                                <button className="accordion-button bg-transparent border text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Generi
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body py-2">
                                    <ul className='list-unstyled text-white'>
                                        {genres.map((genre) => (
                                            <li key={genre.id} className='d-flex my-3 align-items-center'>
                                                <div className='imgFilter' style={{ backgroundImage: `url(${genre.image_background})` }} />
                                                <Link to={`/games/genre/${genre.slug}`} className='text-white text-decoration-none ms-2 linkSidebar'>{genre.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item bg-dark">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed bg-transparent border text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Piattaforme
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body py-2">
                                    <ul className='list-unstyled text-white'>
                                        {platforms.map((platform) => (
                                            <li key={platform.id} className='d-flex my-3 align-items-center'>
                                                <div className='imgFilter' style={{ backgroundImage: `url(${platform.image_background})` }} />
                                                <Link to={`/games/platform/${platform.id}/${platform.name}`} className='text-white text-decoration-none ms-2 linkSidebar'>{platform.name}</Link>
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
    )
}