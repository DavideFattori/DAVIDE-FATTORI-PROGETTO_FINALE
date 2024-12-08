import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
// import AppLayout from '../Layout/AppLayout';
import AppHome from '../pages/AppHome';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AppHome />} />
        </Route>
    )
);

export default router;