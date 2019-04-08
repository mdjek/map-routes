import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map } from 'react-yandex-maps';
import { Marker, Line } from '.';

const YaMap = props => {
    const {
        mapState,
        placemarks,
        handleChangeCoords,
    } = props;

    return (
        <div className="ya-route">
            <div className="ya-route__map">
                <YMaps>
                    <Map
                        state={mapState}
                        width="100%"
                        height="500px"
                    >
                        {placemarks.map((placemarkParams, i) => (
                            <Fragment key={`placemarkFragment${placemarkParams.id}`}>
                                <Marker
                                    index={i}
                                    key={placemarkParams.id}
                                    handleChangeCoords={handleChangeCoords}
                                    {...placemarkParams}
                                />
                                { i !== placemarks.length-1
                                && (
                                    <Line
                                        key={`l${placemarkParams.id}`}
                                        coordinates={[placemarkParams.geometry.coordinates, placemarks[i+=1].geometry.coordinates]}
                                    />
                                )
                                }
                            </Fragment>
                        ))}
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};

YaMap.propTypes = {
    mapState: PropTypes.shape(),
    placemarks: PropTypes.array,
    handleChangeCoords: PropTypes.func,
};

export default YaMap;
