import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { filters } from '../hooks/filtersFetch';
import gameFetch from "../hooks/gameFetch";
import AppHome from '../pages/AppHome';
import AppLayout from '../layout/AppLayout';
import GameDetail from '../pages/GameDetail';
import GamesByGenre from '../pages/GamesByGenre';
import GamesByPlatform from '../pages/GamesByPlatform';
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SearchedGameNamePage from "../pages/SearchedGameNamePage";
import ProfilePage from "../pages/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<AppHome />} loader={filters} />
            <Route path="/games/:name" element={<SearchedGameNamePage />} />
            <Route path="/game/:id" element={<GameDetail loader={gameFetch} />} />
            <Route path="/games/:genre" element={<GamesByGenre />} />
            <Route path="/games/platform/:platform/:platformName" element={<GamesByPlatform />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/update" element={<UpdateProfilePage />} />
            <Route path="*" element={<h1>404</h1>} />
        </Route>
    )
);

export default router;