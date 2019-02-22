import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Points extends Component {
    state = {
        inputText: '',
    };

    changeInput = (event) => {
        this.setState({
            inputText: event.target.value.trim(),
        });
    };

    addMarker = (event) => {
        const { inputText } = this.state;
        const { addMarker } = this.props;

        event.preventDefault();

        if (inputText) {
            addMarker(inputText);
            // getInfoLocation(inputText);
        }

        this.setState({
            inputText: '',
        });
    };


    render() {
        const {
            placemarks,
        } = this.props;

        return (
            <div>
                <div className="marker-form">
                    <form
                        action="#"
                        method="get"
                        onSubmit={this.addMarker}
                    >
                        <div className="form-group row">
                            <div className="col-xs-9">
                                <input
                                    type="text"
                                    name="placemark-name"
                                    className="form-control"
                                    placeholder="Введите адрес"
                                    onChange={this.changeInput}
                                />
                            </div>

                            <div className="col-xs-3">
                                <button
                                    className="btn btn-primary form-control"
                                >
                                    {'Добавить'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {placemarks.map((item, i) => (
                        <div key={i}>
                            {item.properties.balloonContent}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

Points.propTypes = {
    placemarks: PropTypes.array,
};

export default Points;
