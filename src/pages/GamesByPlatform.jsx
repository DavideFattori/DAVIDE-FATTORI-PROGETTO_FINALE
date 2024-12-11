import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import '../style/filteredBy.css'

export default function GamesByGenre() {

    const { platform } = useParams();
    const [loading, setLoading] = useState(false);
    const [platformName, setPlatformName] = useState('');

    let games = useAsyncList({
        async load({ signal, cursor }) {
            setLoading(true);
        try {
                let response = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platfors=${platform}&page=1`, { signal });
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



    
    // setPlatformName(games[0].platforms.find(gamePlatforms => gamePlatforms.id === platform));

    console.log(platformName);
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0 mb-3">
                    <Header text={platform} />
                </div>
                {games.items && games.items.map(game => (
                    <div key={game.id} className="col-6 col-md-4 p-0">
                        <Card game={game} />
                    </div>
                ))}
                <div className="w-100 d-flex justify-content-center my-3" ref={ref}>{loading ? <div className="w-100 d-flex justify-content-center"><Loader /></div> : null}</div>
            </div>
        </div>
    )
}