import { NavLink } from "react-router-dom";

export default function Navigation() {
    const activeStyles = {
        textDecoration: "underline",
        color: "#161616",
        fontWeight: "bold",
    };

    return (
        <nav className="host-nav">
            {/*
                We can apply the "active" style to NavLink programmatically
                
                NavLink allows us to pass in a function, whatever the function returns
                is the className that gets applied to the NavLink

                The reason why this is beneficial is because React Router will pass an object
                in the function, and the object has a property called "isActive"

                The "isActive" property is a boolean that describes whether the route is the
                current active route

                We can use the "isActive" property to determine what the class name should be
            */}
            {/*
                PROBLEM:
                When we use:
                <NavLink to="/host" style={({ isActive }) => (isActive ? activeStyles : null)}>

                The activeStyles gets applied to dashboard even though the route doesn't match
                in the route definition

                For example, the current URL is "/host/income" and both Dashboard and Income
                have the active styles applied because React Router doesn't just match just a
                single route

                Under the hood, React Router matches multiple routes whenever we have a nested
                route (ex: /hosts/income), in this example React Router is matching 3 routes
                (by matching, it means that React Router considers it as an "active" route):
                (1) "/"
                    - the parent route
                    - renders <Layout />
                (2) "/host"
                    - the host route
                    - renders <HostLayout />
                    - the link for the host route (Dashboard) has styles applied to it
                (3) "/host/income"
                    - the income route
                    - renders <Income />
                    - the link for the income route (Income) has styles applied to it
                    - however, "/host" is active too in "/host/income" and applies the
                      styles to (dashboard)
                    - we DON'T want this! 

                SOLUTION:
                To fix this, we can add the "end" prop to the NavLink

                The "end" prop tell React Router to only match at the end of the "to" properties
                path

                For example, when the "/host/income" route is active, the "end" property prevents
                "/host" from beign active because the end doesn't match with the current route
                ("" doesn't match with "income")
            */}
            <NavLink to="/host" style={({ isActive }) => (isActive ? activeStyles : null)} end>
                Dashboard
            </NavLink>
            <NavLink to="/host/income" style={({ isActive }) => (isActive ? activeStyles : null)}>
                Income
            </NavLink>
            <NavLink to="/host/reviews" style={({ isActive }) => (isActive ? activeStyles : null)}>
                Reviews
            </NavLink>
        </nav>
    );
}
