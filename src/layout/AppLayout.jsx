import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AppLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}