import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";
import makeSlides from "./makeSlides";
import { ProgressBar } from "react-bootstrap";

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
            loading: false,
            slidesCreated: false,
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
            showCanvas: true,
            slidesCreated: false, // when a change occurs, re-enable the create slides button
        });
    }

    // handles selected song remove click
    handleRemove(idx) {
        const selectedSongs = this.state.selectedSongs.filter((_, i) => {return i !== idx});

        this.setState({
            selectedSongs: selectedSongs,
            showCanvas: selectedSongs.length !== 0,
            slidesCreated: false, // when a change occurs, re-enable the create slides button
        });
    }

    handleShow() { this.setState({showCanvas: true})};
    handleHide() { this.setState({showCanvas: false})};

    // Make slides
    handleSubmit() {
        this.setState({loading:true});
        makeSlides(this.state.selectedSongs).finally(() => {
                this.setState({loading:false, slidesCreated: true})
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.loading && (
                    <div id="loadingOverlay">
                        <div>
                            <h3 class="loadingText">Creating worship slides...</h3>
                            <ProgressBar animated now={65}/>
                        </div>
                    </div>)
                }
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
                    slidesCreated={this.state.slidesCreated}
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
