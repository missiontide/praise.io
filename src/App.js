import './App.css';
import SongSearchBar from "./SongSearchBar";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Search for a worship song:
                </p>
                <SongSearchBar />
            </header>
        </div>
    );
}

export default App;
