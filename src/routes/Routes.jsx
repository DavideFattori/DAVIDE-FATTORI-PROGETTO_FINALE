import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { filters } from '../hooks/filtersFetch';
import gameFetch from "../hooks/gameFetch";
import AppHome from '../pages/AppHome';
import AppLayout from '../layout/AppLayout';
import GameDetail from '../pages/GameDetail';
import GamesByGenre from '../pages/GamesByGenre';
import GamesByPlatform from '../pages/GamesByPlatform';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<AppHome />} loader={filters} />
            <Route path="/game/:id" element={<GameDetail loader={gameFetch} />} />
            <Route path="/games/:genre" element={<GamesByGenre />} />
            <Route path="/games/platform/:platform" element={<GamesByPlatform />} />
        </Route>
    )
);

export default router;