import * as actionTypes from './types';

const initialState = {
    mapState: { center: [54.314, 48.403], zoom: 7, controls: ['zoomControl'] },
    placemarks: [
        {
            id: 123123123123,
            geometry: {
                coordinates: [54.314, 48.403],
            },
            properties: {
                balloonContent: 'Точка маршрута 1',
            },
        },
        {
            id: 5345345345,
            geometry: {
                coordinates: [55.314, 49.403],
            },
            properties: {
                balloonContent: 'Точка маршрута 2',
            },
        }
    ],
};

const RouteMapReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MAP_CENTER: {
            return {
                ...state,
                mapState: { ...state.mapState, center: action.data, },
            };
        }

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
                placemarks: [ ...action.data ],
            };
        }

        case actionTypes.ADD_MARKER: {
            return {
                ...state,
                placemarks: [ ...state.placemarks, action.data],
            };
        }

        case actionTypes.REMOVE_MARKER: {
            return {
                ...state,
                placemarks: [ ...action.data ],
            };
        }

        default: {
            return state;
        }
    }
};

export default RouteMapReducer;