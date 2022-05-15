import React from 'react';
import { Table, Button } from "react-bootstrap";
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

    render() {

        let songsToDisplay = [];

        if (this.state.searchInput.length > 0) {
            // match song titles/artists with search input
            songsToDisplay = this.props.songs.filter((song) => {
                return song.title.toLowerCase().match(this.state.searchInput.toLowerCase())
                    || song.artist.toLowerCase().match(this.state.searchInput.toLowerCase());
            })
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


                {songsToDisplay.length !== 0 &&
                    (<><Table striped borderless responsive="sm">
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
