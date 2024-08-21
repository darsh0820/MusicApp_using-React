import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';
import './App.css';
import { HiArrowNarrowRight } from "react-icons/hi";


function App() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('songs');

    const fetchSongs = async (term) => {
        try {
            const response = await axios.get('https://itunes.apple.com/search', {
                params: {
                    term: term,
                    media: 'music',
                    limit: 10
                }
            });

            const fetchedSongs = response.data.results.map(song => ({
                id: song.trackId,
                title: song.trackName,
                artist: song.artistName,
                albumCover: song.artworkUrl100,
                url: song.previewUrl
            }));

            setSongs(fetchedSongs);
            setCurrentSongIndex(0); // Reset to the first song
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    useEffect(() => {
        fetchSongs(searchTerm);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = e.target.search.value.trim();
        if (term) {
            setSearchTerm(term);
        }
    };

    const handleNext = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    const handlePrev = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    };

    const handleSelectSong = (index) => {
        setCurrentSongIndex(index);
    };

    return (
        <div className="App">
            {songs.length > 0 && (
                <>
                    <MusicPlayer
                        currentSong={songs[currentSongIndex]}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                    <form onSubmit={handleSearch}>
                      <input
                          type="text"
                          name="search"
                          placeholder="Search for a song or artist..."
                          className="search-input"
                      />
                      <button type="submit" className="search-button"><HiArrowNarrowRight /></button>
                    </form>
                    <SongList songs={songs} onSelect={handleSelectSong} />
                </>
            )}
        </div>
    );
}

export default App;
