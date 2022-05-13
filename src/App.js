import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";
import makeSlides from "./makeSlides";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            songs: [],
            selectedSongs: [],
            showCanvas: false,
        }
    }

    // get song data from api
    componentDidMount() {
        // function to make GET request to server for api
        const getData = async () => {
            const response = await fetch("/songs");
            const data = await response.json();

            this.setState({songs: data});
            this.render();
        };

        getData().then()
    }

    // handles add song click
    handleAdd(song) {
        this.setState({
            selectedSongs: this.state.selectedSongs.concat(song),
            showCanvas: true
        });
    }

    // handles selected song remove click
    handleRemove(idx) {
        const selectedSongs = this.state.selectedSongs.filter((_, i) => {return i !== idx});

        this.setState({
            selectedSongs: selectedSongs,
            showCanvas: selectedSongs.length !== 0,
        });
    }

    handleShow() { this.setState({showCanvas: true})};
    handleHide() { this.setState({showCanvas: false})};

    handleSubmit() {
        makeSlides(this.state.selectedSongs);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Search for a worship song:
                    </p>
                </header>
                <SelectedSongs
                    selectedSongs={this.state.selectedSongs}
                    onClick={(idx) => this.handleRemove(idx)}
                    onShow={() => this.handleShow()}
                    onHide={() => this.handleHide()}
                    show={this.state.showCanvas}
                    makeSlides={() => this.handleSubmit()}
                />
                <SongSearchBar
                    songs={this.state.songs}
                    onClick={(song) => this.handleAdd(song)}
                />
            </div>
        );
    }
}

export default App;
