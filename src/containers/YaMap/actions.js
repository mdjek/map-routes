import axios from 'axios';
import apiUrl from '../../api';
import * as actionTypes from './types';

export const geocodeRequest = (data, scoParam) => (
    axios({
        method: 'get',
        url: `${apiUrl()}${scoParam !== '' ? `&sco=${scoParam}` : ''}&geocode=${data}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
);

export const setCoordsLocation = (index, coords) => dispatch => (
    dispatch({
        type: actionTypes.SET_MARKER_COORDS,
        data: { index, coords }
    })
);

export const setInfoLocation = (index, data, scoParam = '') => dispatch => (
    geocodeRequest(data, scoParam)
        .then((response) => {
            const { status, data } = response;

            if (status >= 400) {
                throw new Error('Bad response from server');
            }

            dispatch({
                type: actionTypes.SET_MARKER_INFO,
                data: {
                    index,
                    info: data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
                }
            })
        })
);

