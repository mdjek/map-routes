import * as actionTypes from './types';

const initialState = {
    placemarks: [
        {
            geometry: {
                coordinates: [55.8, 37.8],
            },
            properties: {
                iconContent: 1,
                balloonContent: 'Точка маршрута 1',
            },
        },
        {
            geometry: {
                coordinates: [55.9, 38.8],
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
        case actionTypes.SET_MARKER_INFO: {
            const placemarks = [ ...state.placemarks ];
            placemarks[action.data.index].properties.balloonContent = action.data.info;

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

        default: {
            return state;
        }
    }
};

export default RouteMapReducer;