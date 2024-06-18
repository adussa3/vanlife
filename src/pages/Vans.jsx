import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
    const [vans, setVans] = useState([]);

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

    const vanElements = vans.map((van) => (
        <div key={van.id} className="van-tile">
            {/*
                ACCESSIBILITY 
                We can add an "aria-label" property to indicate tothe Screen Reader exactly what
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
                <div className="van-list">{vanElements}</div>
            </div>
        </>
    );
}
