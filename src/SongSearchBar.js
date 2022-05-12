import './SongSearchBar.css';
import React from 'react';

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

        let songsToDisplay;

        if (this.state.searchInput.length > 0) {
            songsToDisplay = this.state.songs.filter((song) => {
                return song.title.toLowerCase().match(this.state.searchInput.toLowerCase());
            })
        } else {
            songsToDisplay = this.state.songs;
        }

        return (
            <div>
                <input
                    type="search"
                    placeholder="Search here"
                    onChange={this.handleChange}
                    value={this.state.searchInput} />

                {this.state.searchInput !== "" &&
                    <table>
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
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default SongSearchBar;
