import { useEffect, useState } from "react";

export default function Vans() {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        async function fetchVans() {
            const response = await fetch("/api/vans");
            const data = await response.json();
            const vans = data.vans;
            setVans(vans);
        }
        fetchVans();
    }, []);

    console.log("vans:", vans);

    const vanElements = vans.map((van) => (
        <div key={van.id} className="van-tile">
            <img src={van.imageUrl} />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>
                    ${van.price}
                    <span>/day</span>
                </p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
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