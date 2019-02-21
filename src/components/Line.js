import React, { Component } from 'react';
import { GeoObject } from 'react-yandex-maps';
import PropTypes from 'prop-types';

class Line extends Component {
    render() {
        const { coordinates } = this.props;
        return (
            <GeoObject
                geometry={{
                    type: 'LineString',
                    coordinates,
                }}
                options={{
                    draggable: false,
                    strokeColor: '#000',
                    strokeWidth: 5,
                }}
            />
        );
    }
}

Line.propTypes = {
    coordinates: PropTypes.array,
};

export default Line;
