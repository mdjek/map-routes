import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Points, YaMap } from '../../components';
import * as RouteMapActions from './actions';

const RouteMap = (props) => {
    const handleChangeCoords = (id, coords) => {
        const {
            actions: {
                changeCoords,
                getAddressLocation,
            },
        } = props;

        changeCoords(id, coords);
        getAddressLocation(id, coords, 'latlong');
    };

    const {
        mapState,
        placemarks,
        requestErrorCode,
        actions: {
            addMarker,
            removeMarker,
            changeOrder,
        },
    } = props;

    return (
        <Fragment>
            <Points
                placemarks={placemarks}
                addMarker={addMarker}
                removeMarker={removeMarker}
                changeOrder={changeOrder}
                requestErrorCode={requestErrorCode}
            />
            <YaMap
                mapState={mapState}
                placemarks={placemarks}
                handleChangeCoords={handleChangeCoords}
            />
        </Fragment>
    );
};

RouteMap.propTypes = {
    mapState: PropTypes.shape(),
    placemarks: PropTypes.arrayOf(PropTypes.shape()),
    requestErrorCode: PropTypes.number,
    actions: PropTypes.shape({
        changeCoords: PropTypes.func,
        getAddressLocation: PropTypes.func,
        getInfoLocation: PropTypes.func,
        addMarker: PropTypes.func,
        removeMarker: PropTypes.func,
    }),
};

const mapStateToProps = state => ({
    mapState: state.RouteMapReducer.mapState,
    placemarks: state.RouteMapReducer.placemarks,
    requestErrorCode: state.RouteMapReducer.requestErrorCode,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(RouteMapActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
