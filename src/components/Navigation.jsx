import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="host-nav">
            <NavLink to="/host">Dashboard</NavLink>
            <NavLink to="/host/income">Income</NavLink>
            <NavLink to="/host/reviews">Reviews</NavLink>
        </nav>
    );
}
