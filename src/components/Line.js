import React from 'react';
import { GeoObject } from 'react-yandex-maps';
import PropTypes from 'prop-types';

const Line = ({ coordinates }) => (
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

Line.propTypes = {
    coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number),
    ),
};

export default Line;
