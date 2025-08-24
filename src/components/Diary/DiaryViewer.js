import { useState, useEffect } from "react";


export default function DiaryViewer({ url }) {
    return (
        <div className="w-full overflow-hidden">
            <video src={url} controls />
        </div>
    )
}