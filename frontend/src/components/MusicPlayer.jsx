// src/components/MusicPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

function MusicPlayer({ currentSong, onNext, onPrev }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [currentSong]);

    if (!currentSong) {
        return <div className="music-player">No song selected</div>;
    }

    return (
        <div className="music-player">
            <div className={`marquee ${isPlaying ? 'scrolling' : ''}`}>
                <h3>{currentSong.title}</h3>
            </div>
            <div className={`marquee ${isPlaying ? 'scrolling' : ''}`}>
                <p>{currentSong.artist}</p>
            </div>
            <img 
                className={isPlaying ? 'rotating' : ''} 
                src={currentSong.albumCover} 
                alt={currentSong.title} 
            />
            <audio ref={audioRef} src={currentSong.url} onEnded={onNext}></audio>
            <div className="controls">
                <FaBackward onClick={onPrev} />
                {isPlaying ? <FaPause onClick={togglePlayPause} /> : <FaPlay onClick={togglePlayPause} />}
                <FaForward onClick={onNext} />
            </div>
        </div>
    );
}

export default MusicPlayer;
