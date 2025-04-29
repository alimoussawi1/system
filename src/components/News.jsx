import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const News = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const db = getFirestore();
                const bannerDoc = await getDoc(doc(db, "banners", "bannerList"));

                if (bannerDoc.exists()) {
                    const data = bannerDoc.data();
                    if (Array.isArray(data.banners)) {
                        setBanners(data.banners); // <-- it's an array
                    }
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading) {
        return <div>Loading banners...</div>;
    }

    return (
        <div className="flex flex-col gap-6 p-6 h-full">
            {banners.map((banner, index) => (
                <a
                    key={index}
                    href={banner.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg shadow-lg "
                >
                    <img
                        src={banner.url}
                        alt={`Banner ${index}`}
                        className="w-full h-auto object-cover"
                    />
                </a>
            ))}
        </div>
    );
};

export default News;
