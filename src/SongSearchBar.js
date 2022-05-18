import React from 'react';
import { Table, Button, Spinner } from "react-bootstrap";
import Fuse from 'fuse.js';
import './SongSearchBar.css';
import dropShadow from "./dropshadow.png";

class SongSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchInput: "",
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            searchInput: e.target.value,
        });
    };

    // searches all songs based on searchInput
    // returns a song object array sorted by matching score
    searchSongs() {
        // Fuse search options
        const options = {
            keys: [
                {name: 'title', weight: 0.65},
                {name: 'artist', weight: 0.35}],
            threshold: 0.4,
        }

        const allSongs = this.props.songs;
        const fuseSearch = new Fuse(allSongs, options)
        const searchResult = fuseSearch.search(this.state.searchInput)

        // fuse returns objects sorted by match .score, the object is in .item
        return searchResult.map(result => result['item'])
    }

    render() {

        let songsToDisplay = [];

        if (this.state.searchInput.length > 0) {
            // match song titles/artists with search input
            songsToDisplay = this.searchSongs();
        }

        return (
            <div>
                <div>
                    <input
                        className="songSearchBar"
                        type="search"
                        placeholder="type a song or artist..."
                        onChange={this.handleChange}
                        value={this.state.searchInput}
                        autoFocus={true}
                    />
                </div>
                <div>
                    <img src={dropShadow} alt="drop shadow" />
                </div>

                {/* Loading Animation while songlist is being pulled from backend*/}
                {this.props.songs.length === 0 && (
                    <div>
                        <Spinner animation="border" variant="light" />
                        <p>Loading Songs...</p>
                    </div>
                )}


                {songsToDisplay.length !== 0 &&
                    (<>
                    <div className="tableWrapper">
                        <Table striped borderless>
                            <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {songsToDisplay.map((song, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td><AddSongButton
                                            value={song.id}
                                            onClick={() => this.props.onClick(song)}
                                        /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    <img src={dropShadow} alt="drop shadow" />
                    </div>
                    </>)
                }
            </div>
        )
    }
}

function AddSongButton(props) {
    return (
        <Button variant="dark" onClick={props.onClick}>+</Button>
    )
}

export default SongSearchBar;
