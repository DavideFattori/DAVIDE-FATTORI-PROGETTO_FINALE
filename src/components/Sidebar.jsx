import { useLoaderData, Link } from 'react-router';
import '../style/sidebar.css'

export default function Sidebar() {

    const { genres, platforms } = useLoaderData();

    return (
        <div className='filtersContainer'>
            <h3 className='text-white'>GENERI</h3>
            <ul className='list-unstyled text-white filterList border rounded-3 ps-3'>
            {genres.map((genre) => (
                    <li key={genre.id} className='d-flex my-3 align-items-center'>
                        <div className='imgFilter' style={{ backgroundImage: `url(${genre.image_background})` }} />
                        <Link to={`/games/genre/${genre.slug}`} className='text-white text-decoration-none ms-2 linkSidebar'>{genre.name}</Link>
                    </li>
                ))}
            </ul>

            <h3 className='text-white mt-5'>PIATTAFORME</h3>
            <ul className='list-unstyled text-white filterList border rounded-3 ps-3'>
            {platforms.map((platform) => (
                    <li key={platform.id} className='d-flex my-3 align-items-center'>
                        <div className='imgFilter' style={{ backgroundImage: `url(${platform.image_background})` }} />
                        <Link to={`/games/platform/${platform.id}/${platform.name}`} className='text-white text-decoration-none ms-2 linkSidebar'>{platform.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
