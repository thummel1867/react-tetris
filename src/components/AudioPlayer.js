import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src }) => {
    const audioRef = useRef(new Audio(src));

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.play().catch(error => {
            console.error("Error playing audio:", error);
        });

        return () => {
            audio.pause();
            audio.remove();
        };
    }, [src]);

    return null;
};

export default AudioPlayer;
