import { useState, useEffect } from "react";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from 'react-toastify';
import showToast from "../components/Toast";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function AppHome() {

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);


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
                        <Header text="I MIGLIORI VIDEOGIOCHI DEL MOMENTO"/>
                    </div>

                    {loadingError ? <ToastContainer /> : null}
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-12 ps-0">
                                <h2 className="text-white display-3 fw-bold mb-5">Tutti i giochi</h2>
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
        </div>
    )
}