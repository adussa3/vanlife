import { useOutletContext } from "react-router-dom";

export default function HostVanDetail() {
    /*
        NOTE:
        <Outlet /> is a context provider! We defined the Outlet's context in HostVanLayout.jsx

        useOutletContext() gets the context values!
    */
    const { hostVan } = useOutletContext();

    return (
        <>
            <section className="host-van-detail-info">
                <h4>
                    Name: <span>{hostVan.name}</span>
                </h4>
                <h4>
                    Category: <span>{hostVan.type}</span>
                </h4>
                <h4>
                    Description: <span>{hostVan.description}</span>
                </h4>
                <h4>
                    Visibility: <span>Public</span>
                </h4>
            </section>
        </>
    );
}
