import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
    /*
        The useParams() hook runs when the van details component is mounted

        React Router looks at any sections of the path that have a colon before it (like :vanId)
        and it adds it as a key-value pair in the object that we get from useParams
    */
    const { vanId } = useParams();

    const [van, setVan] = useState(null);

    useEffect(
        () => {
            async function fetchVan() {
                const response = await fetch(`/api/vans/${vanId}`);
                const data = await response.json();

                setVan(data.vans);
            }
            fetchVan();
        },
        /*
            NOTE:
            Even though this is't being used now, we could have a previous and a next button to show all the vans
            When we press the buttons the URL params will change and in this case, we want to get the current van
        */
        [vanId]
    );

    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price">
                        <span>${van.price}</span>/day
                    </p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}
