// src/components/SongList.js
import React from 'react';

function SongList({ songs, onSelect }) {
    return (
        <div className="song-list">
            <h2>Search Results</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={song.id} onClick={() => onSelect(index)}>
                        <img src={song.albumCover} alt={song.title} />
                        <div className="song-details">
                            <p className="song-title"><strong>{song.title}</strong></p>
                            <p className="artist-name">{song.artist}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SongList;
