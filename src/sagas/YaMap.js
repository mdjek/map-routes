import axios from 'axios';
import apiUrl from '../api';

export const getInfoLocation = (data) => {
    return (
        axios({
            method: 'get',
            url: `${apiUrl()}&geocode=${data}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    );
};
