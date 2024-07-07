import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    const { hostVan } = useOutletContext();

    return <img src={hostVan.imageUrl} className="host-van-detail-image" />;
}
