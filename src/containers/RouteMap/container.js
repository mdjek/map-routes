import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Points, YaMap } from '../../components';
import * as actions from './actions';

class RouteMap extends Component {
    changeCoords = (index, coords) => {
        const { actions: { setCoordsLocation, setInfoLocation } }= this.props;

        setCoordsLocation(index, coords);
        setInfoLocation(index, coords, 'latlong');
    };

    render() {
        const {
            placemarks,
        } = this.props;

        return (
            <Fragment>
                <div className="points">
                    <Points />
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
        setCoordsLocation: PropTypes.func,
        setInfoLocation: PropTypes.func,
    }),
};

const mapStateToProps = state => ({
    placemarks: state.RouteMapReducer.placemarks,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
