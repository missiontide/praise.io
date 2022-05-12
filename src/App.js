import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SongSearchBar from "./SongSearchBar";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Search for a worship song:
                </p>
            </header>
            <SongSearchBar />
        </div>
    );
}

export default App;
