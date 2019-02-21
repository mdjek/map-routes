import { all } from 'redux-saga/effects';
import actionMapWatcher from './YaMap';
import actionPointWatcher from './Points';

export default function* rootSaga() {
    yield all([
        actionMapWatcher(),
        actionPointWatcher(),
    ]);
}