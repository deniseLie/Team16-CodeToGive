import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { getAll } from "utils/communitiesDB";

import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer";

export default function CommunityDetail() {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);

    useEffect(async () => {
        await fetchCommunity();
    }, [type, id, navigate]);
    
    const fetchCommunity = async () => {
        try {
            const items = await getAll(type);
            const found = items.find((item) => String(item.id) === String(id));
        
            if (!found) {
                navigate('/');
                return;
            }
            
            setCommunity(found);
        } catch (err) {
            console.error("Error fetching community:", err);
            navigate('/');
        }
    };

    if (!community) {
        return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen text-lg text-blueGray-500">
                Loading...
            </div>
        </>
        );
    }

    return (
        <>
            <Navbar transparent />
            <main>
                {/* Hero Section */}
                <section className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                                backgroundImage: `url(${community?.image})`,
                            }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-75 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div className="pr-12">
                            <h1 className="text-white font-semibold text-5xl">
                                {community?.name}
                            </h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                
                {/* Details Section */}
                <section className="container mx-auto px-6 py-10 mb-24">
                    <div className="bg-white shadow-xl rounded-2xl p-8">
                        {/* Description */}
                        <div className="text-blueGray-700 text-lg leading-relaxed text-justify mb-6">
                            {community?.description ||
                                "This community is dedicated to improving education, fostering collaboration, and supporting growth."}
                        </div>

                        {/* Location (for schools only) */}
                        {type === "schools" && community?.location && (
                            <div className="text-gray-700 text-md mb-4">
                                <span className="font-semibold">📍 Location:</span> {community.location}
                            </div>
                        )}

                        {/* Campaigns (for districts only) */}
                        {type === "districts" && community?.campaigns && (
                            <div className="text-blue-500 text-md mb-4">
                                <span className="font-semibold">🎯 Campaigns:</span> {community.campaigns}
                            </div>
                        )}

                        {/* Donate Button */}
                        <div className="mt-8">
                            <a
                                href="/donate"
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-all"
                            >
                                Donate to this {type === "districts" ? "District" : "School"}
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}