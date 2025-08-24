import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from '@ffmpeg/util';

import { saveDiary } from "utils/db.js"
import { videoPublishedSuccessAlert } from 'components/Alert/websiteAlterSuccessAlert.js'

export default function DiaryMaker() {
    const [videoURL, setVideoURL] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(null);

    const ffmpegRef = useRef(new FFmpeg()); // Create a single FFmpeg instance
    const videoRef = useRef(null);

    // Load FFmpeg when component mounts
    useEffect(() => {
        loadFFmpeg();
    }, []);

    // Function to load compiled video via ffmpeg
    const handleCompile = async (files) => {

        if (!loaded) {
            alert("FFmpeg is still loading");
            return;
        }

        const ffmpeg = ffmpegRef.current;
        
        // Input list for FFmpeg concat demuxer
        let concatFile = "file_list.txt";
        let concatContent = "";

        // update status
        setProgress(0);
        setStatus("Processing files...");

        console.log("Files: ", files);
        let conc        

        for (let i = 0; i < files.length; i++) {
            
            const file = files[i];
            const name = file.name;
            const fileExtension = name.split('.').pop().toLowerCase(); // 'jpg' or 'mp4' etc.
            setStatus(`Processing file ${i + 1} of ${files.length} (${file.name})...`);
            
            // 1) Write input video into FFmpeg's virtual file system
            await ffmpeg.writeFile(name, await fetchFile(file));

            // Reset progress for this file
            let localProgress = 0;

            // 2) Build input list for FFmpeg concat demuxer
            // If it's an image, turn it into a short video segment (1s duration)
            if (file.type.startsWith('image/')) {

                await ffmpeg.exec([
                    "-framerate", "2",      // 1 fps (each frame = 1 second)
                    '-loop', '1',           // loop  image
                    '-i', name,             // input image
                    '-t', '2',              // duration in seconds
                    '-r', '15',             // 15 fps
                    '-vf', 'scale=854:480:force_original_aspect_ratio=decrease, pad=854:480:(ow-iw)/2:(oh-ih)/2', // scale to a fixed size
                    '-c:v', 'libx264',          // use H.264 codec
                    '-pix_fmt', 'yuv420p',      // ensure compatibility pixel format
                    '-crf', '28',               // higher compression
                    '-preset', 'veryfast',
                    `segment${i}.mp4`
                ]);
                concatContent += (`file 'segment${i}.mp4'\n`);

            // If it's a video, re-encode for format consistency
            } else if (file.type.startsWith('video/')) {

                await ffmpeg.exec([
                    '-i', name,             // input file
                    '-r', '30',             // 30 fps
                    '-vf', 'scale=854:480:force_original_aspect_ratio=decrease, pad=854:480:(ow-iw)/2:(oh-ih)/2', // scale to a fixed size
                    '-c:v', 'libx264',      // use H.264 codec
                    '-pix_fmt', 'yuv420p',  // ensure compatibility pixel format
                    '-crf', '28',               // higher compression
                    '-preset', 'veryfast',
                    `segment${i}.mp4`
                ]);
                concatContent += `file 'segment${i}.mp4'\n`;
            }

            setProgress((i+1) * 100 / files.length / 2)
        }

        // Write concat list to FS
        setStatus("Concatenating video segments...");
        await ffmpeg.writeFile(concatFile, concatContent);

        // Concatenate all segments
        await ffmpeg.exec([
            '-f', 'concat',         // concat demuxer
            '-safe', '0',           // allow unsafe file paths
            '-i', concatFile,       // input file list
            "-c:v", "libx264",      // use H.264 codec
            "-pix_fmt", "yuv420p", // ensure compatibility pixel format
            'output.mp4'
        ]);

        // Read the result
        const data = await ffmpeg.readFile('output.mp4');
        const videoBlob = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        setVideoURL(videoBlob);

        ffmpeg.off('progress');
        setStatus("Done!");
        setProgress(100);
    }

    // Function to load
    const loadFFmpeg = async () => {
        try {
            const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
            const ffmpeg = ffmpegRef.current;

            // for logging
            ffmpeg.on('log', ({ message }) => {
                console.log("message ", message);
            });

            // Load ffmpeg WebAssembly core files ()
            // toBlobURL is used to bypass CORS issue, urls with the same
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'application/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setLoaded(true);
        } catch (error) {
            console.error('FFmpeg failed to load:', error);

            // Reload the page after 2 seconds
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    // Function Save Video to localstorage
    const saveVid = async () => {
        if (!videoURL) return;

        const response = await fetch(videoURL);
        const blob = await response.blob();
        await saveDiary(blob);
        videoPublishedSuccessAlert();
    }
        
    return (
        <div>
            <input 
                type="file" 
                multiple 
                accept="image/*,video/" 
                onChange={(e) => handleCompile(e.target.files)} 
            />
            
            {status != null && (
                <>
                    <div className="mt-5">
                        <div className="max-w-sm h-5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p>{status} {progress > 0 && `(${progress}%)`}</p>
                    </div>
                    {videoURL && 
                        <video src={videoURL} controls />
                    }

                    <button 
                        onClick={saveVid}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Save Diary
                    </button>
                </>
            )}
        </div>
    )
}