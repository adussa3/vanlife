import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostVanLayout() {
    /*
        The useParams() hook runs when the van details component is mounted

        React Router looks at any sections of the path that have a colon before it (like :vanId)
        and it adds it as a key-value pair in the object that we get from useParams
    */
    const { vanId } = useParams();

    const [hostVan, setHostVan] = useState(null);

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    useEffect(() => {
        async function fetchHostVan() {
            const response = await fetch("/api/host/vans/" + vanId);
            const data = await response.json();
            const van = data.vans[0];
            setHostVan(van);
        }
        fetchHostVan();
    }, [vanId]);

    if (!hostVan) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {hostVan && (
                <>
                    <section>
                        {/*
                            PROBLEM
                            <Link to=".." className="back-button"> takes us to "/host" too far back!
                            We want to go back to "/host/vans"

                            WHY DOES THIS HAPPEN?
                            When we're using relative links (links without a / at the beginning), it's
                            relative to the route definition hierarchy in App.jsx!

                            relative links ARE NOT relative to the path that we currently see in the URL!

                            Currently, we're in route:
                            <Route path="vans/:id" element={<HostVanDetail />} />

                            When we use ".." it's acutually goes up one level into the the parent route
                            which is <Route path="host" element={<HostLayout />}>

                            SOLUTION
                            We add the relative="path" prop in <Link>
                            relative="path" looks at the path in the current URL! So to=".." goes from
                            "/host/vans/1" to "/host/vans"

                            NOTE: by default, relative is set to relative="route" which looks at the
                                  route definition hierarchy
                        */}
                        <Link to=".." relative="path" className="back-button">
                            &larr; <span>Back to all vans</span>
                        </Link>

                        <div className="host-van-detail-layout-container">
                            <div className="host-van-detail">
                                <img src={hostVan.imageUrl} />
                                <div className="host-van-detail-info-text">
                                    <i className={`van-type van-type-${hostVan.type}`}>{hostVan.type}</i>
                                    <h3>{hostVan.name}</h3>
                                    <h4>${hostVan.price}/day</h4>
                                </div>
                            </div>
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
                            <nav className="host-van-detail-nav">
                                <NavLink to="." style={({ isActive }) => (isActive ? activeStyles : null)} end>
                                    Details
                                </NavLink>
                                <NavLink to="pricing" style={({ isActive }) => (isActive ? activeStyles : null)}>
                                    Pricing
                                </NavLink>
                                <NavLink to="photos" style={({ isActive }) => (isActive ? activeStyles : null)}>
                                    Photos
                                </NavLink>
                            </nav>
                            <Outlet />
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
