import React from 'react';
import { Offcanvas, Button } from "react-bootstrap";

class SelectedSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show: true});

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Selected Songs
                </Button>

                <Offcanvas show={this.state.show} onHide={this.handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Song ids selected: {this.props.selectedSongs}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
}

export default SelectedSongs;
