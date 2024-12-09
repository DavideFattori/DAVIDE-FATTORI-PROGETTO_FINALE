import { Link } from "react-router";
import '../style/card.css';

export default function Card({ game }) {

    return (
        <div className="cardCustom text-decoration-none" style={{ backgroundImage: `url(${game.background_image})`}}>
            <div className="w-100 h-100 d-flex flex-column justify-content-center p-3 cardContentCustom">
                <div className="text-white ps-3 cardText"><h6 className="pt-2">{game.genres.map(genre => genre.name).join(', ')}</h6></div>
                <div className="border-top">
                    <h4 className="text-white ps-3 cardText mb-0 pb-2 pt-1">{game.name}</h4>
                </div>
            </div>
        </div>
    )
}