import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDragList from 'react-drag-list';

class Points extends Component {
    state = {
        inputText: '',
        errorText: null,
    };

    changeInput = (event) => {
        this.setState({
            inputText: event.target.value.trim(),
        });
    };

    handleUpdate = (e, updatedList) => {
        const { changeOrder } = this.props;

        changeOrder(updatedList);
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

        const {
            placemarks,
            removeMarker,
            requestErrorCode,
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
                            <input
                                type="text"
                                name="placemark-name"
                                className="form-control"
                                placeholder="Введите адрес"
                                onChange={this.changeInput}
                                value={inputText}
                            />
                            {/*<button*/}
                                {/*className="btn btn-primary form-control"*/}
                            {/*>*/}
                                {/*{'Добавить'}*/}
                            {/*</button>*/}
                        </div>
                    </form>
                    {errorText && (
                        <div className="error-text">
                            {errorText}
                        </div>
                    )}
                    {requestErrorCode && (
                        <div className="error-text">
                            {requestErrorCode === 0
                                ? 'Возникла ошибка. Попробуйте позже.'
                                : 'Адрес не найден. Измените запрос.'
                            }
                        </div>
                    )}
                </div>
                <div>
                    <ReactDragList
                        dataSource={placemarks}
                        handles={false}
                        rowKey="id"
                        row={(item, index) => (
                            <div key={item.id} className="point-item">
                                <span className="point-item__info">
                                    <strong>{`${index += 1}.`}</strong>
                                    {' '}
                                    {`${item.properties.balloonContent}`}
                                </span>
                                <span
                                    className="point-item__delete"
                                    onClick={() => removeMarker(item.id)}
                                />
                            </div>
                        )}
                        onUpdate={this.handleUpdate}
                    />
                </div>
            </div>
        );
    }
};

Points.propTypes = {
    placemarks: PropTypes.array,
    removeMarker: PropTypes.func,
};

export default Points;
