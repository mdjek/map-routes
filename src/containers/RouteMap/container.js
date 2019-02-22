import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Points, YaMap } from '../../components';
import * as actions from './actions';

class RouteMap extends Component {
    changeCoords = (index, coords) => {
        const { actions: { changeCoords, getAddressLocation } }= this.props;

        changeCoords(index, coords);
        getAddressLocation(index, coords, 'latlong');
    };

    render() {
        const {
            placemarks,
            actions: {
                addMarker,
            },
        } = this.props;

        return (
            <Fragment>
                <div className="points">
                    <Points
                        placemarks={placemarks}
                        addMarker={addMarker}
                    />
                </div>
                <div className="ya-map-container">
                    <YaMap
                        placemarks={placemarks}
                        handleChangeCoords={this.changeCoords}
                    />
                </div>
            </Fragment>
        );
    }
}

RouteMap.propTypes = {
    placemarks: PropTypes.array,
    actions: PropTypes.shape({
        changeCoords: PropTypes.func,
        getAddressLocation: PropTypes.func,
        getInfoLocation: PropTypes.func,
    }),
};

const mapStateToProps = state => ({
    placemarks: state.RouteMapReducer.placemarks,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
