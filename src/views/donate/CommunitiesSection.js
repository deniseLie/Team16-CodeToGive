import React, { useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";

export default function CommunitiesSection ({ partitions }) {
    const [expandedPartitions, setExpandedPartitions] = useState({});

    // Function : View More button
    const handleViewMoreLess = (partitionTitle, showMore) => {
        setExpandedPartitions((prev) => ({
        ...prev,
        [partitionTitle]: showMore,
        }));
    }; 

    return (
        <div className="mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-10">

            {/* Partition */}
            { partitions.map((partition, index) => {
                const showAll = expandedPartitions[partition.title] || false;
                const imagesToShow = showAll ? partition.images : partition.images.slice(0, 4); // Show all images if expanded, otherwise show first 8
                return (
                    <div key={index} className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-blueGray-800 flex items-center gap-2">
                        <FaProjectDiagram className="text-blue-400" />
                        {partition.title}
                    </h3>

                    {/* Imagess */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {imagesToShow.map((image, imgIndex) => (
                        <a
                            key={imgIndex}
                            href={`/school/${partition.title.toLowerCase()}-${imgIndex + 1}`}
                            className="block"
                        >
                            <img
                                src={image}
                                alt={`Partition ${index + 1} Image ${imgIndex + 1}`}
                                className="w-full h-56 object-cover rounded-sl hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                            />
                        </a>
                        ))}
                    </div>

                    {/* View More */}
                    {partition.images.length > 4 && (
                        <div className="mt-6 text-center">
                        {!showAll ? (
                            <button
                            className="text-blue-500 underline font-semibold px-6 py-2 rounded hover:bg-blue-50 transition-all duration-200"
                            onClick={() => handleViewMoreLess(partition.title, true)}
                            >
                            View more
                            </button>
                        ) : (
                            <button
                            className="text-blue-500 underline font-semibold px-6 py-2 rounded hover:bg-blue-50 transition-all duration-200"
                            onClick={() => handleViewMoreLess(partition.title, false)}
                            >
                            View less
                            </button>
                        )}
                        </div>
                    )}
                    </div>
                )
            })}
          </div>
        </div>
    )
}