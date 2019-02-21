import React, { Component, Fragment } from 'react';
import { Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';

class Marker extends Component {
    state = {
        startDragCoords: null,
    };

    handleDragStart = (e) => {
        const startDragCoords = e.get('target').geometry.getCoordinates();

        this.setState({
            startDragCoords,
        });
    };

    handleDragEnd = (e) => {
        const {index, handleChangeCoords } = this.props;
        const coords = e.get('target').geometry.getCoordinates();

        this.setState({
            startDragCoords: null,
        });

        handleChangeCoords(index, coords);
    };

    // handleClick = (e) => {
    //     const { index, properties: { properties: { balloonContent } } } = this.props;
    //     // const coords = e.get('target').geometry.getCoordinates();
    //     //
    //     // handleGetInfo(index, coords, 'latlong');
    //     // const { index } = this.props;
    //
    //
    //     console.log(this.props);
    // };

    render() {
        return (
            <Fragment>
                <Placemark
                    // onClick={this.handleClick}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                    options={{
                        preset: 'islands#darkBlueStretchyIcon',
                        draggable: true,
                    }}
                    {...this.props}
                />
                {this.state.startDragCoords
                    && (<Placemark
                            geometry={{
                                coordinates: this.state.startDragCoords,
                            }}
                            options={{
                                preset: 'islands#lightBlueDotIcon',
                                draggable: false,
                            }}
                        />
                    )
                }
            </Fragment>
        );
    }
}

Marker.propTypes = {
    index: PropTypes.number,
    coordinates: PropTypes.array,
    iconContent: PropTypes.number,
    balloonContent: PropTypes.string,
};

export default Marker;
