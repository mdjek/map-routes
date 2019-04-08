import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Points, YaMap } from '../../components';
import * as actions from './actions';

class RouteMap extends Component {
    changeCoords = (id, coords) => {
        const { actions: { changeCoords, getAddressLocation } }= this.props;

        changeCoords(id, coords);
        getAddressLocation(id, coords, 'latlong');
    };

    render() {
        const {
            mapState,
            placemarks,
            requestErrorCode,
            actions: {
                addMarker,
                removeMarker,
                changeOrder,
            },
        } = this.props;

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
                    handleChangeCoords={this.changeCoords}
                />
            </Fragment>
        );
    }
}

RouteMap.propTypes = {
    mapState: PropTypes.shape(),
    placemarks: PropTypes.array,
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
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
