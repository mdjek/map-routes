import * as actionTypes from './types';

const placemark = {
    geometry: {
        coordinates: null,
    },
    properties: {
        iconContent: null,
        balloonContent: '',
    },
};

const initialState = {
    placemarks: [
        {
            geometry: {
                coordinates: [54.314, 48.403],
            },
            properties: {
                iconContent: 1,
                balloonContent: 'Точка маршрута 1',
            },
        },
        {
            geometry: {
                coordinates: [55.314, 49.403],
            },
            properties: {
                iconContent: 2,
                balloonContent: 'Точка маршрута 2',
            },
        }
    ],
};

const RouteMapReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case actionTypes.SET_MARKER_ADDRESS: {
            const placemarks = [ ...state.placemarks ];
            placemarks[action.data.index].properties.balloonContent = action.data.address;

            return {
                ...state,
                placemarks,
            };
        }

        case actionTypes.SET_MARKER_COORDS: {
            const placemarks = [ ...state.placemarks ];
            placemarks[action.data.index].geometry.coordinates = action.data.coords;

            return {
                ...state,
                placemarks,
            };
        }

        case actionTypes.CHANGE_MARKER_ORDER: {
            return {
                ...state,
                placemarks: action.data,
            };
        }

        case actionTypes.ADD_MARKER: {
            const placemarks = [ ...state.placemarks ];

            const newPlacemark = {
                geometry: {
                    coordinates: action.data.coords,
                },
                properties: {
                    iconContent: placemarks.length + 1,
                    balloonContent: action.data.address,
                },
            };

            return {
                ...state,
                placemarks: [ ...placemarks, newPlacemark]
            };
        }

        case actionTypes.REMOVE_MARKER: {
            return state;
        }

        default: {
            return state;
        }
    }
};

export default RouteMapReducer;