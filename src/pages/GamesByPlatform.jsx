import { useParams, useNavigate, useLoaderData, Link } from "react-router";
import { useEffect, useState } from "react";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import '../style/filteredBy.css'

export default function GamesByGenre() {

    const { platform, platformName } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { genres, platforms } = useLoaderData();

    let games = useAsyncList({
        async load({ signal, cursor }) {
            setLoading(true);
            try {
                let response = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform}&page=1`, { signal });
                let json = await response.json();
                setLoading(false);
                console.log(json);

                return { items: json.results, cursor: json.next };
            } catch (error) {
                setLoading(false);
                setError(`Error: ${error.message}`);
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

    useEffect(() => {
        games.reload();
    }, [platform]);



    return (
        <div>
            <a href="#" className="scrollTop"><i className="fi fi-br-angle-small-up"></i></a>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 mb-3">
                        <Header text={platformName} />
                    </div>
                    <div className="d-flex justify-content-center mb-3 backBtnContainer">
                        <button className="bg-transparent border-0 d-flex align-items-center fs-5 backBtn" onClick={() => navigate(-1)}><i className="fi fi-br-angle-left d-flex align-items-center"></i> indietro</button>
                        <button className="filtersOffcanvasBtn bg-transparent border-0 ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fi fi-sr-filter-list text-white filterIcon"></i></button>
                    </div>
                    <div className="col-2 sidebar">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">
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