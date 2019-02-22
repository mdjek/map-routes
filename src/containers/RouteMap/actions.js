import axios from 'axios';
import apiUrl from '../../api';
import * as actionTypes from './types';

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
            coords
        },
    })
);

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
                    const coords = responseDataCoords.split(' ');

                    dispatch({
                        type: actionTypes.ADD_MARKER,
                        data: {
                            coords,
                            address: responseDataAddress,
                        }
                    })
                }
            }
        })
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
                dispatch({
                    type: actionTypes.SET_MARKER_ADDRESS,
                    data: {
                        index,
                        address: data.response.GeoObjectCollection.featureMember[0]
                            .GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
                    }
                })
            }
        })
);

export const addMarker = (data) => (dispatch) => {
    dispatch(getInfoLocation(data));
};

export const removeMarker = (index) => (dispatch, getState) => {
    const { RouteMapReducer: { placemarks } } = getState();

    console.log(placemarks);

    // dispatch({
    //     type: actionTypes.REMOVE_MARKER,
    //     data: index,
    // })
};

