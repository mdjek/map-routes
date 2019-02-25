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

    render() {
        const { index } = this.props;
        const { startDragCoords } = this.state;

        return (
            <Fragment>
                <Placemark
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                    options={{
                        preset: index === 0 ? 'islands#redDotIcon' : 'islands#darkBlueDotIcon',
                        draggable: true,
                    }}
                    {...this.props}
                />
                {startDragCoords
                    && (<Placemark
                            geometry={{
                                coordinates: startDragCoords,
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
