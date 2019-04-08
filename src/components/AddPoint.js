import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class AddPoint extends Component {
    state = {
        inputText: '',
        errorText: null,
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

            this.setState({
                inputText: '',
                errorText: null,
            });
        }
        else {
            this.setState({
                errorText: 'Укажите адрес',
            });
        }
    };

    render() {
        const {
            inputText,
            errorText,
        } = this.state;

        const { requestErrorCode } = this.props;

        return (
            <Fragment>
                <form
                    action="#"
                    method="get"
                    onSubmit={this.addMarker}
                >
                    <div className="form-group row">
                        <input
                            type="text"
                            name="placemark-name"
                            className="form-control"
                            placeholder="Введите адрес"
                            onChange={this.changeInput}
                            value={inputText}
                        />
                    </div>
                </form>
                {errorText && (
                    <div className="error-text">
                        {errorText}
                    </div>
                )}
                {!!requestErrorCode &&
                (<div className="error-text">
                    {requestErrorCode === 2
                        ? 'Адрес не найден. Измените запрос.'
                        : 'Возникла ошибка. Попробуйте позже.'
                    }
                </div>)
                }
            </Fragment>
        );
    }
}

AddPoint.propTypes = {
    requestErrorCode: PropTypes.number,
    addMarker: PropTypes.func,
};

export default AddPoint;
