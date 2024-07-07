import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
    const [vans, setVans] = useState([]);

    /*
        Just like useState(), useSearchParams() the value we're creating and a setter function

        "searchParams" is an instance of the browser native "URLSearchParams" object! Because of
        this, the "searchParams" object has a whole set of methods

        Learn more about these methods here:
        https://reactrouter.com/en/main/hooks/use-search-params

        get() method:
        In the searchParams.get() method, we can provide a key in a key-value pair for our search
        parameters and it will return the value of that parameter

        So for example, we will use the parameter "type" in get: searchParams.get("type") 

        NOTE:
        We can use .toString() to convert the "URLSearchParams" object into a string
        this gives us a full picture of what the searchParams contains at any given time
    */
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type");
    console.log(typeFilter);

    useEffect(() => {
        async function fetchVans() {
            if (!localStorage.getItem("vans")) {
                const response = await fetch("/api/vans");
                const data = await response.json();
                localStorage.setItem("vans", JSON.stringify(data.vans));
            }
            const vans = JSON.parse(localStorage.getItem("vans"));
            setVans(vans);
        }
        fetchVans();
    }, []);

    console.log("vans:", vans);

    /*
        The simplest way to add search parameters (add the query in the URL) is to use the <Link> element

        We can use <Link> to specify a query!

        in the "to" attribute, we use "?" to set a query parameter in the current URL
    */
    const filterLinks = (
        <div className="van-list-filter-buttons">
            <Link to="?type=simple" className="van-type simple">
                Simple
            </Link>
            <Link to="?type=luxury" className="van-type luxury">
                Luxury
            </Link>
            <Link to="?type=rugged" className="van-type rugged">
                Rugged
            </Link>
            {/*
                RECALL: "." represent the current path ofthe current route!
                NOTE: an emptystring works too
            */}
            <Link to="." className="van-type clear-filters">
                Clear filter
            </Link>
        </div>
    );

    const filterLinks_SetSearchParams = (
        // We us an onClick event handler to call the "setSearchParams" function
        // This setter functon cna take in a new value for the searchParams which
        // will completely replace the old value, OR it can take in a callback function
        //
        // setSearchParams is very flexible, we can pass in any value that the URL searchParams
        // can take (link: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
        // There are 4 different types of parameters you can pass in, and it will generate
        // into a searchParams
        // (1) string - "type=jedi" or "?type=jedi"
        // (2) object (more common) - { type: jedi }
        // ...

        // NOTE: using isActive from NavLink does NOT work! It only checks if the current route is active
        //       but it does NOT check query parameters
        <div className="van-list-filter-buttons">
            <button
                className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
                onClick={() => setSearchParams("type=simple")}
            >
                Simple
            </button>
            <button
                className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
                onClick={() => setSearchParams("?type=luxury")}
            >
                Luxury
            </button>
            <button
                className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
                onClick={() => setSearchParams({ type: "rugged" })}
            >
                Rugged
            </button>
            {typeFilter && (
                <button className="van-type clear-filters" onClick={() => setSearchParams({})}>
                    Clear filters
                </button>
            )}
        </div>
    );

    const displayedVans = typeFilter ? vans.filter((van) => typeFilter === van.type) : vans;

    const vanElements = displayedVans.map((van) => (
        <div key={van.id} className="van-tile">
            {/*
                ACCESSIBILITY 
                We can add an "aria-label" property to indicate to the Screen Reader exactly what
                will happen when the link is clicked!

                It tells the Screen Reader exactly what shoulw be read out when it reads the content
                that's wrapped inside the link
            */}
            <Link to={`/vans/${van.id}`} aria-label={`View details for ${van.name} priced at $${van.price} per day`}>
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <p className="van-name">{van.name}</p>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    return (
        <>
            <div className="van-list-container">
                <h1>Explore our van options</h1>
                {filterLinks_SetSearchParams}
                <div className="van-list">{vanElements}</div>
            </div>
        </>
    );
}
