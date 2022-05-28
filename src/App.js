import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import './App.css';

import React, { useState, useEffect } from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";
import makeSlides from "./makeSlides";
import {ProgressBar, Toast, ToastContainer} from "react-bootstrap";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,} from '@dnd-kit/sortable';


export default function App() {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [showCanvas, setShowCanvas] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slidesCreated, setSlidesCreated] = useState(false);
    const [showError, setShowError] = useState(false);

    // Initialize
    // get song data from api
    useEffect(() => {
        // function to make GET request to server for api
        const getData = async () => {
            const response = await fetch((process.env.NODE_ENV === "production" ? "https://praiseio-server.herokuapp.com" : "") + "/songs");
            const data = await response.json();

            setSongs(data);
            // this.render();
        };

        getData().then()
    }, [])

    // handles add song click
    function handleAddSong(song) {
        // too many songs added -- show error Toast
        if (selectedSongs.length >= 10) {
            setShowError(true);
        } else {
            // add song to selected songs and open selected songs canvas
            setSelectedSongs(selectedSongs.concat(song));
            setShowCanvas(true);
            setSlidesCreated(false); // when a change occurs, re-enable the create slides button
        }
    }

    // handles selected song remove click
    // removes song at index of selectedSongs
    function handleRemoveSong(idx) {
        const newSelectedSongs = selectedSongs.filter((_, i) => {return i !== idx});

        setSelectedSongs(newSelectedSongs);
        setShowCanvas(newSelectedSongs.length !== 0);
        setSlidesCreated(false); // when a change occurs, re-enable the create slides button
    }

    // Make slides
    function handleSubmit() {
        setLoading(true);
        makeSlides(selectedSongs).finally(() => {
            setLoading(false);
            setSlidesCreated(true);
        });
    }


    return (
        <div className="App">
            <p className="signature">
                made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
            </p>
            {loading && (
                <div id="loadingOverlay">
                    <div>
                        <h3 className="loadingText">Creating worship slides...</h3>
                        <ProgressBar animated now={65}/>
                    </div>
                </div>)
            }
            <ToastContainer position="top-end">
                <Toast
                    onClose={() => setShowError(false)}
                    show={showError}
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
                selectedSongs={selectedSongs}
                onClick={(idx) => handleRemoveSong(idx)}
                onShow={() => setShowCanvas(true)}
                onHide={() => setShowCanvas(false)}
                show={showCanvas}
                makeSlides={() => handleSubmit()}
                slidesCreated={slidesCreated}
            />
            <SongSearchBar
                songs={songs}
                onClick={(song) => handleAddSong(song)}
            />
        </div>
    );
}
