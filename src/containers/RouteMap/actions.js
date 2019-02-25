import axios from 'axios';
import apiUrl from '../../api';
import * as actionTypes from './types';

export const requestRejected = (data = 1) => dispatch => (
    dispatch({
        type: actionTypes.REQUEST_REJECTED,
        data,
    })
);

export const resetRequestStatus = () => dispatch => (
    dispatch({
        type: actionTypes.REQUEST_RESET_STATUS,
    })
);

export const geocodeRequest = (data, scoParam) => (
    axios({
        method: 'get',
        url: `${apiUrl()}${(scoParam && scoParam !== '') ? `&sco=${scoParam}` : ''}&geocode=${data}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
);

export const changeOrder = (data) => (dispatch) => {
    dispatch({
        type: actionTypes.CHANGE_MARKER_ORDER,
        data,
    })
};

export const changeCoords = (index, coords) => dispatch => (
    dispatch({
        type: actionTypes.SET_MARKER_COORDS,
        data: {
            index,
            coords,
        },
    })
);

export const changeMapCenter = (coords) => dispatch => (
    dispatch({
        type: actionTypes.CHANGE_MAP_CENTER,
        data: coords,
    })
);

export const shapeMarker = (coords, address) => (dispatch) => {
    const id = Date.now();

    const newPlacemark = {
        id,
        geometry: {
            coordinates: coords,
        },
        properties: {
            balloonContent: address,
        },
    };

    dispatch({
        type: actionTypes.ADD_MARKER,
        data: newPlacemark,
    })
};

export const getInfoLocation = (data) => dispatch => (
    geocodeRequest(data)
        .then((response) => {
            const { status, data } = response;

            if (status >= 400) {
                throw new Error('Bad response from server');
            }

            if (
                data.response.GeoObjectCollection.featureMember
                && data.response.GeoObjectCollection.featureMember.length > 0
                && data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
                && data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData
            ) {
                const responseDataCoords = data.response.GeoObjectCollection.featureMember[0]
                    .GeoObject.Point.pos;
                const responseDataAddress = data.response.GeoObjectCollection.featureMember[0]
                    .GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

                if (responseDataCoords !== '') {
                    const coords = responseDataCoords.split(' ').reverse();
                    const formattedCoords = coords.map(item => +item);

                    dispatch(resetRequestStatus());
                    dispatch(shapeMarker(formattedCoords, responseDataAddress));
                    dispatch(changeMapCenter(formattedCoords));
                }
            } else {
                dispatch(requestRejected(2))
            }
        })
        .catch(() => (
            dispatch(requestRejected(1))
        ))
);

export const getAddressLocation = (index, data, scoParam = '') => dispatch => (
    geocodeRequest(data, scoParam)
        .then((response) => {
            const { status, data } = response;

            if (status >= 400) {
                throw new Error('Bad response from server');
            }

            if (data.response.GeoObjectCollection.featureMember
                && data.response.GeoObjectCollection.featureMember.length > 0) {
                dispatch(resetRequestStatus());
                dispatch({
                    type: actionTypes.SET_MARKER_ADDRESS,
                    data: {
                        index,
                        address: data.response.GeoObjectCollection.featureMember[0]
                            .GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
                    }
                })
            } else {
                dispatch(requestRejected(2))
            }
        })
        .catch(() => (
            dispatch(requestRejected(1))
        ))
);

export const addMarker = (data) => (dispatch) => {
    dispatch(getInfoLocation(data));
};

export const removeMarker = (id) => (dispatch, getState) => {
    const { RouteMapReducer: { placemarks } } = getState();

    const newList = placemarks.filter(item => item.id !== id);

    dispatch({
        type: actionTypes.REMOVE_MARKER,
        data: newList,
    })
};