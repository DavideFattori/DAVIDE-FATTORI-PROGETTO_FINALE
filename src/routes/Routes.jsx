import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { filters } from '../hooks/filtersFetch';
import AppHome from '../pages/AppHome';
import GameDetail from '../pages/GameDetail';
import GamesByGenre from '../pages/GamesByGenre';
import GamesByPlatform from '../pages/GamesByPlatform';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AppHome />} loader={filters} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/games/:genre" element={<GamesByGenre />} />
            <Route path="/games/:platform" element={<GamesByPlatform />} />
        </Route>
    )
);

export default router;