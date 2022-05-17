import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import './App.css';

import React from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";
import makeSlides from "./makeSlides";
import {ProgressBar, Toast, ToastContainer} from "react-bootstrap";

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
            showError: false,
        }
    }

    // get song data from api
    componentDidMount() {
        // function to make GET request to server for api
        const getData = async () => {
            const response = await fetch((process.env.NODE_ENV === "production" ? "https://praiseio-server.herokuapp.com" : "") + "/songs");
            const data = await response.json();

            this.setState({songs: data});
            this.render();
        };

        getData().then()
    }

    // handles add song click
    handleAdd(song) {
        // too many songs added -- show error Toast
        if (this.state.selectedSongs.length >= 10) {
            this.setState({showError: true})
        } else {
            this.setState({
                selectedSongs: this.state.selectedSongs.concat(song),
                showCanvas: true,
                slidesCreated: false, // when a change occurs, re-enable the create slides button
            });
        }
    }

    // handles selected song remove click
    // removes song at index of selectedSongs
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
                <p className="signature">
                    made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
                </p>
                {this.state.loading && (
                    <div id="loadingOverlay">
                        <div>
                            <h3 className="loadingText">Creating worship slides...</h3>
                            <ProgressBar animated now={65}/>
                        </div>
                    </div>)
                }
                <ToastContainer position="top-end">
                    <Toast
                        onClose={() => this.setState({showError:false})}
                        show={this.state.showError}
                        delay={3000}
                        autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Error</strong>
                            <small></small>
                        </Toast.Header>
                        <Toast.Body>Maximum songs reached.</Toast.Body>
                    </Toast>
                </ToastContainer>


                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
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
