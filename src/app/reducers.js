import { combineReducers } from 'redux';
import { YaMapReducer } from '../containers/YaMap';
import { PointsReducer } from '../containers/Points';

const AppReducers = () => (
    combineReducers({
        YaMapReducer,
    })
);

export default AppReducers;