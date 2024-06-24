import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function HostLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}
