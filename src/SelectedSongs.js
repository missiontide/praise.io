import React from 'react';
import { Offcanvas, Button, Card, ListGroup } from "react-bootstrap";

class SelectedSongs extends React.Component {

    render() {
        let makeSlidesButton;
        const noSongsSelected = this.props.selectedSongs.length === 0
        // slidesCreated is an App state set when a ppt has just been made
        // -- disable button until user makes a change
        if (this.props.slidesCreated === false && !noSongsSelected) {
            makeSlidesButton = (
                <Button variant="primary" style={{height: '6rem'}}
                        className="float-end fixed-bottom position-absolute"
                        onClick={() => this.props.makeSlides()}
                >
                    Make Slides
                </Button>
            );
        } else if (this.props.slidesCreated === false && noSongsSelected){
            makeSlidesButton = (
                <Button variant="primary" style={{height: '6rem'}}
                        className="float-end fixed-bottom position-absolute"
                        disabled
                >
                    Make Slides
                </Button>
            );
        } else if (this.props.slidesCreated === true) {
            makeSlidesButton = (
                <Button variant="success" style={{height: '6rem'}}
                        className="float-end fixed-bottom position-absolute"
                        disabled
                >
                    Slides Downloaded!
                </Button>
            );
        }

        return (
            <>
                <Button className="makeSlidesButton" variant="dark" onClick={this.props.onShow}>
                    Make Slides
                </Button>

                <Offcanvas show={this.props.show} onHide={this.props.onHide}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Slide Maker</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Card style={{ width: '22.5rem' }}>
                            <Card.Header>{noSongsSelected ? "Selected Songs" : "Select a song"}</Card.Header>
                            <ListGroup variant="flush">
                                {this.props.selectedSongs.map((song, index) => {
                                    return (
                                        <ListGroup.Item key={index + "-" + song._id}>
                                            {song.title} - {song.artist}
                                            <Button
                                                variant="outline-danger" size="sm" className="float-sm-end"
                                                onClick={() => this.props.onClick(index)}
                                            >
                                                x
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Card>
                        {this.props.selectedSongs.length < 10 &&
                            <Button variant="dark"
                                    style={{"margin-top": "10px", "margin-left": "12rem"}}
                                    onClick={this.props.onHide}
                            >
                                {noSongsSelected ? "Add a song >" : "Add more songs >"}
                            </Button>
                        }

                        {makeSlidesButton}

                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
}

export default SelectedSongs;
