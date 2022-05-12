import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import SongSearchBar from "./SongSearchBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
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
            this.render();
        };

        getData().then()
    }

    // handles add song click
    handleClick(id) {
        console.log(id);
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
            </div>
        );
    }
}

export default App;
