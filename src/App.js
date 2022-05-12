import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            songs: [],
            selectedSongs: [],
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
    handleClick(id) {
        this.setState({selectedSongs: this.state.selectedSongs + id});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Search for a worship song:
                    </p>
                </header>
                <SongSearchBar songs={this.state.songs} onClick={(id) => this.handleClick(id)}/>
                <SelectedSongs selectedSongs={this.state.selectedSongs}/>
            </div>
        );
    }
}

export default App;
