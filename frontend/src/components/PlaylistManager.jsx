// src/components/PlaylistManager.js
import React, { useState } from 'react';

function PlaylistManager({ songs, onAddToPlaylist, onSelectPlaylist }) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState({});

    const createPlaylist = () => {
        setPlaylists({ ...playlists, [playlistName]: [] });
        setPlaylistName('');
    };

    const addSongToPlaylist = (playlistName, song) => {
        setPlaylists({
            ...playlists,
            [playlistName]: [...playlists[playlistName], song],
        });
    };

    return (
        <div className="playlist-manager">
            <h2>Create Playlist</h2>
            <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist Name"
            />
            <button onClick={createPlaylist}>Create</button>

            <h3>Playlists</h3>
            <ul>
                {Object.keys(playlists).map((name, index) => (
                    <li key={index} onClick={() => onSelectPlaylist(playlists[name])}>
                        {name}
                    </li>
                ))}
            </ul>

            <h3>Add Song to Playlist</h3>
            <ul>
                {songs.map((song, index) => (
                    <li key={index} onClick={() => addSongToPlaylist(playlistName, song)}>
                        {song.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistManager;
