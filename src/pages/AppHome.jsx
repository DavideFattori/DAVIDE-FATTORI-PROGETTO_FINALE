import { useState, useEffect } from "react";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AppHome() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let games = useAsyncList({
        async load({ signal, cursor }) {
            setLoading(true);
        try {
                let response = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-12&page=1`, { signal });
                let json = await response.json();
                setLoading(false);
                return {items: json.results, cursor: json.next};
            } catch (error) {
                setLoading(false);
                setError(`Error: ${error.message}`);
            }
        }
    });

    const {ref, inView} = useInView({
        threshold: 1
    });

    useEffect(() => {
        if (inView && !games.isLoading && games.items.length) {
            games.loadMore();
        }
    }, [inView, games]);


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 mb-3">
                        <Header />
                    </div>
                    
                    {error ? <div className="w-100 d-flex justify-content-center">{error}</div> : null}
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            {games.items && games.items.map(game => (
                                <div key={game.id} className="col-6 col-md-4 p-0">
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