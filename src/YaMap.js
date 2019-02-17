import React, { Component, Fragment } from 'react';
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';

const mapState = { center: [55.76, 37.64], zoom: 7, controls: [] };

const handleDrag = (e) => {
    const coords = e.get('target').geometry.getCoordinates();
    console.log(coords);
}

const placemarks = [
    {
        geometry: {
            type: 'Point',
            coordinates: [55.8, 37.8],
        },
        properties: {
            iconContent: 1,
            hintContent: 'Точка маршрута 1',
        },
        options: {
            preset: 'islands#darkBlueStretchyIcon',
            draggable: true,
        },
    },
    {
        geometry: {
            type: 'Point',
            coordinates: [55.9, 38.8],
        },
        properties: {
            iconContent: 2,
            hintContent: 'Точка маршрута 2',
        },
        options: {
            preset: 'islands#darkBlueStretchyIcon',
            draggable: true,
        },
    }
];

class Map1 extends Component {
    render() {
        return (
            <YMaps>
                <div>
                    <Map state={mapState} >
                        {placemarks.map((placemarkParams, i) => (
                            <Fragment>
                                <Placemark
                                    key={`placemark${i}`}
                                    onDrag={handleDrag}
                                    {...placemarkParams}
                                />
                                { i !== placemarks.length-1
                                    && (
                                    <GeoObject
                                        key={`line${i}`}
                                        geometry={{
                                            type: 'LineString',
                                            coordinates: [placemarkParams.geometry.coordinates, placemarks[i+=1].geometry.coordinates],
                                        }}
                                        options={{
                                            draggable: false,
                                            strokeColor: '#000',
                                            strokeWidth: 5,
                                        }}
                                    />


                                    )
                                }
                            </Fragment>
                        ))}
                    </Map>
                </div>
            </YMaps>
        );
    }
}

export default Map1;