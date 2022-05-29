import { Offcanvas, Button, Card, ListGroup } from "react-bootstrap";
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function SelectedSongs(props) {
    const noSongsSelected = props.selectedSongs.length === 0
    
    return (
        <>
            {/* top-left button: open offCanvas */}
            <Button className="makeSlidesButton" variant="dark" onClick={props.onShow}>
                Make Slides
            </Button>

            <Offcanvas show={props.show} onHide={props.onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Slide Maker</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card style={{ width: '22.5rem' }}>
                        <Card.Header>{noSongsSelected ? "Selected Songs" : "Select a song"}</Card.Header>
                        {/* drag and drop context */}
                        <Droppable droppableId={"selectedSongDroppable"}>
                            {provided =>
                                <ListGroup
                                    variant="flush"
                                    ref={provided.innerRef}
                                >
                                    {/* selected songs list */}
                                    {props.selectedSongs.map((song, index) => {
                                        const idKey=index + "-" + song['_id'];
                                        return (
                                            <Draggable
                                                draggableId={idKey}
                                                index={index}
                                                key={idKey}
                                            >
                                                {provided => (
                                                    <ListGroup.Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {song.title} - {song.artist}
                                                        <Button
                                                            variant="outline-danger" size="sm" className="float-sm-end"
                                                            onClick={() => props.onClick(index)}
                                                        >
                                                            x
                                                        </Button>
                                                    </ListGroup.Item>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ListGroup>
                            }
                        </Droppable>
                    </Card>
                    {/* Add more songs button (closes Offcanvas) */}
                    {props.selectedSongs.length < 10 &&
                        <Button variant="dark"
                                style={{"marginTop": "10px", "marginLeft": "12rem"}}
                                onClick={props.onHide}
                        >
                            {noSongsSelected ? "Add a song >" : "Add more songs >"}
                        </Button>
                    }
                    {/* make slides button */}
                    <Button variant="primary" style={{height: '6rem'}}
                            className="float-end fixed-bottom position-absolute"
                            onClick={() => props.makeSlides()}
                            disabled={noSongsSelected || props.slidesCreated === true}
                    >
                        {props.slidesCreated === false ? "Make Slides" : "Slides Downloaded!"}
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
