import { combineReducers } from 'redux';
import { RouteMapReducer } from '../containers/RouteMap';

const AppReducers = () => (
    combineReducers({
        RouteMapReducer,
    })
);

export default AppReducers;