import React from 'react';
import { Table, Button } from "react-bootstrap";
import './SongSearchBar.css';

class SongSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchInput: "",
            songs: [],
        }
    }

    // get song data from api
    componentDidMount() {
        // function to make GET request to server for api
        const getData = async () => {
            const response = await fetch("/songs");
            const data = await response.json();

            this.setState({songs: data});
        };

        getData().then();
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
            songsToDisplay = this.state.songs.filter((song) => {
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
                                    <td><Button variant="warning">+</Button></td>
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

export default SongSearchBar;
