import React from 'react';
import { Offcanvas, Button, Card, ListGroup } from "react-bootstrap";

class SelectedSongs extends React.Component {

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.props.onShow}>
                    Make Slides
                </Button>

                <Offcanvas show={this.props.show} onHide={this.props.onHide}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Slide Maker</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>{this.props.selectedSongs.length > 0 ? "Selected Songs" : "Select a song"}</Card.Header>
                            <ListGroup variant="flush">
                                {this.props.selectedSongs.map((song, index) => {
                                    return (
                                        <ListGroup.Item key={index + "-" + song.id}>
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

                        <Button variant="primary"
                                className="float-end fixed-bottom position-absolute"
                                onClick={() => this.props.makeSlides()}
                        >
                            Make Slides
                        </Button>

                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
}

export default SelectedSongs;
