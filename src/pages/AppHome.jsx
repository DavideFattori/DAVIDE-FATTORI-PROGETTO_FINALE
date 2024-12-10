import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AppHome() {

    const { data: games, loading: loadingGames, error: errorGames } = useFetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-12`);

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 mb-3">
                        <Header />
                    </div>
                    {loadingGames ? <div className="w-100 d-flex justify-content-center"><Loader /></div> : null}
                    {errorGames ? <div className="w-100 d-flex justify-content-center">{errorGames}</div> : null}
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            {games && games.map(game => (
                                <div key={game.id} className="col-6 col-md-4 p-0">
                                    <Card game={game} />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}