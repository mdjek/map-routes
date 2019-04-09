import React, { Fragment, useState } from 'react';
import { Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';

const Marker = (props) => {
    const [startDragCoords, changeCoords] = useState(null);

    const handleDragStart = (e) => {
        const coords = e.get('target').geometry.getCoordinates();

        changeCoords(coords);
    };

    const handleDragEnd = (e) => {
        const {index, handleChangeCoords } = props;
        const coords = e.get('target').geometry.getCoordinates();

        changeCoords(null);
        handleChangeCoords(index, coords);
    };

    const { index } = props;

    return (
        <Fragment>
            <Placemark
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                options={{
                    preset: index === 0 ? 'islands#redDotIcon' : 'islands#darkBlueDotIcon',
                    draggable: true,
                }}
                {...props}
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

Marker.propTypes = {
    index: PropTypes.number,
    coordinates: PropTypes.array,
    iconContent: PropTypes.number,
    balloonContent: PropTypes.string,
};

export default Marker;
