import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const News = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
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
        return <div className="flex justify-center items-center mt-20">
            <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-4 h-4 bg-gradient-to-r from-[#10758B] to-[#0D5F73] rounded-full animate-bounce [animation-delay:0ms] shadow-lg" />
                <div className="w-4 h-4 bg-gradient-to-r from-[#10758B] to-[#0D5F73] rounded-full animate-bounce [animation-delay:150ms] shadow-lg" />
                <div className="w-4 h-4 bg-gradient-to-r from-[#10758B] to-[#0D5F73] rounded-full animate-bounce [animation-delay:300ms] shadow-lg" />
            </div>
        </div>
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
