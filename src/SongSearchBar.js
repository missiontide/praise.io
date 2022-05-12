import React from 'react';
import { Table, Button } from "react-bootstrap";
import './SongSearchBar.css';

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
                <input
                    type="search"
                    placeholder="type a song or artist"
                    onChange={this.handleChange}
                    value={this.state.searchInput} />

                {songsToDisplay.length !== 0 &&
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Song</th>
                            <th>Artist</th>
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
                                        onClick={() => this.props.onClick(song.id)}
                                    /></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                }
            </div>
        )
    }
}

function AddSongButton(props) {
    return (
        <Button variant="warning" onClick={props.onClick}>+</Button>
    )
}

export default SongSearchBar;
