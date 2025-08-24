import React, { useState, useEffect } from 'react';

import DiaryViewer from "components/Diary/DiaryViewer";
import { getAllDiaries } from "utils/db";

export default function DiariesSection() {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        loadDiaries();
    }, []);

    const loadDiaries = async () => {
        const all = await getAllDiaries();
        // console.log('alll', all);
        setDiaries(all);
    };

    return (
        <section className="px-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Our Diaries</h2>
            {diaries.length === 0 && <p>No diaries available yet.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {diaries.map((d, idx) => (
                    <div key={idx} className="srounded p-2">
                        <DiaryViewer url={URL.createObjectURL(d.blob)} />
                    </div>
                ))}
            </div>
        </section>
    )
}