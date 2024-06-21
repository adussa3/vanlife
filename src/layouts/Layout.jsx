import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
    return (
        <>
            <Header />
            {/*
                The <Oulet> component is a way to create a "hole" in whatever our component is
                where the matching route - that is a child of the Layout route - can render
            */}
            <Outlet />
        </>
    );
}
