import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { YMaps, Map } from 'react-yandex-maps';
import { Marker, Line } from '../../components';
import * as actions from './actions';

const mapState = { center: [55.76, 37.64], zoom: 7, controls: [] };

// const placemarks = [
//     {
//         geometry: {
//             coordinates: [55.8, 37.8],
//         },
//         properties: {
//             iconContent: 1,
//             balloonContent: 'Точка маршрута 1',
//         },
//     },
//     {
//         geometry: {
//             coordinates: [55.9, 38.8],
//         },
//         properties: {
//             iconContent: 2,
//             balloonContent: 'Точка маршрута 2',
//         },
//     }
// ];

class YaMap extends Component {
    // state = {
    //     placemarks: [
    //         {
    //             geometry: {
    //                 coordinates: [55.8, 37.8],
    //             },
    //             properties: {
    //                 iconContent: 1,
    //                 balloonContent: 'Точка маршрута 1',
    //             },
    //         },
    //         {
    //             geometry: {
    //                 coordinates: [55.9, 38.8],
    //             },
    //             properties: {
    //                 iconContent: 2,
    //                 balloonContent: 'Точка маршрута 2',
    //             },
    //         }
    //     ],
    // };


    changeCoords = (index, coords) => {
        const { actions: { setCoordsLocation, setInfoLocation } }= this.props;

        setCoordsLocation(index, coords);
        setInfoLocation(index, coords, 'latlong');
    };

    // componentDidMount() {
    //     this.props.actions.getInfoLocation([55.9, 38.8], 'latlong');
    // }

    render() {
        const {
            placemarks,
        } = this.props;

        return (
            <YMaps>
                <Map state={mapState} width="500px" height="500px">
                    {placemarks.map((placemarkParams, i) => (
                        <Fragment key={`placemarkFragment${i}`}>
                            <Marker
                                key={`m${i}`}
                                index={i}
                                handleChangeCoords={this.changeCoords}
                                {...placemarkParams}
                            />
                            { i !== placemarks.length-1
                            && (
                                    <Line
                                        key={`l${i}`}
                                        coordinates={[placemarkParams.geometry.coordinates, placemarks[i+=1].geometry.coordinates]}
                                    />
                                )
                            }
                        </Fragment>
                    ))}
                </Map>
            </YMaps>
        );
    }
}

YaMap.propTypes = {
    actions: PropTypes.shape({
        setCoordsLocation: PropTypes.func,
        setInfoLocation: PropTypes.func,
    }),
    placemarks: PropTypes.array,
};

const mapStateToProps = state => ({
    placemarks: state.YaMapReducer.placemarks,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YaMap);
