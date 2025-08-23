import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from '@ffmpeg/util';


export default function DiaryMaker() {
    const [videoURL, setVideoURL] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const ffmpegRef = useRef(new FFmpeg()); // Create a single FFmpeg instance
    const videoRef = useRef(null);
    const messageRef = useRef(null);

    // Load FFmpeg when component mounts
    useEffect(() => {
        load();
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

        console.log("Files: ", files);
        let conc        

        for (let i = 0; i < files.length; i++) {
            
            // 1) Write input video into FFmpeg's virtual file system
            const file = files[i];
            const name = file.name;
            const fileExtension = name.split('.').pop().toLowerCase(); // 'jpg' or 'mp4' etc.
            await ffmpeg.writeFile(name, await fetchFile(file));

            // 2) Build input list for FFmpeg concat demuxer
            // If it's an image, turn it into a short video segment (1s duration)
            if (file.type.startsWith('image/')) {
                // const outName = `img${i}.${fileExtension}`;

                await ffmpeg.exec([
                    "-framerate", "1",      // 1 fps (each frame = 1 second)
                    '-loop', '1',           // loop  image
                    '-i', name,             // input image
                    '-t', '2',              // duration in seconds
                    '-r', '30',             // 30 fps
                    '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease, pad=1280:720:(ow-iw)/2:(oh-ih)/2', // scale to a fixed size
                    '-c:v', 'libx264',          // use H.264 codec
                    '-pix_fmt', 'yuv420p',      // ensure compatibility pixel format
                    `segment${i}.mp4`
                ]);
                concatContent += (`file 'segment${i}.mp4'\n`);

            // If it's a video, re-encode for format consistency
            } else if (file.type.startsWith('video/')) {
                // const outName = `vid${i}.${fileExtension}`;
                // concatList.push(`file '${outName}`);

                await ffmpeg.exec([
                    '-i', name,             // input file
                    '-r', '30',             // 30 fps
                    '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease, pad=1280:720:(ow-iw)/2:(oh-ih)/2', // scale to a fixed size
                    '-c:v', 'libx264',      // use H.264 codec
                    '-pix_fmt', 'yuv420p',  // ensure compatibility pixel format
                    `segment${i}.mp4`
                ]);
                concatContent += `file 'segment${i}.mp4'\n`;
            }
        }

        // Write concat list to FS
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
    }

    // Function to load
    const load = async () => {
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
        const ffmpeg = ffmpegRef.current;

        // for logging
        ffmpeg.on('log', ({ message }) => {
            messageRef.current.innerHTML = message;
            console.log(message);
        });

        // Load ffmpeg WebAssembly core files ()
        // toBlobURL is used to bypass CORS issue, urls with the same
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'application/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
    }
        
    return (
        <div>
            <input 
                type="file" multiple accept="image/*,video/" 
                onChange={(e) => handleCompile(e.target.files)} 
            />
            {videoURL && <video src={videoURL} controls />}
            <p ref={messageRef}></p>
        </div>
    )
}