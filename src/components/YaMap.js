import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map } from 'react-yandex-maps';
import { Marker, Line } from '.';

const initialMapState = { center: [54.314, 48.403], zoom: 7, controls: [] };

const YaMap = props => {
    const {
        placemarks,
        handleChangeCoords,
    } = props;

    return (
        <YMaps>
            <Map state={initialMapState} width="500px" height="500px">
                {placemarks.map((placemarkParams, i) => (
                    <Fragment key={`placemarkFragment${i}`}>
                        <Marker
                            key={`m${i}`}
                            index={i}
                            handleChangeCoords={handleChangeCoords}
                            {...placemarkParams}
                        />
                        { i !== placemarks.length-1
                        && (
                            <Line
                                key={`l${i}`}
                                coordinates={[placemarkParams.geometry.coordinates, placemarks[i+=1].geometry.coordinates]}
                            />
                        )
                        }
                    </Fragment>
                ))}
            </Map>
        </YMaps>
    );
};

YaMap.propTypes = {
    placemarks: PropTypes.array,
    handleChangeCoords: PropTypes.func,
};

export default YaMap;
