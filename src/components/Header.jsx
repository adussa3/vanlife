import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <NavLink className="site-logo" to="/">
                #VanLife
            </NavLink>
            <nav>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/vans">Vans</NavLink>
            </nav>
        </header>
    );
}
